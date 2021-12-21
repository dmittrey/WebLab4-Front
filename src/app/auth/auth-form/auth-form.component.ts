import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthStatus} from "../AuthStatus";
import {AuthFormLoginComponent} from "../auth-form-login/auth-form-login.component";
import {AuthFormRegisterComponent} from "../auth-form-register/auth-form-register.component";
import {AuthFormButtonComponent} from "../auth-form-button/auth-form-button.component";
import {AuthFormSwitcherComponent} from "../auth-form-switcher/auth-form-switcher.component";

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

  submitAuth() {
    console.log("Submitted");
    console.log(
      (this.isLoginStatus()) ? this.loginComponent.loginFormGroup.value : this.registerComponent.loginFormGroup.value
    );
  }

  /* Refreshing child components variables */
  ngAfterViewInit() {
    setTimeout(() => this.authStatus = () => this.authSwitcher.authStatus, 0);
  }

}
