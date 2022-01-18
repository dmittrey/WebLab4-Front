import {HitRequestType} from "./HitRequestType";
import {Point} from "./Point";

export interface HitResponse {
  data: Point[];
  typeOfHitResponse: HitRequestType;
}
