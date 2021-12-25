import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ValueTransferService} from "../services/value.transfer.service";
import {Subscription} from "rxjs";
import {SvgComponent} from "./svg/svg.component";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnDestroy{

  @ViewChild(SvgComponent)
  private SvgComponent!: SvgComponent;

  switchSvgRadius(rValue: number) {
    this.SvgComponent.switchRadius(rValue);
  }

  subscription: Subscription;

  constructor(private valueTransfer: ValueTransferService) {
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
    }
}
