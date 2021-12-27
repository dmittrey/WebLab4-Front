import {Coordinates} from "./Coordinates";

export interface Point {
  hitResult: boolean,
  coordinates: Coordinates,
  currentTime?: string,
  executionTime?: string
}
