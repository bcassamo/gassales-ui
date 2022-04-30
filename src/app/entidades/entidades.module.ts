import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

import { EntidadesRoutingModule } from './entidades-routing.module';
import { NovaEntidadeComponent } from './nova-entidade/nova-entidade.component';
import { PesquisaEntidadeComponent } from './pesquisa-entidade/pesquisa-entidade.component';

@NgModule({
  declarations: [
    NovaEntidadeComponent,
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

    SharedModule,
    EntidadesRoutingModule
  ],
  exports: []
})
export class EntidadesModule { }
