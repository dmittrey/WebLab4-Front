import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HitService} from "../services/hit.service";
import {Point} from "../utility/Point";
import {HitRequestType} from "../utility/HitRequestType";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  private hitServiceSubscription?: Subscription;

  hitList: Point[] = [];

  constructor(private hitService: HitService) {
  }

  clearTable() {
    this.hitService.removeAllHits();
  }

  ngOnInit(): void {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        console.log("Table updated!");
        if (value.typeOfHitResponse == HitRequestType.ADD) this.hitList.push(value.data[0]);
        if (value.typeOfHitResponse == HitRequestType.GET_ALL) this.hitList = value.data;
        if (value.typeOfHitResponse == HitRequestType.REMOVE_ALL) this.hitList = [];
      }
    })
  }

  ngOnDestroy(): void {
    this.hitServiceSubscription?.unsubscribe();
  }
}
