import {Injectable} from "@angular/core";
import {Observer} from "rxjs";
import {AuthResponse} from "../utility/AuthResponse";
import {FormGroup} from "@angular/forms";
import {FormConverterService} from "./form.converter.service";
import {HttpService} from "./http.service";
import {AuthType} from "../utility/AuthType";
import {NavigationService} from "./navigation.service";
import {AlertService} from "./alert.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedStatus: boolean;

  private authObserver: Observer<AuthResponse> = {
    next: () => {
      this.loggedStatus = true;
      this.navigationService.goToMain();
    },

    error: (err: HttpErrorResponse) => this.alertService.injectAlert(err),

    complete: () => console.log("Auth service completed!")
  }

  constructor(private httpService: HttpService,
              private formConverter: FormConverterService,
              private navigationService: NavigationService,
              private alertService: AlertService) {
    this.loggedStatus = false;
  }

  isLoggedIn(): boolean {
    return this.loggedStatus;
  }

  loginUser(loginData: FormGroup): void {
    this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(loginData), AuthType.LOGIN).subscribe(this.authObserver);
  };

  registerUser(registerData: FormGroup): void {
    this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(registerData), AuthType.REGISTER).subscribe(this.authObserver);
  };

  logout(): void {
    this.loggedStatus = false;
    this.httpService.clearToken();
  }
}
