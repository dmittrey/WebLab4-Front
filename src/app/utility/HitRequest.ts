import {HitServeStatus} from "./HitServeStatus";
import {AbstractControl} from "@angular/forms";

export interface HitRequest {
  typeOfService: HitServeStatus;
  xValue: AbstractControl;
  yValue: string;
  rValue: AbstractControl;
}
