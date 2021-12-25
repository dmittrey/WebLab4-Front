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

  //todo Вот с хитами также надо, то есть мы делаем подписку на обсервер внутри сервиса
  // и потом тупо ловим апдейты состояния точки
  // К примеру отправили ее на сервак с формы и также добавили на плоскость,
  // скорее всего в плоскости надо хранить коллекцию точек
}
