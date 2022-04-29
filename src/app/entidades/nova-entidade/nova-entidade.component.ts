import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Entidade } from './../../core/model';
import { EntidadeService } from './../entidade.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-nova-entidade',
  templateUrl: './nova-entidade.component.html',
  styleUrls: ['./nova-entidade.component.css']
})
export class NovaEntidadeComponent implements OnInit {

  tipos = [
    { label: 'Cliente', value: 'CLIENTE' },
    { label: 'Fornecedor', value: 'FORNECEDOR' }
  ];
  entidade: Entidade = new Entidade();

  constructor(
    private entidadeService: EntidadeService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  salvar(novaEntidadeForm: NgForm) {
    this.entidadeService.adicionar(this.entidade)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: this.entidade.tipo + ' adicionado com sucesso!' });

        novaEntidadeForm.reset();
        this.entidade = new Entidade();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
