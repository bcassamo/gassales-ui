import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { CoreModule } from './core/core.module';
import { BusinessModule } from './business/business.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EntidadesModule } from './entidades/entidades.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CoreModule,
    BusinessModule,
    EntidadesModule,
    ProdutosModule,

    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
