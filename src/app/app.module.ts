import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    NovaVendaComponent,
    PesquisaVendaComponent,
    NavbarComponent,
    PesquisaProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
