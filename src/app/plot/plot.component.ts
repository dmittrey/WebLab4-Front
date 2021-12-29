import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {HitServeStatus} from "../utility/HitServeStatus";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnDestroy, OnInit {

  @ViewChild(SvgComponent)
  private SvgComponent!: SvgComponent;

  private rValue?: number;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  // screenHeight?: number;
  // screenWidth?: number;
  //
  // @HostListener('window:resize', ['$event'])
  // getScreenSize() {
  //   this.screenHeight = window.innerHeight;
  //   this.screenWidth = window.innerWidth;
  //   console.log(this.screenHeight, this.screenWidth);
  // }

  // kek() {
  //   console.log(window.innerWidth);
  // }

  serveClick(event: MouseEvent) {
    if (this.rValue == undefined) {
      this.toastNotification();
    } else {
      let clickCoordinates = this.SvgComponent.clickPointEvent(event);
      this.hitService.addHit({
        typeOfService: HitServeStatus.ADD,
        xValue: clickCoordinates.xValue.toString(),
        yValue: clickCoordinates.yValue.toString(),
        rValue: clickCoordinates.rValue.toString()
      });
    }
  }

  switchSvgRadius(rValue: number) {
    this.SvgComponent.switchRadius(rValue);
  }

  rValueSubscription!: Subscription;
  hitServiceSubscription!: Subscription;

  //and add a line in constructor to get services instance
  constructor(private valueTransfer: ValueTransferService,
              private hitService: HitService) {
  }

  ngOnInit() {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        console.log("Hit service status updated: " + value);
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
