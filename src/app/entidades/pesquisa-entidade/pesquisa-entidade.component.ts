import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { LazyLoadEvent, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

import { Entidade } from './../../core/model';
import { EntidadeService, EntidadeFiltro } from './../entidade.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

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
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Entidades');
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.entidadeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.entidades = resultado.entities;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(entidade: Entidade): void {
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

  eliminar(entidade: Entidade) {
    const currentPage: number = this.grid.first / this.grid.rows;

    this.entidadeService.eliminar(entidade)
      .then(() => {
        this.pesquisar(currentPage);
        //this.grid.reset();
        this.messageService.add({ severity: 'success', detail: entidade.tipo + ' ' + entidade.nome + ' eliminado com sucesso!' })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
