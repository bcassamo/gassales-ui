import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EntidadesModule } from './entidades/entidades.module';
import { TransaccaoModule } from './transaccao/transaccao.module';

import { BusinessModule } from './business/business.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CoreModule,
    ProdutosModule,
    EntidadesModule,
    TransaccaoModule,

    BusinessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
