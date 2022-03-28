import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

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

  constructor(private entidadeService: EntidadeService) { }

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
}
