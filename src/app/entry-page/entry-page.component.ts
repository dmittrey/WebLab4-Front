import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthFormLoginComponent} from "../auth/auth-form-login/auth-form-login.component";
import {AlertFieldComponent} from "../alert-field/alert-field.component";

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent {

  @ViewChild(AlertFieldComponent)
  private alertField!: AlertFieldComponent;

  constructor() {
  }

  changeAlert(newAlert: string) {
    this.alertField.innerText = newAlert;

    console.log(newAlert);
  }
}
