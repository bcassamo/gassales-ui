import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { BusinessFiltro, BusinessService } from './../business.service';

@Component({
  selector: 'app-pesquisa-aquisicao',
  templateUrl: './pesquisa-aquisicao.component.html',
  styleUrls: ['./pesquisa-aquisicao.component.css']
})
export class PesquisaAquisicaoComponent implements OnInit {

  filtro = new BusinessFiltro();
  business: any = [];
  totalRegistos: number = 0;

  constructor(
    private businessService: BusinessService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de aquisições');
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;
    this.filtro.descricao = 'Aquisição';
    this.businessService.pesquisar(this.filtro)
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
