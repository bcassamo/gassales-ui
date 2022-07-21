import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Transaccao, Produto } from './../core/model';
import { ProdutoService } from './../produtos/produto.service';

export class TransaccaoFiltro {
  idTransaccao?: string;
  tipo?: string;
  dataTransaccaoDe?: Date;
  dataTransaccaoAte?: Date;
  estado?: string;

  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class TransaccaoService {
  transaccaoUrl: string;
  carrinhoCompras: Transaccao[] = [];

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private produtoService: ProdutoService
  ) {
    this.transaccaoUrl = `${environment.apiUrl}/transaccao`;
  }

  salvar(transaccao: Transaccao): Promise<Transaccao> {
    transaccao.idTransaccao = "";
    return this.http.post<Transaccao>(`${ this.transaccaoUrl}`, transaccao)
      .toPromise();
  }

  adicionarProdutoAoCarrinho(transaccao: Transaccao) {
    let novaTransaccao: Transaccao = new Transaccao();
    const productId: any = transaccao.produto.id;

    novaTransaccao.produto.id = productId;
    novaTransaccao.quantidade = transaccao.quantidade;
    novaTransaccao.estado = transaccao.estado;
    novaTransaccao.tipo = transaccao.tipo;
    novaTransaccao.dataTransaccao = transaccao.dataTransaccao;

    this.produtoService.buscarPeloCodigo(productId)
      .then((produto: Produto) => {
        novaTransaccao.produto = produto;
        this.carrinhoCompras.push(novaTransaccao);
      })
  }

  limparCarrinho(): Transaccao[] {
    let carrinhoLimpo: Transaccao[] = [];
    carrinhoLimpo = this.carrinhoCompras.splice(0, this.carrinhoCompras.length);
    return carrinhoLimpo;
  }

  listarTodasTransaccoes() : Promise<any> {
    return this.http.get(this.transaccaoUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

  pesquisarTransaccoes(filtro: TransaccaoFiltro) : Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.tipo) {
      params = params.set('tipo', filtro.tipo);
    }

    if(filtro.dataTransaccaoDe) {
      params = params.set('dataTransaccaoDe', this.datePipe.transform(filtro.dataTransaccaoDe, 'yyyy-MM-dd')!);
    }

    if(filtro.dataTransaccaoAte) {
      params = params.set('dataTransaccaoAte', this.datePipe.transform(filtro.dataTransaccaoAte, 'yyyy-MM-dd')!);
    }

    if(filtro.estado) {
      params = params.set('estado', filtro.estado);
    }

    if(filtro.idTransaccao) {
      params = params.set('idTransaccao', filtro.idTransaccao);
    }

    return this.http.get(`${this.transaccaoUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const transaccoes = response['content'];
        const resultado = {
          transaccoes,
          total: response.totalElements
        };
        return resultado;
      });
  }

  valorTotalCompra(): number {
    let valorT: number = 0;
    this.carrinhoCompras.forEach(element => {
      if(typeof element.quantidade === 'number' && typeof element.produto.preco === 'number'){
        valorT += element.quantidade * element.produto.preco;
      }
    });
    return valorT;
  }

  getCarrinho(filtro: TransaccaoFiltro): Transaccao[] {
    // ver como o backend calculou a paginacao e implementar aqui
    if (this.carrinhoCompras.length === 0) {
      return this.carrinhoCompras;
    } else{
      const paginaActual = filtro.pagina;
      const totalRegistosPorPagina = filtro.itensPorPagina;
      const primeiroRegistoDapagina = paginaActual * totalRegistosPorPagina;
      let carrinhoCompras: Transaccao[] = [];
      const max = (primeiroRegistoDapagina + totalRegistosPorPagina);

      for(let i = primeiroRegistoDapagina; i < max; i++) {
        carrinhoCompras.push(this.carrinhoCompras[i]);
      }
      //console.log('carinho: ' + carrinhoCompras);

      return carrinhoCompras;
    }
  }
}
