import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Lancamento, Produto } from './../core/model';
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
    const productId: any = lancamento.produto.id;
    this.produtoService.buscarPeloCodigo(productId)
      .then((produto: Produto) => {
        lancamento.produto = produto;
      })
    this.lancamentos.push(lancamento);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(`${this.lancamentosUrl}/business`, lancamento)
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

    //console.log(params);

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

  getLancamentos() {
    for(let i = 0; i < this.lancamentos.length; i++) {
      console.log('array ' + this.lancamentos[i].produto.nome);
    }
    return this.lancamentos;
  }
}
