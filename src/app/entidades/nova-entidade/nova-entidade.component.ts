import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Entidade');
    const idEntidade = this.route.snapshot.params['id'];
    if (idEntidade) {
      this.carregarEntidade(idEntidade);
    }
  }

  get editando() {
    return Boolean(this.entidade.id);
  }

  carregarEntidade(id: number) {
    this.entidadeService.buscarPeloCodigo(id)
      .then(entidade => {
        this.entidade = entidade;
        this.actualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(novaEntidadeForm: NgForm) {
    if(this.editando) {
      this.actualizarEntidade(novaEntidadeForm);
    } else {
      this.adicionarEntidade(novaEntidadeForm);
    }
  }

  adicionarEntidade(novaEntidadeForm: NgForm) {
    this.entidadeService.adicionar(this.entidade)
      .then(entidadeSalva => {
        this.messageService.add({ severity: 'success', detail: this.entidade.tipo + ' adicionado com sucesso!' });

        //novaEntidadeForm.reset();
        //this.entidade = new Entidade();
        this.router.navigate(['/entidades', entidadeSalva.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  actualizarEntidade(novaEntidadeForm: NgForm) {
    this.entidadeService.actualizar(this.entidade)
      .then(entidade => {
        this.entidade = entidade;

        this.messageService.add({ severity: 'success', detail: this.entidade.tipo + ' alterado com sucesso!' });
        this.actualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(novaEntidadeForm: NgForm) {
    novaEntidadeForm.reset(new Entidade());
    this.router.navigate(['/entidades/nova']);
  }

  actualizarTituloEdicao() {
    this.title.setTitle(`Edição de ${this.entidade.tipo}: ${this.entidade.nome}`);
  }
}
