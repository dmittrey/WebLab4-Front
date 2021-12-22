import {AuthRequest} from "../interfaces/AuthRequest";
import {Observable} from "rxjs";
import {AuthResponse} from "../interfaces/AuthResponse";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HandleErrorService} from "./handle.error.service";

@Injectable()
export class RegisterService {

  private registerUrl = 'localhost:5903/register-request';

  registerUser(registerData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, registerData, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  constructor(private http: HttpClient, private errorHandler: HandleErrorService) {
  }
}
