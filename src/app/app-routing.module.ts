import { EntidadesRoutingModule } from './entidades/entidades-routing.module';
import { ProdutosRoutingModule } from './produtos/produtos-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NovaVendaComponent } from './business/nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './business/pesquisa-venda/pesquisa-venda.component';

const routes: Routes = [
  { path: '', redirectTo: 'business/vendas', pathMatch: 'full' },

  { path: 'business/vendas', component: PesquisaVendaComponent },
  { path: 'business/vendas/novo', component: NovaVendaComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
