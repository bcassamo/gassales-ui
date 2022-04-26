import { Component, OnInit } from '@angular/core';

import { Produto } from 'src/app/core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoprodutoService } from './../../tiposproduto/tipoproduto.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  nome?: string;
  tipoprodutos: any[] = [];
  produto: Produto = new Produto();

  constructor(
    private tipoProdutoService: TipoprodutoService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getAllTiposProducts();
  }

  salvar() {

  }

  getAllTiposProducts() {
    this.tipoProdutoService.listarTodos()
      .then(tiposproductos => {
        console.log("teste " + tiposproductos);
        this.tipoprodutos = tiposproductos.map((p:any) => ({ label: p.descricao, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
