import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NovaEntidadeComponent } from './nova-entidade/nova-entidade.component';
import { PesquisaEntidadeComponent } from './pesquisa-entidade/pesquisa-entidade.component';

const entidadesRoutes: Routes = [
  { path: 'entidades', component: PesquisaEntidadeComponent },
  { path: 'entidades/nova', component: NovaEntidadeComponent },
  { path: 'entidades/:id', component: NovaEntidadeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(entidadesRoutes)
  ],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
