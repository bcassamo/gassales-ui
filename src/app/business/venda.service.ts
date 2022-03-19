import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface VendaFiltro {
  dataVendaInicio?: Date;
  dataVendaFim?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  vendasUrl = 'http://localhost:8080/business';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: VendaFiltro): Promise<any> {
    let params = new HttpParams();

    if (filtro.dataVendaInicio) {
      params = params.set('dataBusinessDe', this.datePipe.transform(filtro.dataVendaInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVendaFim) {
      params = params.set('dataBusinessAte', this.datePipe.transform(filtro.dataVendaFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.vendasUrl}?descricao=Venda`, { params })
      .toPromise()
      .then((response: any) => response['content']);
  }
}
