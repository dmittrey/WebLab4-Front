import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthResponse} from "../utility/AuthResponse";
import {FormGroup} from "@angular/forms";
import {FormConverterService} from "./form.converter.service";
import {HttpService} from "./http.service";
import {AuthType} from "../utility/AuthType";

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
      this.formConverter.convertAuthToRequest(loginData), AuthType.LOGIN
    ).pipe(
      tap(() => {
        this.isLoggedIn = true;
      })
    );
  };

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(registerData), AuthType.REGISTER
    ).pipe(
      tap(() => {
        this.isLoggedIn = true;
      })
    );
  };

  logout(): void {
    this.isLoggedIn = false;
  }
}
