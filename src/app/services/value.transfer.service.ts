import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class ValueTransferService {

  // Observable источник значения R
  private rValueStorage = new Subject<number>();

  // Observable объект rValueStorage
  rValue$ = this.rValueStorage.asObservable();

  switchRValue(rValue: number) {
    this.rValueStorage.next(rValue);
  }
}
