import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Entidade } from './../core/model';
import { environment } from './../../environments/environment.prod';

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

  entidadesUrl: string;

  constructor(private http: HttpClient) {
    this.entidadesUrl = `${environment.apiUrl}/entidades`;
  }

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

  eliminar(entidade: Entidade): Promise<void> {
    if(entidade.tipo === "CLIENTE") {
      return this.http.delete<void>(`${this.entidadesUrl}/clientes/${entidade.id}`)
        .toPromise();
    } else {
      return this.http.delete<void>(`${this.entidadesUrl}/fornecedores/${entidade.id}`)
      .toPromise();
    }
  }

  adicionar(entidade: Entidade): Promise<Entidade> {
    return this.http.post<Entidade>(this.entidadesUrl, entidade)
      .toPromise();
  }

  actualizar(entidade: Entidade): Promise<Entidade> {
    if(entidade.tipo === "CLIENTE") {
      return this.http.put<Entidade>(`${this.entidadesUrl}/clientes/${entidade.id}`, entidade)
        .toPromise();
    } else {
      return this.http.put<Entidade>(`${this.entidadesUrl}/fornecedores/${entidade.id}`, entidade)
        .toPromise();
    }
  }

  buscarPeloCodigo(codigo: number): Promise<Entidade> {
    return this.http.get<Entidade>(`${ this.entidadesUrl}/${codigo}`)
      .toPromise();
  }
}
