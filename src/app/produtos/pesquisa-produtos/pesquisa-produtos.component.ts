import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-produtos',
  templateUrl: './pesquisa-produtos.component.html',
  styleUrls: ['./pesquisa-produtos.component.css']
})
export class PesquisaProdutosComponent {

  produtos = [
    { nome: 'Oxigénio', descricao: 'Botija de Oxigénio Pequena', tamanho: 8, quantidade: 30, preco: 640.00 },
    { nome: 'Gás', descricao: 'Gás de Cozinha', tamanho: 11, quantidade: 10, preco: 840.00 },
    { nome: 'Acetileno', descricao: 'Para maçaricos e soldaduras', tamanho: 30, quantidade: 15, preco: 2500.00 },
    { nome: 'Nitogénio', descricao: 'Outros', tamanho: 4, quantidade: 12, preco: 1000.00 },
    { nome: 'Gás R22', descricao: 'Gás de frio para eletrodomesticos', tamanho: 5, quantidade: 5, preco: 1500.00 }
  ];

}
