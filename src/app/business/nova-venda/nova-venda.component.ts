import { EntidadeService } from './../../entidades/entidade.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent implements OnInit {

  lancamentos = [
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 850.20, quantidade: 2, valorTotal: 1700.40, produto: 1 },
    { descricao: 'Aquisição', dataLancamento: new Date(2022, 1, 20), estado: 'CHEIA', preco: 1200.00, quantidade: 20, valorTotal: 2400.00, produto: 3 },
    { descricao: 'Venda', dataLancamento: new Date(2022, 1, 18), estado: 'CHEIA', preco: 1200.00, quantidade: 2, valorTotal: 2400.00, produto: 3 }
  ];

  selectedCustomer?: string;
  filteredClients: any[] = [];
  customers: any[] = [];

  produtos = [
    { nome: 'Oxigénio', id: '1' },
    { nome: 'Nitogénio', id: '3' }
  ];

  constructor(private entidadeService: EntidadeService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  valorT = 15000;

  getAllCustomers() {
    this.entidadeService.customerNames()
      .then(customers => {
        this.customers = customers;
      });
  }

  search(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];

      if(customer.nome.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(customer.nome);
      }
    }
    this.filteredClients = filtered;
  }

}
