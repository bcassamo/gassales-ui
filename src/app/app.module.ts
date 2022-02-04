import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

import { BusinessModule } from './business/business.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EntidadesModule } from './entidades/entidades.module';

import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    BusinessModule,
    EntidadesModule,
    ProdutosModule,

    MessageModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
