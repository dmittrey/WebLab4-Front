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
    this.isLoggedIn = localStorage.getItem("isLoggedIn") != null;
  }

  loginUser(loginData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(loginData, AuthStatus.LOGIN)
    ).pipe(
      delay(3000),//todo Нужно ли ждать 3 секунды ответа?
      tap(() => {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "Privet");
      }) // Держать в куки
    );
  };

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(registerData, AuthStatus.LOGIN)
    );
  };

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
  }
}
