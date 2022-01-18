import {Component, ViewChild} from '@angular/core';
import {AlertFieldComponent} from "../alert-field/alert-field.component";

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent {

  @ViewChild(AlertFieldComponent)
  private alertField?: AlertFieldComponent;

  constructor() {
  }

  changeAlert(newAlert: string) {
    if (this.alertField != undefined) this.alertField.innerText = newAlert;
  }
}
