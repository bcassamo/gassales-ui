import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

import { NovaEntidadeComponent } from './nova-entidade/nova-entidade.component';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';
import { PesquisaEntidadeComponent } from './pesquisa-entidade/pesquisa-entidade.component';

@NgModule({
  declarations: [
    NovaEntidadeComponent,
    PesquisaClienteComponent,
    PesquisaEntidadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,

    SharedModule
  ],
  exports: [
    NovaEntidadeComponent,
    PesquisaClienteComponent,
    PesquisaEntidadeComponent
  ]
})
export class EntidadesModule { }
