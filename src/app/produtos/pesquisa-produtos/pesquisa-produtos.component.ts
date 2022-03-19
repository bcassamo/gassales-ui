import { ProdutoService, ProdutoFiltro } from './../produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-produtos',
  templateUrl: './pesquisa-produtos.component.html',
  styleUrls: ['./pesquisa-produtos.component.css']
})
export class PesquisaProdutosComponent implements OnInit{

  produtos = [];
  nome?: string;
  referencia?: string;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: ProdutoFiltro = {
      nome: this.nome,
      referencia: this.referencia
    }

    this.produtoService.pesquisar(filtro)
      .then(products => this.produtos = products);
  }
}
