import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ValueTransferService} from "../services/value.transfer.service";
import {Subscription} from "rxjs";
import {SvgComponent} from "./svg/svg.component";

import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum
} from "@costlydeveloper/ngx-awesome-popup";
import {HitService} from "../services/hit.service";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnDestroy, OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  rValueSubscription!: Subscription;
  hitServiceSubscription!: Subscription;

  @ViewChild(SvgComponent)
  private SvgComponent!: SvgComponent;
  private rValue?: number;

  //and add a line in constructor to get services instance
  constructor(private valueTransfer: ValueTransferService,
              private hitService: HitService) {
  }

  serveClick(event: MouseEvent) {
    if (this.rValue == undefined) {
      this.toastNotification();
    } else {
      let clickCoordinates = this.SvgComponent.getCoords(event);
      console.log(clickCoordinates);
      this.hitService.addHit({
        xValue: clickCoordinates.xvalue.toString(),
        yValue: clickCoordinates.yvalue.toString(),
        rValue: clickCoordinates.rvalue.toString()
      });
    }
  }

  switchSvgRadius(rValue: number) {
    this.SvgComponent.switchRadius(rValue);
  }

  ngOnInit() {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        console.log(value);
        if (value) {
          console.log("Plot cleared!");
          this.SvgComponent.cleanPlot();
        }

        console.log("Hit service status updated: ");

        value.forEach(p => {
          console.log(p);

          this.SvgComponent.drawPoint(p);

          this.SvgComponent.addPoint(p);
        })
      }
    })
    this.rValueSubscription = this.valueTransfer.rValue$.subscribe({
      next: rValue => {
        this.switchSvgRadius(rValue);
        this.rValue = rValue;
      }
    });
  }

  // Чтобы не было утечки памяти
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.rValueSubscription.unsubscribe();
    this.hitServiceSubscription.unsubscribe();
    this.SvgComponent.cleanPlot();
  }

  // https://costlydeveloper.github.io/ngx-awesome-popup/#/playground/toast-generator
  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('PLOT');
    newToastNotification.setMessage("R value doesn't entered!");

    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 3000, // optional
      textPosition: 'right', // optional
      layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.STANDARD, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: ToastPositionEnum.TOP_RIGHT,
      disableIcon: false,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
  }
}
