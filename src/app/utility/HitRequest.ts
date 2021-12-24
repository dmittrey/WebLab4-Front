import {HitServeStatus} from "./HitServeStatus";

export interface HitRequest {
  typeOfService: HitServeStatus;
  xValue: number;
  yValue: number;
  rValue: number;
}
