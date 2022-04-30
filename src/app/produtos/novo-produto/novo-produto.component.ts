import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Adição de Produto');

    const idProduto = this.route.snapshot.params['id'];
    if (idProduto) {
      this.carregarProduto(idProduto);
    }

    this.getAllTiposProducts();
  }

  get editando() {
    return Boolean(this.produto.id);
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPeloCodigo(id)
      .then(produto => {
        this.produto = produto;
        this.actualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(novoProdutoForm: NgForm) {
    if(this.editando) {
      this.actualizarProduto(novoProdutoForm);
    } else {
      this.adicionarProduto(novoProdutoForm);
    }
  }

  adicionarProduto(novoProdutoForm: NgForm) {
    this.produtoService.adicionar(this.produto)
      .then(produtoSalvo => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });

        //novoProdutoForm.reset();
        //this.produto = new Produto();
        this.router.navigate(['/produtos', produtoSalvo.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  actualizarProduto(novoProdutoForm: NgForm) {
    this.produtoService.actualizar(this.produto)
      .then(produto => {
        this.produto = produto;

        this.messageService.add({ severity: 'success', detail: 'Produto alterado com sucesso!' });
        this.actualizarTituloEdicao();
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

  novo(novoProdutoForm: NgForm) {
    novoProdutoForm.reset(new Produto());

    this.router.navigate(['/produtos/novo']);
  }

  actualizarTituloEdicao() {
    this.title.setTitle(`Edição de Produto: ${this.produto.nome}`);
  }
}
