import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertStorage = new Subject<HttpErrorResponse>();

  alert$ = this.alertStorage.asObservable();

  constructor() {
  }

  injectAlert(newAlert: HttpErrorResponse) {
    this.alertStorage.next(newAlert);
  }
}
