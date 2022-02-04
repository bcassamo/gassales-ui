import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clientes = [
    { nome: "Almeida Costa", nuit: "1109332", bairro: "Bairro de Muhalaze", rua: "Rua do Limpopo", numero: "132A" },
    { nome: "Betuel Fernando", nuit: "1015339", bairro: null, rua: null, numero: null }
  ];

}
