import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HitService} from "../services/hit.service";
import {CustomValidators} from "../auth/CustomValidators";
import {ValueTransferService} from "../services/value.transfer.service";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {

  userInput = this.fb.group({
    xSelect: null,
    yText: ['', CustomValidators.strictUnEquationValidator(-5, 3, {min: true}, {max: true})],
    rSelect: [null, CustomValidators.strictUnEquationValidator(0, 5, {min: true}, {max: true})]
  });

  /* Form models */
  xSelectOptions = [
    {value: -4},
    {value: -3},
    {value: -2},
    {value: -1},
    {value: 0},
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4}
  ];

  rSelectOptions = [
    {value: -4},
    {value: -3},
    {value: -2},
    {value: -1},
    {value: 0},
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4}
  ];

  constructor(private fb: FormBuilder,
              private hitService: HitService,
              public valueTransfer: ValueTransferService) {
  }

  get xSelect() {
    return this.userInput.controls['xSelect'];
  }

  get yText() {
    return this.userInput.controls['yText'];
  }

  get rSelect() {
    return this.userInput.controls['rSelect'];
  }

  submit() {
    console.log(this.xSelect.value.value.toString());
    console.log(this.yText.value);
    console.log(this.rSelect.value.value.toString());

    this.hitService.addHit({
      xValue: this.xSelect.value.value.toString(),
      yValue: this.yText.value,
      rValue: this.rSelect.value.value.toString()
    });
  }
}
