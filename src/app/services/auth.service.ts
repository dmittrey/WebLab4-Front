import {Injectable} from "@angular/core";
import {delay, Observable, tap} from "rxjs";
import {AuthResponse} from "../utility/AuthResponse";
import {FormGroup} from "@angular/forms";
import {FormConverterService} from "./form.converter.service";
import {AuthStatus} from "../auth/AuthStatus";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  constructor(private httpService: HttpService,
              private formConverter: FormConverterService) {
    this.isLoggedIn = false;
  }

  loginUser(loginData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(loginData, AuthStatus.LOGIN)
    ).pipe(
      delay(3000),
      tap(() => this.isLoggedIn = true)
    );
  };

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(registerData, AuthStatus.LOGIN)
    );
  };

  logout(): void {
    this.isLoggedIn = false;
  }
}
