import {Injectable} from "@angular/core";
import {AuthResponse} from "../utility/AuthResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../utility/AuthRequest";
import {HitRequest} from "../utility/HitRequest";
import {Observable, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HandleErrorService} from "./handle.error.service";
import {AuthType} from "../utility/AuthType";
import {HitRequestType} from "../utility/HitRequestType";
import {Point} from "../utility/Point";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token: string;

  private authUrl = 'http://localhost:8080/user';
  private hitServeUrl = 'http://localhost:8080/hit';

  constructor(private http: HttpClient,
              private errorHandler: HandleErrorService) {
    this.token = "";
  }

  authHttpRequest(authRequest: AuthRequest, authType: AuthType): Observable<AuthResponse> {
    console.log(authRequest);
    return this.http.post<AuthResponse>(this.authUrl.concat("/", authType), authRequest, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      tap((authResponse) => this.token = authResponse.token),
      catchError(this.errorHandler.handleHTTPError)
    );
  }

  hitHttpRequest(hitRequest: HitRequest | null, hitRequestType: HitRequestType): Observable<Point[]> {
    console.log(hitRequest);
    return this.http.post<Point[]>(this.hitServeUrl.concat("/", hitRequestType), hitRequest, {
      observe: 'body',
      responseType: 'json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer_'.concat(this.token)
      })
    }).pipe(
      tap((hitResponse) => console.log(hitResponse)),
      catchError(this.errorHandler.handleHTTPError)
    );
  }

  clearToken(): void {
    this.token = "";
  }
}
