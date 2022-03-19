import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ProdutoFiltro {
  nome?: string;
  referencia?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtosUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: ProdutoFiltro) : Promise<any> {
    let params = new HttpParams();

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if(filtro.referencia) {
      params = params.set('referencia', filtro.referencia);
    }

    return this.http.get(`${this.produtosUrl}`, { params })
      .toPromise()
      .then((response:any) => response['content']);
  }

}
