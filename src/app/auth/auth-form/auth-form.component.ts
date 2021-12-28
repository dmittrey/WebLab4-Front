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
import {SizeAdaptingService} from "../../services/size.adapting.service";

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

  @ViewChild(AuthFormSwitcherComponent)
  private authSwitcher!: AuthFormSwitcherComponent;

  /* Methods to access child components variables */
  authStatus(): AuthStatus {
    return 0;
  }

  /* Методы вызываемые из дочерних компонентов */

  //todo Утекает ли тут память?
  submitLogin(loginForm: FormGroup) {
    this.authService.loginUser(loginForm).subscribe(this.loginObserver);
  }

  submitRegister(registerForm: FormGroup) {
    this.authService.registerUser(registerForm).subscribe(this.registerObserver);
  }

  /* Observers(Define typical behave for submitRegister/submitLogin) */
  loginObserver: Observer<AuthResponse> = {
    next: value => {
      console.log(value);
      this.navigationService.goToMain();
    },
    error: err => {
      console.log(err);
      //todo Убрать, это для того чтобы разрабатывать также!
      this.navigationService.goToMain();
    },
    complete: () => console.log("completed")
  }

  registerObserver: Observer<AuthResponse> = {
    next: value => console.log(value),
    error: err => console.log(err),
    complete: () => console.log("completed")
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

  //todo Утечку памяти предотвратить
  constructor(private authService: AuthService,
              private navigationService: NavigationService,
              public sizeAdaptingService: SizeAdaptingService) {
  }

  /* Refreshing child components variables */
  ngAfterViewInit() {
    setTimeout(() => this.authStatus = () => this.authSwitcher.authStatus, 0);
  }

}
