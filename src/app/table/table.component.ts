import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HitService} from "../services/hit.service";
import {HitServeStatus} from "../utility/HitServeStatus";
import {Point} from "../utility/Point";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  hitServiceSubscription!: Subscription;
  hitList: Point[] = [];

  constructor(private hitService: HitService) { }

  ngOnInit(): void {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        console.log("Table updated by hits: " + value);
        if (value != null) {
          if (value.serveStatus == HitServeStatus.ADD) this.hitList.push(value.data[0]);
          if (value.serveStatus == HitServeStatus.GET_ALL) this.hitList = value.data;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.hitServiceSubscription.unsubscribe();
  }

}
