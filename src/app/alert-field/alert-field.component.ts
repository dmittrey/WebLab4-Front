import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert-field',
  templateUrl: './alert-field.component.html',
  styleUrls: ['./alert-field.component.scss']
})
export class AlertFieldComponent {

  @Input()
  className!: string;

  @Input()
  innerText!: string;

}
