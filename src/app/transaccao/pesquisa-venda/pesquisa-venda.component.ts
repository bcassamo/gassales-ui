import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { TransaccaoFiltro, TransaccaoService } from './../transaccao.service';

@Component({
  selector: 'app-pesquisa-venda',
  templateUrl: './pesquisa-venda.component.html',
  styleUrls: ['./pesquisa-venda.component.css']
})
export class PesquisaVendaComponent implements OnInit {
  totalRegistos: number = 0;
  filtro = new TransaccaoFiltro();
  transaccoes: any = [];

  constructor(
    private transaccaoService: TransaccaoService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de vendas');
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;
    this.filtro.tipo = 'Venda';
    this.transaccaoService.pesquisarTransaccoes(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.transaccoes = resultado.transaccoes;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }
}
