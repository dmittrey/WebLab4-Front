import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpService} from "./http.service";
import {HitServeStatus} from "../utility/HitServeStatus";
import {HitResponse} from "../utility/HitResponse";
import {HitRequest} from "../utility/HitRequest";


/**
 * При использовании данного сервиса необходимо подписаться на обновления этого Observable
 */
@Injectable({
  providedIn: 'root'
})
export class HitService {

  private hitRequestStatusStorage = new Subject<HitResponse>();

  /**
   * При использовании данного сервиса необходимо подписаться на обновления этого Observable
   */
  hitRequestStatus$ = this.hitRequestStatusStorage.asObservable();

  addHit(hitData: HitRequest): void {
    console.log("Adding hit: " + hitData);
    // Получим в callback ответ от сервера и затем поместим его в хранилище чтобы оповестить всех
    this.httpService.hitHttpRequest(hitData).subscribe({
      next: value => this.hitRequestStatusStorage.next(value)
    })
  };

  removeAllHits(): void {
    console.log("Removing all hits from server!");

    this.httpService.hitHttpRequest({typeOfService: HitServeStatus.REMOVE_ALL}).subscribe({
      next: value => this.hitRequestStatusStorage.next(value)
    })
  };

  getAllHits(): void {
    console.log("Getting all hits from server!");

    this.httpService.hitHttpRequest({typeOfService: HitServeStatus.GET_ALL}).subscribe({
      next: value => this.hitRequestStatusStorage.next(value)
    })
  };

  constructor(private httpService: HttpService) {
  }
}
