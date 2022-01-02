import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class ValueTransferService {

  // Observable источник значения R
  private rValueStorage = new Subject<number>();

  // Observable объект rValueStorage
  rValue$ = this.rValueStorage.asObservable();

  //Метод для изменения состояния хранилища чтобы нотифаить всех подписчиков изменения наа RValue
  switchRValue(rValue: number) {
    this.rValueStorage.next(rValue);
  }
}
