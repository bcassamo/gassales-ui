import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { Produto } from 'src/app/core/model';
import { TipoProduto } from './../../core/model';
import { ProdutoService } from './../produto.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoprodutoService } from './../../tiposproduto/tipoproduto.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  nome?: string;
  tipoprodutos: TipoProduto[] = [];
  produto: Produto = new Produto();

  constructor(
    private tipoProdutoService: TipoprodutoService,
    private produtoService: ProdutoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllTiposProducts();
  }

  salvar(novoProdutoForm: NgForm) {
    this.produtoService.adicionar(this.produto)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });

        novoProdutoForm.reset();
        this.produto = new Produto();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getAllTiposProducts() {
    this.tipoProdutoService.listarTodos()
      .then(tiposproductos => {
        this.tipoprodutos = tiposproductos.map((p:TipoProduto) => ({ label: p.descricao, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
