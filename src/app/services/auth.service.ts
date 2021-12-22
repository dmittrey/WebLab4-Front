import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {AuthResponse} from "../interfaces/AuthResponse";
import {HandleErrorService} from "./handle.error.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'localhost:5903/auth-request';

  private registerUrl = 'localhost:5903/register-request';

  loginUser(loginData: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, loginData, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, registerData, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  constructor(private http: HttpClient, private errorHandler: HandleErrorService) {
  }
}
