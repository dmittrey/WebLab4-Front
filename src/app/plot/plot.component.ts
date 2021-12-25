import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ValueTransferService} from "../services/value.transfer.service";
import {Subscription} from "rxjs";
import {SvgComponent} from "./svg/svg.component";

import {
  AppearanceAnimation,
  DialogLayoutDisplay, DisappearanceAnimation,
  ToastNotificationInitializer,
  ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum
} from "@costlydeveloper/ngx-awesome-popup";

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
      this.SvgComponent.clickPointEvent(event);
    }
  }

  //todo Нужно сделать еще

  switchSvgRadius(rValue: number) {
    this.SvgComponent.switchRadius(rValue);
  }

  subscription!: Subscription;

  //and add a line in constructor to get services instance
  constructor(private valueTransfer: ValueTransferService) {
  }

  ngOnInit() {
    this.subscription = this.valueTransfer.rValue$.subscribe({
      next: rValue => {
        this.switchSvgRadius(rValue);
        this.rValue = rValue;
      }
    });
  }

  //Чтобы не было утечки памяти
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.SvgComponent.cleanPlot();
  }

  // Create the method
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
