import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthStatus} from "../AuthStatus";
import {AuthFormLoginComponent} from "../auth-form-login/auth-form-login.component";
import {AuthFormRegisterComponent} from "../auth-form-register/auth-form-register.component";
import {AuthFormButtonComponent} from "../auth-form-button/auth-form-button.component";
import {AuthFormSwitcherComponent} from "../auth-form-switcher/auth-form-switcher.component";
import {AuthService} from "../../services/auth.service";
import {FormGroup} from "@angular/forms";
import {Observer} from "rxjs";
import {AuthResponse} from "../../utility/AuthResponse";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthFormComponent implements AfterViewInit {

  /* Observers(Define typical behave for submitRegister/submitLogin) */
  loginObserver: Observer<AuthResponse> = {
    next: (value) => {
      //todo Логика обработки ответа какая? Можно сделать на уровень выше чтобы помещать туда токен
      console.log("Login successful!");
      console.log(value);
      this.navigationService.goToMain();
    },
    error: err => console.log("Error while logging: " + err),
    complete: () => console.log("Auth service has been completed while logging!")
  }
  registerObserver: Observer<AuthResponse> = {
    next: () => {
      console.log("Register successful!");
      this.navigationService.goToMain();
    },
    error: err => console.log("Error while register: " + err),
    complete: () => console.log("Auth service has been completed while register!")
  }
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

  //todo Утечку памяти предотвратить
  constructor(private authService: AuthService,
              private navigationService: NavigationService) {
  }

  /* Methods to access child components variables */
  authStatus(): AuthStatus {
    return 0;
  }

  submitLogin(loginForm: FormGroup) {
    this.authService.loginUser(loginForm).subscribe(this.loginObserver);
  }

  submitRegister(registerForm: FormGroup) {
    this.authService.registerUser(registerForm).subscribe(this.registerObserver);
  }

  /* Local logic */
  /**
   * Меняем состояние окна в template через ngIf!!
   */
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
