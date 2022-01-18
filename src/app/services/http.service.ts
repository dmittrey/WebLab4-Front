import {Injectable} from "@angular/core";
import {AuthResponse} from "../utility/AuthResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../utility/AuthRequest";
import {HitRequest} from "../utility/HitRequest";
import {Observable, tap, timeout} from "rxjs";
import {AuthType} from "../utility/AuthType";
import {HitRequestType} from "../utility/HitRequestType";
import {HitResponse} from "../utility/HitResponse";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token: string;

  private authUrl = 'http://localhost:8080/user';
  private hitServeUrl = 'http://localhost:8080/hit';

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
        (authResponse) => this.token = authResponse.token
      )
    );
  }

  hitPostHttpRequest(hitRequest: HitRequest | null, hitRequestType: HitRequestType): Observable<HitResponse> {
    return this.http.post<HitResponse>(this.hitServeUrl.concat("/", hitRequestType), hitRequest, {
      observe: 'body',
      responseType: 'json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer_'.concat(this.token)
      })
    }).pipe(
      timeout(3000)
    )
  }

  hitGetHttpRequest(hitRequestType: HitRequestType): Observable<HitResponse> {
    return this.http.get<HitResponse>(this.hitServeUrl.concat("/", hitRequestType), {
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
