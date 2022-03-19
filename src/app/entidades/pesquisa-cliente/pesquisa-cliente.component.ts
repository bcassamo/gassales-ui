import { EntidadeService, EntidadeFiltro } from './../entidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  clientes = [];
  nome?: string;
  nuit?: string;

  constructor(private entidadeService: EntidadeService) { }

  ngOnInit(): void {
    this.pesquisar()
  }

  pesquisar() {
    const filtro: EntidadeFiltro = {
      nome: this.nome,
      nuit: this.nuit
    }

    this.entidadeService.pesquisar(filtro)
      .then(customers => this.clientes = customers);
  }
}
