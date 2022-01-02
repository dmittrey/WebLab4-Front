import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HitService} from "../services/hit.service";
import {Point} from "../utility/Point";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  hitServiceSubscription!: Subscription;
  hitList: Point[] = [];

  constructor(private hitService: HitService) {
  }

  clearTable() {
    this.hitList = [];
    this.hitService.removeAllHits();
  }

  ngOnInit(): void {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        console.log("Table updated by hits: ");
        console.log(value[0]);
        if (value != null) {
          if (value.length == 1) this.hitList.push(value[0]);
          if (value.length > 1) this.hitList = value;
        }
      }
    })

    this.hitService.getAllHits();
  }

  ngOnDestroy(): void {
    this.hitServiceSubscription.unsubscribe();
  }

}
