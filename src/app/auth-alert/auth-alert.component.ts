import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.scss']
})
export class AuthAlertComponent implements OnInit, OnDestroy {

  alertServiceSubscription?: Subscription;

  alertText: string;

  constructor(private alertService: AlertService) {
    this.alertText = "";
  }

  ngOnInit(): void {
    this.alertServiceSubscription = this.alertService.alert$.subscribe({
      next: (err) => {
        console.log(err);
        switch (err.status) {
          case (500):
            this.alertText = "Internal Server Error!";
            break;
          case (403):
            this.alertText = "Wrong credentials!";
            break;
          case (0):
            this.alertText = "Timeout exception!";
            break;
          default:
            this.alertText = err.message;
            break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.alertServiceSubscription?.unsubscribe();
  }
}
