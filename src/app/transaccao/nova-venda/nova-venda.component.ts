import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService, LazyLoadEvent } from 'primeng/api';

import { Produto, Transaccao } from './../../core/model';
import { ProdutoService } from './../../produtos/produto.service';
import { EntidadeService } from './../../entidades/entidade.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TransaccaoService, TransaccaoFiltro } from './../transaccao.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent implements OnInit {

  agora = new Date(Date.now());
  totalRegistos: number = 0;
  filtro = new TransaccaoFiltro();
  produtos: any[] = [];
  transaccao: Transaccao = new Transaccao();
  carrinhoProdutos: Transaccao[] = [];
  esconderEstado: boolean = true;
  estados = ['CHEIA', 'VAZIA'];

  filteredCustomers: any[] = [];
  customers: any[] = [];
  valorTotalCompra: number = 0;
  trocosCompra: number = 0;

  constructor(
    private transaccaoService: TransaccaoService,
    private produtoService: ProdutoService,
    private entidadeService: EntidadeService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova venda');
    this.getAllProducts();
    this.getAllCustomers();
  }

  adicionarAoCarrinho(novaVendaForm: NgForm) {
    this.transaccao.tipo = "Venda";
    this.transaccao.dataTransaccao = this.agora;
    const productId: any = this.transaccao.produto.id;
    this.produtoService.buscarPeloCodigo(productId)
      .then((produto: Produto) => {
        if(typeof this.transaccao.quantidade === 'number' && typeof produto.preco === 'number'){
          this.valorTotalCompra = this.transaccaoService.valorTotalCompra() + (this.transaccao.quantidade * produto.preco);
        }
      })
    this.transaccaoService.adicionarProdutoAoCarrinho(this.transaccao);
  }

  finalizar(finalizarNovaVendaForm: NgForm){
    this.carrinhoProdutos.forEach(transaccao => {
      transaccao.entidade = this.transaccao.entidade;
      if(typeof transaccao.quantidade === 'number' && typeof transaccao.produto.preco === 'number'){
        transaccao.valorTotal = transaccao.quantidade * transaccao.produto.preco;
      }
      this.transaccaoService.salvar(transaccao)
        .then(() => {
          //Eliminar o metodo limparCarrinho
          //ver como reiniciar a tabela com dados carregados ngOnInit()

          //finalizarNovaVendaForm.reset();
          //console.log(this.carrinhoProdutos);
        })
        .catch(erro => this.errorHandler.handle(erro));
    });

    this.messageService.add({severity: 'success', detail: this.transaccao.tipo + ' adicionada com sucesso!'});
    this.router.navigate(['/transaccao/vendas']);
  }

  escondeEstado(event: any) {
    this.produtoService.buscarPeloCodigo(event.value).then((produto: Produto) => {
      if(produto.tipoProduto.descricao == 'Botijas de Gás'){
        this.esconderEstado = false;
      }else{
        this.esconderEstado = true;
      }
    });
  }

  getAllProducts() {
    this.produtoService.listarTodos()
      .then(products => {
        this.produtos = products.map((p:any) => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getAllCustomers() {
    this.entidadeService.customerNames()
      .then(customers => {
        this.customers = customers.map((c:any) => ({ label: c.nome, value: c.id }));;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getCarrinhoCompras(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.carrinhoProdutos = this.transaccaoService.getCarrinho(this.filtro);
    this.totalRegistos = this.transaccaoService.getCarrinho(this.filtro).length;
    //console.log('totalRegistos ' + this.totalRegistos);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    //console.log('pagina ' +pagina)
    this.getCarrinhoCompras(pagina);
  }

  searchForCustomers(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if(customer.label.toLowerCase().includes(query.toLowerCase())) {
        this.transaccao.entidade.id = customer.value;
        filtered.push(customer.label);
      }
    }
    this.filteredCustomers = filtered;
  }

  calcularTrocos(event: any) {
    this.trocosCompra = (event.value) - this.valorTotalCompra;
  }
}
