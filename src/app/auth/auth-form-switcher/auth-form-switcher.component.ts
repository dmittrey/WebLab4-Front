import {Component} from '@angular/core';

import {AuthStatus} from "../authStatus";

@Component({
  selector: 'app-auth-form-switcher',
  templateUrl: './auth-form-switcher.component.html',
  styleUrls: ['./auth-form-switcher.component.scss']
})
export class AuthFormSwitcherComponent {

  authStatus!: AuthStatus;

  switchAuth() {
    this.authStatus = (this.authStatus == AuthStatus.LOGIN) ? AuthStatus.REGISTER : AuthStatus.LOGIN;
    console.log(this.authStatus);
  }

  constructor() {
    this.authStatus = AuthStatus.LOGIN;
  }
}
