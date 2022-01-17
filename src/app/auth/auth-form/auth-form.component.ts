import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AuthStatus} from "../AuthStatus";
import {AuthFormLoginComponent} from "../auth-form-login/auth-form-login.component";
import {AuthFormRegisterComponent} from "../auth-form-register/auth-form-register.component";
import {AuthFormButtonComponent} from "../auth-form-button/auth-form-button.component";
import {AuthFormSwitcherComponent} from "../auth-form-switcher/auth-form-switcher.component";
import {AuthService} from "../../services/auth.service";
import {FormGroup} from "@angular/forms";
import {AuthResponse} from "../../utility/AuthResponse";
import {NavigationService} from "../../services/navigation.service";
import {Observer, Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthFormComponent implements AfterViewInit {

  /* Child components */
  @ViewChild(AuthFormLoginComponent)
  private loginComponent!: AuthFormLoginComponent;
  @ViewChild(AuthFormRegisterComponent)
  private registerComponent!: AuthFormRegisterComponent;
  @ViewChild(AuthFormButtonComponent)
  private submitButton!: AuthFormButtonComponent;

  /* Методы вызываемые из дочерних компонентов */
  @ViewChild(AuthFormSwitcherComponent)
  private authSwitcher!: AuthFormSwitcherComponent;

  constructor(private authService: AuthService) {
  }

  /* Methods to access child components variables */
  authStatus(): AuthStatus {
    return 0;
  }

  submitLogin(loginForm: FormGroup) {
    this.authService.loginUser(loginForm);
  }

  submitRegister(registerForm: FormGroup) {
    this.authService.registerUser(registerForm);
  }

  /* Local logic */

  /* (Меняем состояние окна в template через ngIf) */
  isLoginStatus(): boolean {
    return this.authStatus() == AuthStatus.LOGIN;
  }

  isRegisterStatus(): boolean {
    return this.authStatus() == AuthStatus.REGISTER;
  }

  /* Refreshing child components variables */
  ngAfterViewInit() {
    setTimeout(() => this.authStatus = () => this.authSwitcher.authStatus, 0);
  }
}
