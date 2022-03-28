import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { ProdutoService, ProdutoFiltro } from './../produto.service';

@Component({
  selector: 'app-pesquisa-produtos',
  templateUrl: './pesquisa-produtos.component.html',
  styleUrls: ['./pesquisa-produtos.component.css']
})
export class PesquisaProdutosComponent implements OnInit{

  totalRegistos: number = 0;
  filtro = new ProdutoFiltro();
  produtos: any = [];
  //nome?: string;
  //referencia?: string;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .then(products => {
        this.totalRegistos = products.total;
        this.produtos = products.produtos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }
}
