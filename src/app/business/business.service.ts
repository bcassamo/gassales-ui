import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

export class BusinessFiltro {
  descricao?: string;
  dataBusinessInicio?: Date;
  dataBusinessFim?: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  businessUrl: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.businessUrl = `${environment.apiUrl}/business`;
  }

  pesquisar(filtro: BusinessFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.dataBusinessInicio) {
      params = params.set('dataBusinessDe', this.datePipe.transform(filtro.dataBusinessInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataBusinessFim) {
      params = params.set('dataBusinessAte', this.datePipe.transform(filtro.dataBusinessFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.businessUrl}?descricao=${filtro.descricao}`, { params })
      .toPromise()
      .then((response: any) => {
        const business = response['content'];
        const resultado = {
          business,
          total: response.totalElements
        };
        return resultado;
      });
  }
}
