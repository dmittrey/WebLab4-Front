import {Injectable} from "@angular/core";
import {AuthResponse} from "../utility/AuthResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../utility/AuthRequest";
import {HitRequest} from "../utility/HitRequest";
import {Observable, tap, timeout} from "rxjs";
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

  private authUrl = 'http://192.168.0.193:8080/user';
  private hitServeUrl = 'http://192.168.0.193:8080/hit';

  constructor(private http: HttpClient) {
    this.token = "";
  }

  authHttpRequest(authRequest: AuthRequest, authType: AuthType): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl.concat("/", authType), authRequest, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      tap(
        (authResponse) => {
          console.log(authResponse.token);
          this.token = authResponse.token;
        })
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
      timeout(3000)
    )
  }

  clearToken(): void {
    this.token = "";
  }
}
