import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

@NgModule({
  declarations: [
    PesquisaProdutosComponent,
    NovoProdutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,

    SharedModule
  ],
  exports: [
    PesquisaProdutosComponent,
    NovoProdutoComponent
  ]
})
export class ProdutosModule { }
