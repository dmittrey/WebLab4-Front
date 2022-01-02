import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpService} from "./http.service";
import {HitRequest} from "../utility/HitRequest";
import {HitRequestType} from "../utility/HitRequestType";
import {Point} from "../utility/Point";

/**
 * При использовании данного сервиса необходимо подписаться на обновления hitRequestStatus$
 */
@Injectable({
  providedIn: 'root'
})
export class HitService {

  private hitRequestStatusStorage = new Subject<Point[]>();

  hitRequestStatus$ = this.hitRequestStatusStorage.asObservable();

  constructor(private httpService: HttpService) {
  }

  addHit(hitData: HitRequest): void {
    console.log("Adding hit: ");
    console.log(hitData);
    // Получим в callback ответ от сервера и затем поместим его в хранилище чтобы оповестить всех
    this.httpService.hitHttpRequest(hitData, HitRequestType.ADD).subscribe({
      next: value => {
        console.log(value);
        this.hitRequestStatusStorage.next(value);
      }
    })
  };

  removeAllHits(): void {
    console.log("Removing all hits from server!");

    this.httpService.hitHttpRequest(null, HitRequestType.REMOVE_ALL).subscribe({
      next: value => this.hitRequestStatusStorage.next(value)
    })
  };

  getAllHits(): void {
    console.log("Getting all hits from server!");

    this.httpService.hitHttpRequest(null, HitRequestType.GET_ALL).subscribe({
      next: value => this.hitRequestStatusStorage.next(value)
    })
  };
}
