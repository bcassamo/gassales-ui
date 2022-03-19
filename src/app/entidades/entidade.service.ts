import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface EntidadeFiltro {
  nome?: string;
  nuit?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  entidadesUrl = 'http://localhost:8080/entidades';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: EntidadeFiltro) : Promise<any> {
    let params = new HttpParams();

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if(filtro.nuit) {
      params = params.set('nuit', filtro.nuit);
    }

    return this.http.get(`${this.entidadesUrl}/clientes`, { params })
      .toPromise()
      .then((response: any) => response['content']);
  }
}
