import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent {

  lancamentos = [
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 850.00, quantidade: 2, valorTotal: 1700, produto: 1 },
    { descricao: 'Aquisição', dataLancamento: new Date(2022, 1, 20), estado: 'CHEIA', preco: 1200.00, quantidade: 20, valorTotal: 2400, produto: 3 },
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 1200.00, quantidade: 2, valorTotal: 2400, produto: 3 }
  ];

  valorT = 15000;

}
