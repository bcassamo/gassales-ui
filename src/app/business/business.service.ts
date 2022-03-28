import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class BusinessFiltro {
  dataBusinessInicio?: Date;
  dataBusinessFim?: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  vendasUrl = 'http://localhost:8080/business';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisarVenda(filtro: BusinessFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.dataBusinessInicio) {
      params = params.set('dataBusinessDe', this.datePipe.transform(filtro.dataBusinessInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataBusinessFim) {
      params = params.set('dataBusinessAte', this.datePipe.transform(filtro.dataBusinessFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.vendasUrl}?descricao=Venda`, { params })
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
