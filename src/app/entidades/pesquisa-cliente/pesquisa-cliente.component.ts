import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { EntidadeService, EntidadeFiltro } from './../entidade.service';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  totalRegistos: number = 0;
  filtro = new EntidadeFiltro();
  clientes: any = [];
  //nome?: string;
  //nuit?: string;

  constructor(private entidadeService: EntidadeService) { }

  ngOnInit(): void {
    //this.pesquisar()
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.entidadeService.pesquisarClientes(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.clientes = resultado.customers;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }
}
