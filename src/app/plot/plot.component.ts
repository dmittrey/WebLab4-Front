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
import {HitRequestType} from "../utility/HitRequestType";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnDestroy, OnInit {

  @ViewChild(SvgComponent)
  private SvgComponent!: SvgComponent;

  private rValueSubscription?: Subscription;

  private hitServiceSubscription?: Subscription;

  private rValue?: number;

  constructor(private valueTransfer: ValueTransferService,
              private hitService: HitService) {
  }

  serveClick(event: MouseEvent) {
    if (this.rValue == undefined) {
      this.toastNotification();
    } else {
      let clickCoordinates = this.SvgComponent?.getCoords(event);
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

        console.log("Plot updated!");
        if (value.typeOfHitResponse == HitRequestType.ADD) {
          this.SvgComponent.drawPoint(value.data[0]);
          this.SvgComponent.addPoint(value.data[0]);
        }
        if (value.typeOfHitResponse == HitRequestType.GET_ALL) {
          value.data.forEach(p => {
            console.log(p);

            this.SvgComponent.drawPoint(p);

            this.SvgComponent.addPoint(p);
          })
        }

        if (value.typeOfHitResponse == HitRequestType.REMOVE_ALL) {
          this.SvgComponent.cleanPlot();
        }
      }
    });

    this.hitService.getAllHits();

    this.rValueSubscription = this.valueTransfer.rValue$.subscribe({
      next: rValue => {
        this.switchSvgRadius(rValue);
        this.rValue = rValue;
      }
    });
  }

  // prevent memory leak when component destroyed
  ngOnDestroy() {
    this.rValueSubscription?.unsubscribe();
    this.hitServiceSubscription?.unsubscribe();
    this.SvgComponent.cleanPlot();
  }

  // https://costlydeveloper.github.io/ngx-awesome-popup/#/playground/toast-generator
  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('PLOT');
    newToastNotification.setMessage("R value doesn't entered!");

    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 3000,
      textPosition: 'right',
      layoutType: DialogLayoutDisplay.WARNING,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.STANDARD,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
      toastPosition: ToastPositionEnum.TOP_RIGHT,
      disableIcon: false,
    });

    newToastNotification.openToastNotification$();
  }
}
