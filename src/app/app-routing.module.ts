import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessRoutingModule } from './business/business-routing.module';
import { ProdutosRoutingModule } from './produtos/produtos-routing.module';
import { EntidadesRoutingModule } from './entidades/entidades-routing.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'business/vendas', pathMatch: 'full' },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    // importando enquanto angular não resolver o bug
    BusinessRoutingModule,
    ProdutosRoutingModule,
    EntidadesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
