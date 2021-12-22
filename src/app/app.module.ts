import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {EntryPageComponent} from './entry-page/entry-page.component';
import {EntryPageHeaderComponent} from './entry-page-header/entry-page-header.component';
import {AuthFormComponent} from './auth/auth-form/auth-form.component';
import {AuthFormLoginComponent} from './auth/auth-form-login/auth-form-login.component';
import {AuthFormRegisterComponent} from './auth/auth-form-register/auth-form-register.component';
import {AuthFormButtonComponent} from './auth/auth-form-button/auth-form-button.component';
import {AuthFormSwitcherComponent} from './auth/auth-form-switcher/auth-form-switcher.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AlertFieldComponent } from './alert-field/alert-field.component';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./services/auth.service";
import {HandleErrorService} from "./services/handle.error.service";
import {RegisterService} from "./services/register.service";


@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    EntryPageHeaderComponent,
    AuthFormComponent,
    AuthFormLoginComponent,
    AuthFormRegisterComponent,
    AuthFormButtonComponent,
    AuthFormSwitcherComponent,
    AlertFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, HandleErrorService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
