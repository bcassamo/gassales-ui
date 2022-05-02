import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoprodutoService {

  tiposprodutoUrl: string;

  constructor(private http: HttpClient) {
    this.tiposprodutoUrl = `${environment.apiUrl}/tipos`;
  }

  listarTodos() : Promise<any> {
    return this.http.get(this.tiposprodutoUrl)
      .toPromise();
  }
}
