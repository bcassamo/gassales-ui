import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class EntidadeFiltro {
  nome?: string;
  nuit?: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  entidadesUrl = 'http://localhost:8080/entidades';

  constructor(private http: HttpClient) { }

  pesquisarClientes(filtro: EntidadeFiltro) : Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if(filtro.nuit) {
      params = params.set('nuit', filtro.nuit);
    }

    return this.http.get(`${this.entidadesUrl}/clientes`, { params })
      .toPromise()
      .then((response: any) => {
        const customers = response['content'];
        const resultado = {
          customers,
          total: response.totalElements
        };
        return resultado;
      });
  }

  customerNames() : Promise<any> {
    return this.http.get(`${this.entidadesUrl}/clientes`)
      .toPromise()
      .then((response: any) => {
        response['content'];
        return response['content'];
      });
  }

  pesquisar(filtro: EntidadeFiltro) : Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if(filtro.nuit) {
      params = params.set('nuit', filtro.nuit);
    }

    return this.http.get(`${this.entidadesUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const entities = response['content'];
        const resultado = {
          entities,
          total: response.totalElements
        };
        return resultado;
      });
  }
}
