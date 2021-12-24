import {Injectable} from "@angular/core";
import {AuthResponse} from "../utility/AuthResponse";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {HandleErrorService} from "./handle.error.service";
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
  private authUrl = 'https://2414043a-d7b9-42fd-963b-1f15a8a04cee.mock.pstmn.io/auth';
  private hitServeUrl = 'https://2414043a-d7b9-42fd-963b-1f15a8a04cee.mock.pstmn.io/hit';

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
    return this.http.post<HitResponse>(this.hitServeUrl, hitRequest, {
      observe: 'body',
      responseType: 'json'
    })
  }

  constructor(private http: HttpClient) {
  }
}
