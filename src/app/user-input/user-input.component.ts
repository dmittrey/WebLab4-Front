import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HitService} from "../services/hit.service";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  // template: '<app-test></app-test>',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {

  userInput = this.fb.group({
    xSelect: [null, [Validators.required]],
    yText: ['', [Validators.compose([
      // 1. Username field is Required
      Validators.required,

      // 2. check whether the entered username has a special character
      Validators.pattern(/^[+-]?\d+(\.\d+)?$/),
    ])]],
    rSelect: [null, [Validators.required]]
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

  get xSelect() {
    return this.userInput.controls['xSelect'];
  }

  get yText() {
    return this.userInput.controls['yText'];
  }

  get rSelect() {
    return this.userInput.controls['rSelect'];
  }

  constructor(private fb: FormBuilder,
              private hitService: HitService) {
  }

  submit() {
    console.log(this.userInput.value);
    this.hitService.addHit(this.userInput).subscribe({
      next: value => console.log(value)
    })
    // console.log(this.userInput.value);
  }

  //
  // ngOnInit() {
  // }

}
