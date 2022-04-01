import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProdutoFiltro {
  nome?: string;
  referencia?: string;
  pagina = 0;
  itensPorPagina = 3;
}

export class Produto {
  id?: bigint;
  nome?: string;
  descricao?: string;
  referencia?: string;
  tamanho?: bigint;
  preco?: bigint;
  id_tipo_produto?: bigint;
  id_stock?: bigint;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtosUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: ProdutoFiltro) : Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if(filtro.referencia) {
      params = params.set('referencia', filtro.referencia);
    }

    return this.http.get(`${this.produtosUrl}`, { params })
      .toPromise()
      .then((response:any) => {
        const produtos = response['content'];
        const resultado = {
          produtos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  listarTodos() : Promise<any> {
    return this.http.get(this.produtosUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

}
