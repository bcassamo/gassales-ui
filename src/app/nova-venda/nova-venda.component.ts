import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent {

  lancamentos = [
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 850.20, quantidade: 2, valorTotal: 1700.40, produto: 1 },
    { descricao: 'Aquisição', dataLancamento: new Date(2022, 1, 20), estado: 'CHEIA', preco: 1200.00, quantidade: 20, valorTotal: 2400.00, produto: 3 },
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 1200.00, quantidade: 2, valorTotal: 2400.00, produto: 3 }
  ];

  clientes = [
    { nome: 'Almeida Costa', id: '1' },
    { nome: 'Betuel Fernando', id: '2' }
  ];

  produtos = [
    { nome: 'Oxigénio', id: '1' },
    { nome: 'Nitogénio', id: '3' }
  ];

  valorT = 15000;

}
