import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoprodutoService {

  tiposprodutoUrl = 'http://localhost:8080/tipos';

  constructor(private http: HttpClient) { }

  listarTodos() : Promise<any> {
    return this.http.get(this.tiposprodutoUrl)
      .toPromise()
      .then((response: any) => {
        response['content'];
        return response['content'];
      });
  }
}
