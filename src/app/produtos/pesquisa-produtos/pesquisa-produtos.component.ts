import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { LazyLoadEvent, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

import { ProdutoService, ProdutoFiltro } from './../produto.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pesquisa-produtos',
  templateUrl: './pesquisa-produtos.component.html',
  styleUrls: ['./pesquisa-produtos.component.css']
})
export class PesquisaProdutosComponent implements OnInit{

  totalRegistos: number = 0;
  filtro = new ProdutoFiltro();
  produtos: any = [];
  @ViewChild('tabela') grid!: Table;
  //nome?: string;
  //referencia?: string;

  constructor(
    private produtoService: ProdutoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit(): void {
    //this.pesquisar();
    this.title.setTitle('Pesquisa de Produtos');
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .then(products => {
        this.totalRegistos = products.total;
        this.produtos = products.produtos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja eliminar?',
      accept: () => {
          this.eliminar(produto);
      },
      reject: (type: ConfirmEventType) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejeitado', detail:'Rejeitou a exclusão de ' + produto.nome});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Cancelou a exclusão de ' + produto.nome});
              break;
          }
      }
    });
  }

  eliminar(produto: any) {
    const currentPage: number = this.grid.first / this.grid.rows;

    this.produtoService.eliminar(produto.id)
      .then(() => {
        this.pesquisar(currentPage);
        //this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Produto ' + produto.nome + ' eliminado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
