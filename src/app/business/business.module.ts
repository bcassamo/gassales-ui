import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { PesquisaVendaComponent } from './pesquisa-venda/pesquisa-venda.component';

@NgModule({
  declarations: [
    NovaVendaComponent,
    PesquisaVendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,

    SharedModule
  ],
  exports: [
    NovaVendaComponent,
    PesquisaVendaComponent
  ]
})
export class BusinessModule { }
