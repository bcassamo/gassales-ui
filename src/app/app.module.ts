import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

import { BusinessModule } from './business/business.module';
import { EntidadesModule } from './entidades/entidades.module';

import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';


import { PesquisaProdutosComponent } from './pesquisa-produtos/pesquisa-produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PesquisaProdutosComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    BusinessModule,
    EntidadesModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
