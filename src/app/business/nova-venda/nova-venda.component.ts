import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';

import { Lancamento, Produto } from './../../core/model';
import { ProdutoService } from './../../produtos/produto.service';
import { EntidadeService } from './../../entidades/entidade.service';
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
  lancamentos: any[] = [];
  cliente?: string;

  filteredClients: any[] = [];
  customers: any[] = [];
  produtos: any[] = [];
  esconderEstado: boolean = true;
  estados = ['CHEIA', 'VAZIA', 'NA'];

  lancamento: Lancamento = new Lancamento();

  valorT = 15000;

  constructor(
    private entidadeService: EntidadeService,
    private produtoService: ProdutoService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllProducts();

    this.setVariaveis();
  }

  setVariaveis() {
    if(!(this.cliente === null)) {
      this.filteredClients[0] = this.cliente;
    }
  }

  salvar(novaVendaForm: NgForm) {
    this.lancamento.descricao = "Venda"
    this.lancamento.dataLancamento = this.dataLancamento;

    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        novaVendaForm.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  finalizar(){}

  escondeEstado(event: any) {
    this.produtoService.buscarPeloCodigo(event.value).then((produto: Produto) => {
      if(produto.tipoProduto.descricao == 'Botijas de Gás'){
        this.esconderEstado = false;
      }else{
        this.esconderEstado = true;
      }
    });
  }

  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;
    this.filtro.dataLancamentoDe = new Date();
    this.filtro.dataLancamentoAte = new Date();

    this.lancamentoService.pesquisarLancamentos(this.filtro)
      .then(resultado => {
        this.totalRegistos = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
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
        this.cliente = customer.label;
        filtered.push(customer.label);
      }
    }
    this.filteredClients = filtered;
  }

}
