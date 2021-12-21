import {Component} from '@angular/core';

import {AuthStatus} from "../AuthStatus";

@Component({
  selector: 'app-auth-form-switcher',
  templateUrl: './auth-form-switcher.component.html',
  styleUrls: ['./auth-form-switcher.component.scss']
})
export class AuthFormSwitcherComponent {

  authStatus!: AuthStatus;

  switchLogin() {
    this.authStatus = AuthStatus.LOGIN;
  }

  switchRegister() {
    this.authStatus = AuthStatus.REGISTER;
  }

  constructor() {
    this.authStatus = AuthStatus.LOGIN;
  }
}
