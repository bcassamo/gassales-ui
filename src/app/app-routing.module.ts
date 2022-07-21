import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutosRoutingModule } from './produtos/produtos-routing.module';
import { EntidadesRoutingModule } from './entidades/entidades-routing.module';
import { TransaccaoRoutingModule } from './transaccao/transaccao-routing.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'transaccao/vendas', pathMatch: 'full' },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    // importando enquanto angular não resolver o bug
    TransaccaoRoutingModule,
    ProdutosRoutingModule,
    EntidadesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
