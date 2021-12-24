import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthResponse} from "../utility/AuthResponse";
import {FormGroup} from "@angular/forms";
import {FormConverterService} from "./form.converter.service";
import {AuthStatus} from "../auth/AuthStatus";
import {HttpService} from "./http.service";
import {HandleErrorService} from "./handle.error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUser(loginData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(loginData, AuthStatus.LOGIN)
    ).pipe(
      catchError(this.errorHandler.handleHTTPError)
    );
  };

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.httpService.authHttpRequest(
      this.formConverter.convertAuthToRequest(registerData, AuthStatus.LOGIN)
    ).pipe(
      catchError(this.errorHandler.handleHTTPError)
    );
  }

  constructor(private httpService: HttpService,
              private formConverter: FormConverterService,
              private errorHandler: HandleErrorService) {
  }
}
