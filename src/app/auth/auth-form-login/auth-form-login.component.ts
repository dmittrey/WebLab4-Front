import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CustomValidators} from "../CustomValidators";

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthFormLoginComponent {

  @Output() login = new EventEmitter<FormGroup>();

  loginFormGroup = this.fb.group({
    username: null,
    password: [null, Validators.compose([

      // 1. check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {hasNumber: true}),

      // 2. check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),

      // 3. check whether the entered password has a lower-case letter
      CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),

      // 4. check whether the entered password has a special character
      CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]/, {hasSpecialCharacters: true}),
    ])]
  });

  constructor(private fb: FormBuilder) {
  }

  get username() {
    return this.loginFormGroup.controls['username'];
  }

  get password() {
    return this.loginFormGroup.controls['password'];
  }

  submit() {
    console.log(this.loginFormGroup.valid);
    if (this.loginFormGroup.valid) {
      // console.log(this.loginFormGroup.value);
      this.login.emit(this.loginFormGroup);
    }
  }

}
