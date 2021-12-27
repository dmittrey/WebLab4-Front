import {HitServeStatus} from "./HitServeStatus";
import {Point} from "./Point";

export interface HitResponse {
  serveStatus: HitServeStatus,
  data: Point[]
}
