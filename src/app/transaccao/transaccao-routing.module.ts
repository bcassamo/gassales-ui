import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';

const transaccaoRoutes: Routes = [
  { path: 'transaccao/vendas', component: PesquisaVendaComponent },
  { path: 'transaccao/vendas/nova', component: NovaVendaComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(transaccaoRoutes)
  ],
  exports: [RouterModule]
})
export class TransaccaoRoutingModule { }
