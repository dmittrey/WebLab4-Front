import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ValueTransferService} from "../services/value.transfer.service";
import {Subscription} from "rxjs";
import {SvgComponent} from "./svg/svg.component";
import {HostListener} from "@angular/core"

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnDestroy {

  @ViewChild(SvgComponent)
  private SvgComponent!: SvgComponent;

  // screenHeight?: number;
  // screenWidth?: number;
  //
  // @HostListener('window:resize', ['$event'])
  // getScreenSize() {
  //   this.screenHeight = window.innerHeight;
  //   this.screenWidth = window.innerWidth;
  //   console.log(this.screenHeight, this.screenWidth);
  // }

  kek() {
    console.log(window.innerWidth);
  }

  switchSvgRadius(rValue: number) {
    this.SvgComponent.switchRadius(rValue);
  }

  subscription: Subscription;

  constructor(private valueTransfer: ValueTransferService) {

    // this.getScreenSize();

    // Инжектим сервис и подпишемся на обновления стрима из значений RValue
    this.subscription = valueTransfer.rValue$.subscribe({
      next: rValue => {
        this.switchSvgRadius(rValue);
      }
    });
  }

  //Чтобы не было утечки памяти
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.SvgComponent.cleanPlot();
  }
}
