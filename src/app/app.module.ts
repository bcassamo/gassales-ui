import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';
import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NovaEntidadeComponent } from './nova-entidade/nova-entidade.component';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NovaVendaComponent,
    PesquisaVendaComponent,
    NavbarComponent,
    PesquisaProdutosComponent,
    NovaEntidadeComponent,
    PesquisaClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
