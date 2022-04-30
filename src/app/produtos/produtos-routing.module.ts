import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';

const routes: Routes = [
  { path: 'produtos', component: PesquisaProdutosComponent },
  { path: 'produtos/novo', component: NovoProdutoComponent },
  { path: 'produtos/:id', component: NovoProdutoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
