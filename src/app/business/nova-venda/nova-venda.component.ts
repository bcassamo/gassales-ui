import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LazyLoadEvent, MessageService } from 'primeng/api';

import { Lancamento, Produto, Business, Entidade } from './../../core/model';
import { ProdutoService } from './../../produtos/produto.service';
import { EntidadeService, EntidadeFiltro } from './../../entidades/entidade.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../../lancamentos/lancamento.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent implements OnInit {

  dataLancamento = new Date(Date.now());
  totalRegistos: number = 0;
  filtro = new LancamentoFiltro();
  carrinhoProdutos: Lancamento[] = [];
  //cliente?: string;

  filteredClients: any[] = [];
  customers: any[] = [];
  produtos: any[] = [];
  esconderEstado: boolean = true;
  estados = ['CHEIA', 'VAZIA'];

  lancamento: Lancamento = new Lancamento();
  business: Business = new Business();

  valorT: number = 0;
  trocos: number = 0;

  constructor(
    private entidadeService: EntidadeService,
    private produtoService: ProdutoService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Nova venda');
    this.getAllCustomers();
    this.getAllProducts();

    //this.setVariaveis();
  }

  //setVariaveis() {
    //if(!(this.cliente === null)) {
      //this.filteredClients[0] = this.cliente;
    //}
  //}

  //salvar(novaVendaForm: NgForm) {
    //this.lancamento.descricao = "Venda"
    //this.lancamento.dataLancamento = this.dataLancamento;

    //this.lancamentoService.adicionarLancamento(this.lancamento);
      //.then(() => {
        //this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        //novaVendaForm.reset();
        //this.lancamento = new Lancamento();
      //})
      //.catch(erro => this.errorHandler.handle(erro));
  //}

  adicionarAoCarrinho(novaVendaForm: NgForm) {
    this.lancamento.descricao = "Venda"
    this.lancamento.dataLancamento = this.dataLancamento;
    const productId: any = this.lancamento.produto.id;
    this.produtoService.buscarPeloCodigo(productId)
      .then((produto: Produto) => {
        if(typeof this.lancamento.quantidade === 'number' && typeof produto.preco === 'number'){
          this.valorT = this.lancamentoService.valorTotal() + (this.lancamento.quantidade * produto.preco);
        }
      })

    this.lancamentoService.adicionarLancamento(this.lancamento);
  }

  finalizar(finalizarNovaVendaForm: NgForm){
    this.carrinhoProdutos.forEach(lancamento => {
      this.lancamentoService.salvar(lancamento)
      .then(lancamentoSalvo => {
        this.business.codigoBusiness = lancamentoSalvo.codigoBusiness;
        this.business.descricao = lancamentoSalvo.descricao;
        this.business.dataBusiness = lancamentoSalvo.dataLancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
    });

    this.business.finalizado = true;
    if(typeof this.business.entidade.id === 'number'){
      this.entidadeService.buscarPeloCodigo(this.business.entidade.id)
      .then(entidade => {
        this.business.entidade = entidade;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    this.lancamentoService.salvarBusiness(this.business)
      .then(businessSalvo => {
        this.messageService.add({ severity: 'success', detail: businessSalvo.descricao + ' efectuada com sucesso!' });

        this.router.navigate(['/business/vendas', businessSalvo.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
    console.log(this.carrinhoProdutos);
    console.log(this.business);
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

  calcularTrocos(event: any) {
    this.trocos = (event.value) - this.valorT;
  }

  //pesquisar(pagina: number = 0) {
    //this.filtro.pagina = pagina;
    //this.filtro.dataLancamentoDe = new Date();
    //this.filtro.dataLancamentoAte = new Date();
    //this.lancamentoService.pesquisarLancamentos(this.filtro)
      //.then(resultado => {
        //this.totalRegistos = resultado.total;
        //this.carrinhoProdutos = resultado.lancamentos;
      //})
      //.catch(erro => this.errorHandler.handle(erro));
  //}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    //this.pesquisar(pagina);
    this.getAllLancamentos();
  }

  getAllLancamentos() {
    //this.totalRegistos = this.lancamentoService.retornarLancamentos().total;
    this.carrinhoProdutos = this.lancamentoService.getLancamentos();
    //console.log('Carrinho ' + this.carrinhoProdutos);
  }

  getAllCustomers() {
    this.entidadeService.customerNames()
      .then(customers => {
        this.customers = customers.map((c:any) => ({ label: c.nome, value: c.id }));;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getAllProducts() {
    this.produtoService.listarTodos()
      .then(products => {
        this.produtos = products.map((p:any) => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  search(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if(customer.label.toLowerCase().includes(query.toLowerCase())) {
        //this.cliente = customer.label;
        this.business.entidade.id = customer.value;
        filtered.push(customer.label);
      }
    }
    this.filteredClients = filtered;
  }

}
