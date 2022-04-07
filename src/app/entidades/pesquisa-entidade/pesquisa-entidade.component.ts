import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';

import { EntidadeService, EntidadeFiltro } from './../entidade.service';

@Component({
  selector: 'app-pesquisa-entidade',
  templateUrl: './pesquisa-entidade.component.html',
  styleUrls: ['./pesquisa-entidade.component.css']
})
export class PesquisaEntidadeComponent implements OnInit {

  totalRegistos: number = 0;
  filtro = new EntidadeFiltro();
  entidades: any = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private entidadeService: EntidadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.entidadeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.entidades = resultado.entities;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(entidade: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja eliminar?',
      accept: () => {
          this.eliminar(entidade);
      },
      reject: (type: ConfirmEventType) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejeitado', detail:'Rejeitou a exclusão de ' + entidade.nome});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Cancelou a exclusão de ' + entidade.nome});
              break;
          }
      }
    });
  }

  eliminar(entidade: any) {
    const currentPage: number = this.grid.first / this.grid.rows;

    if(entidade.tipo === "CLIENTE") {
      this.entidadeService.eliminarCliente(entidade.id)
        .then(() => {
          this.pesquisar(currentPage);
          //this.grid.reset();
        });
      this.messageService.add({ severity: 'success', detail: 'Cliente ' + entidade.nome + ' eliminado com sucesso!' })
    }else{
      this.entidadeService.eliminarFornecedor(entidade.id)
        .then(() => {
          this.pesquisar(currentPage);
        });
        this.messageService.add({ severity: 'success', detail: 'Fornecedor ' + entidade.nome + ' eliminado com sucesso!' })
    }

  }
}
