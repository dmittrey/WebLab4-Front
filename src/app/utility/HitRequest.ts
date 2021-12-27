import {HitServeStatus} from "./HitServeStatus";
import {AbstractControl} from "@angular/forms";

export interface HitRequest {
  typeOfService: HitServeStatus;
  xValue?: string;
  yValue?: string;
  rValue?: string;
}
