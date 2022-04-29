import { Component, OnInit } from '@angular/core';

import { Entidade } from './../../core/model';

@Component({
  selector: 'app-nova-entidade',
  templateUrl: './nova-entidade.component.html',
  styleUrls: ['./nova-entidade.component.css']
})
export class NovaEntidadeComponent implements OnInit {

  entidade: Entidade = new Entidade();

  constructor() { }

  ngOnInit(): void {
  }

  tipos = [
    { label: 'Cliente', value: 'CLIENTE' },
    { label: 'Fornecedor', value: 'FORNECEDOR' }
  ];

}
