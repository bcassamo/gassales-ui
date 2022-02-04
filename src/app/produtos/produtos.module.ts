import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';

@NgModule({
  declarations: [
    PesquisaProdutosComponent
  ],
  imports: [
    CommonModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule
  ],
  exports: [
    PesquisaProdutosComponent
  ]
})
export class ProdutosModule { }
