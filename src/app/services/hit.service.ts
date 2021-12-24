import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {FormConverterService} from "./form.converter.service";
import {HttpService} from "./http.service";
import {HitServeStatus} from "../utility/HitServeStatus";
import {HitResponse} from "../utility/HitResponse";
import {catchError} from "rxjs/operators";
import {HandleErrorService} from "./handle.error.service";

@Injectable({
  providedIn: 'root'
})
export class HitService {

  addHit(hitData: FormGroup): Observable<HitResponse> {
    console.log(this.formConverter.convertHitToRequest(hitData, HitServeStatus.ADD));
    return this.httpService.hitHttpRequest(
      this.formConverter.convertHitToRequest(hitData, HitServeStatus.ADD)
    );
  };

  removeAllHits(): Observable<HitResponse> {
    return this.httpService.hitHttpRequest(
      this.formConverter.convertHitToRequest(null, HitServeStatus.REMOVE_ALL)
    ).pipe(
      catchError(this.errorHandler.handleHTTPError)
    );
  };

  getAllHits(): Observable<HitResponse> {
    return this.httpService.hitHttpRequest(
      this.formConverter.convertHitToRequest(null, HitServeStatus.GET_ALL)
    ).pipe(
      catchError(this.errorHandler.handleHTTPError)
    );
  };

  constructor(private httpService: HttpService,
              private formConverter: FormConverterService,
              private errorHandler: HandleErrorService) {
  }
}
