import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if(typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if(errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        try {
          msg = errorResponse.error[0].mensagemUsuario;
        } catch (e) { }

        console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar o serviço. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }
}