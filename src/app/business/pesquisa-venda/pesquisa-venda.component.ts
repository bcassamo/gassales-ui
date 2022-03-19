import { Component, OnInit } from '@angular/core';

import { VendaService, VendaFiltro } from './../venda.service';

@Component({
  selector: 'app-pesquisa-venda',
  templateUrl: './pesquisa-venda.component.html',
  styleUrls: ['./pesquisa-venda.component.css']
})
export class PesquisaVendaComponent implements OnInit {

  business = [];
  clientes = [];
  dataVendaInicio?: Date;
  dataVendaFim?: Date;

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
      this.pesquisar();
  }

  pesquisar() {
    const filtro: VendaFiltro = {
      dataVendaInicio: this.dataVendaInicio,
      dataVendaFim: this.dataVendaFim
    };

    this.vendaService.pesquisar(filtro)
      .then(vendas => this.business = vendas);
  }

}
