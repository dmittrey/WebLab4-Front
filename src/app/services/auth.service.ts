import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {AuthResponse} from "../interfaces/AuthResponse";
import {HandleErrorService} from "./handle.error.service";
import {FormGroup} from "@angular/forms";
import {FormConverterService} from "./form.converter.service";
import {AuthStatus} from "../auth/AuthStatus";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * For testing on mock server
   */
  private loginUrl = 'https://2414043a-d7b9-42fd-963b-1f15a8a04cee.mock.pstmn.io/auth-request';
  private registerUrl = 'https://2414043a-d7b9-42fd-963b-1f15a8a04cee.mock.pstmn.io/register-request';

  /**
   * In real life
   */
  // private loginUrl = 'https://localhost:5903/auth-request';
  // private registerUrl = 'https://localhost:5903/register-request';

  loginUser(loginData: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, this.formConverter.convertToRequest(loginData, AuthStatus.LOGIN), {observe: 'body', responseType: 'json'})
      // .pipe(
      //   catchError(this.errorHandler.handleError)
      // );
  }

  registerUser(registerData: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, this.formConverter.convertToRequest(registerData.value, AuthStatus.REGISTER), {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  constructor(private http: HttpClient,
              private errorHandler: HandleErrorService,
              private formConverter: FormConverterService) {
  }
}
