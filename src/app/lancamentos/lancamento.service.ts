import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Lancamento, Produto, Business } from './../core/model';
import { ProdutoService } from './../produtos/produto.service';
import { environment } from './../../environments/environment.prod';

export class LancamentoFiltro {
  descricao?: string;
  dataLancamentoDe?: Date;
  dataLancamentoAte?: Date;
  estado?: string;

  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;
  lancamentos: Lancamento[] = [];

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private produtoService: ProdutoService
    ) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    }

  adicionarLancamento(lancamento: Lancamento) {
    let novolancamento: Lancamento = new Lancamento();
    novolancamento.produto.id = lancamento.produto.id;
    novolancamento.quantidade = lancamento.quantidade;
    novolancamento.estado = lancamento.estado;
    novolancamento.descricao = lancamento.descricao;
    novolancamento.dataLancamento = lancamento.dataLancamento;

    const productId: any = novolancamento.produto.id;
    this.produtoService.buscarPeloCodigo(productId)
      .then((produto: Produto) => {
        novolancamento.produto = produto;
        this.lancamentos.push(novolancamento);
      })

  }

  valorTotal(): number {
    let valorT: number = 0;
    this.lancamentos.forEach(element => {
      if(typeof element.quantidade === 'number' && typeof element.produto.preco === 'number'){
        valorT += element.quantidade * element.produto.preco;
      }
    });
    return valorT;
  }

  salvarBusiness(business: Business): Promise<Business> {
    return this.http.post<Business>(`${this.lancamentosUrl}/business`, business)
      .toPromise();
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento)
      .toPromise();
  }

  listarTodos() : Promise<any> {
    return this.http.get(this.lancamentosUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

  pesquisarLancamentos(filtro: LancamentoFiltro) : Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataLancamentoDe) {
      params = params.set('dataLancamentoDe', this.datePipe.transform(filtro.dataLancamentoDe, 'yyyy-MM-dd')!);
    }

    if(filtro.dataLancamentoAte) {
      params = params.set('dataLancamentoAte', this.datePipe.transform(filtro.dataLancamentoAte, 'yyyy-MM-dd')!);
    }

    if(filtro.estado) {
      params = params.set('estado', filtro.estado);
    }

    return this.http.get(`${this.lancamentosUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];
        const resultado = {
          lancamentos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  getLancamentos(): Lancamento[] {
    return this.lancamentos;
  }
}
