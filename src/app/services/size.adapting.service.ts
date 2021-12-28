import {Injectable} from "@angular/core";

@Injectable()
export class SizeAdaptingService {
  //todo Делать ли смену размера по подписке?

  width: number;
  height: number;

  constructor() {
    this.width = window.screen.width;
    this.height = window.screen.height;
  }

  adaptWidth(widthPercent: number): string {
    return widthPercent / 100 * this.width + 'px';
  }

  adaptHeight(heightPercent: number): string {
    return heightPercent / 100 * this.height + 'px';
  }
}
