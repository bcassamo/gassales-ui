import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';
import { PesquisaAquisicaoComponent } from './pesquisa-aquisicao/pesquisa-aquisicao.component';

const businessRoutes: Routes = [
  { path: 'business/vendas', component: PesquisaVendaComponent },
  { path: 'business/vendas/novo', component: NovaVendaComponent },

  { path: 'business/aquisicoes', component: PesquisaAquisicaoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(businessRoutes)
  ],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
