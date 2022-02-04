import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-entidade',
  templateUrl: './nova-entidade.component.html',
  styleUrls: ['./nova-entidade.component.css']
})
export class NovaEntidadeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tipos = [
    { label: 'Cliente', value: 'CLIENTE' },
    { label: 'Fornecedor', value: 'FORNECEDOR' }
  ];

}
