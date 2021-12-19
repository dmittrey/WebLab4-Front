import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { EntryPageHeaderComponent } from './entry-page-header/entry-page-header.component';
import { RoutingButtonComponent } from './routing-button/routing-button.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { AuthFormLoginComponent } from './auth/auth-form-login/auth-form-login.component';
import { AuthFormRegisterComponent } from './auth/auth-form-register/auth-form-register.component';
import { AuthFormButtonComponent } from './auth/auth-form-button/auth-form-button.component';
import { AuthFormSwitcherComponent } from './auth/auth-form-switcher/auth-form-switcher.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    EntryPageHeaderComponent,
    RoutingButtonComponent,
    AuthFormComponent,
    AuthFormLoginComponent,
    AuthFormRegisterComponent,
    AuthFormButtonComponent,
    AuthFormSwitcherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
