import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpService} from "./http.service";
import {HitRequest} from "../utility/HitRequest";
import {HitRequestType} from "../utility/HitRequestType";
import {HitResponse} from "../utility/HitResponse";

/* При использовании данного сервиса необходимо подписаться на обновления hitRequestStatus$ */
@Injectable({
  providedIn: 'root'
})
export class HitService {

  private hitRequestStatusStorage = new Subject<HitResponse>();

  hitRequestStatus$ = this.hitRequestStatusStorage.asObservable();

  constructor(private httpService: HttpService) {
  }

  addHit(hitData: HitRequest): void {
    // Получим в callback ответ от сервера и затем поместим его в хранилище чтобы оповестить всех
    this.httpService.hitPostHttpRequest(hitData, HitRequestType.ADD).subscribe({
      next: value => {
        value.typeOfHitResponse = HitRequestType.ADD;
        this.hitRequestStatusStorage.next(value);
      }
    })
  };

  removeAllHits(): void {
    this.httpService.hitGetHttpRequest(HitRequestType.REMOVE_ALL).subscribe({
      next: value => {
        value.typeOfHitResponse = HitRequestType.REMOVE_ALL;
        this.hitRequestStatusStorage.next(value);
      }
    })
  };

  getAllHits(): void {
    this.httpService.hitGetHttpRequest(HitRequestType.GET_ALL).subscribe({
      next: value => {
        value.typeOfHitResponse = HitRequestType.GET_ALL;
        this.hitRequestStatusStorage.next(value);
      }
    })
  };
}
