import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { BusinessService, BusinessFiltro } from './../business.service';

@Component({
  selector: 'app-pesquisa-venda',
  templateUrl: './pesquisa-venda.component.html',
  styleUrls: ['./pesquisa-venda.component.css']
})
export class PesquisaVendaComponent implements OnInit {

  totalRegistos: number = 0;
  filtro = new BusinessFiltro();
  business: any = [];
  clientes: any = [];
  //dataVendaInicio?: Date;
  //dataVendaFim?: Date;

  constructor(
    private businessService: BusinessService,
    private title: Title
    ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de vendas');
      //this.pesquisar();
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.businessService.pesquisarVenda(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.business = resultado.business;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }
}
