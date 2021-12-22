import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {AuthRequest} from "../interfaces/AuthRequest";
import {AuthResponse} from "../interfaces/AuthResponse";
import {HandleErrorService} from "./handle.error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'localhost:5903/auth-request';

  loginUser(loginData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, loginData, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  constructor(private http: HttpClient, private errorHandler: HandleErrorService) {
  }
}
