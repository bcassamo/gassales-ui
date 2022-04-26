import { NovaVendaComponent } from './business/nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './business/pesquisa-venda/pesquisa-venda.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { BusinessModule } from './business/business.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EntidadesModule } from './entidades/entidades.module';
import { NovoProdutoComponent } from './produtos/novo-produto/novo-produto.component';
import { NovaEntidadeComponent } from './entidades/nova-entidade/nova-entidade.component';
import { PesquisaProdutosComponent } from './produtos/pesquisa-produtos/pesquisa-produtos.component';
import { PesquisaEntidadeComponent } from './entidades/pesquisa-entidade/pesquisa-entidade.component';

const routes: Routes = [
  { path: 'business/vendas', component: PesquisaVendaComponent },
  { path: 'business/vendas/novo', component: NovaVendaComponent },

  { path: 'produtos', component: PesquisaProdutosComponent },
  { path: 'produtos/novo', component: NovoProdutoComponent },
  { path: 'produtos/:id', component: NovoProdutoComponent },

  { path: 'entidades', component: PesquisaEntidadeComponent },
  { path: 'entidades/nova', component: NovaEntidadeComponent }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),

    CoreModule,
    BusinessModule,
    EntidadesModule,
    ProdutosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
