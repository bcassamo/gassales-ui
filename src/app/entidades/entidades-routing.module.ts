import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NovaEntidadeComponent } from './nova-entidade/nova-entidade.component';
import { PesquisaEntidadeComponent } from './pesquisa-entidade/pesquisa-entidade.component';

const routes: Routes = [
  { path: 'entidades', component: PesquisaEntidadeComponent },
  { path: 'entidades/nova', component: NovaEntidadeComponent },
  { path: 'entidades/:id', component: NovaEntidadeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
