import {Injectable} from "@angular/core";
import {AuthResponse} from "../utility/AuthResponse";
import {HttpClient} from "@angular/common/http";
import {AuthRequest} from "../utility/AuthRequest";
import {HitRequest} from "../utility/HitRequest";
import {HitResponse} from "../utility/HitResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * For testing on mock server
   */
  private authUrl = 'https://b22c7f64-2244-49a8-a66f-1f96359f0b70.mock.pstmn.io/auth';
  private hitServeUrl = 'https://b22c7f64-2244-49a8-a66f-1f96359f0b70.mock.pstmn.io/hit';

  /**
   * In real life
   */
  // private authUrl = 'https://localhost:5903/auth';
  //private hitServeUrl = 'https://localhost:5903/hit';

  authHttpRequest(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, authRequest, {
      observe: 'body',
      responseType: 'json'
    })
  }

  hitHttpRequest(hitRequest: HitRequest): Observable<HitResponse> {
    console.log("In http post")
    return this.http.post<HitResponse>(this.hitServeUrl, hitRequest, {
      observe: 'body',
      responseType: 'json'
    })
  }

  constructor(private http: HttpClient) {
  }
}
