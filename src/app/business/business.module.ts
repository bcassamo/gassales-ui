import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { SharedModule } from './../shared/shared.module';
import { BusinessRoutingModule } from './business-routing.module';
import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';
import { PesquisaAquisicaoComponent } from './pesquisa-aquisicao/pesquisa-aquisicao.component';

@NgModule({
  declarations: [
    NovaVendaComponent,
    PesquisaVendaComponent,
    PesquisaAquisicaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,

    SharedModule,
    BusinessRoutingModule
  ],
  exports: [
    NovaVendaComponent,
    PesquisaVendaComponent
  ]
})
export class BusinessModule { }
