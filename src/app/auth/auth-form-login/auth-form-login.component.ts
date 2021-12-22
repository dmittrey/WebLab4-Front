import {Component} from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';

import {CustomValidators} from "../CustomValidators";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss']
})
export class AuthFormLoginComponent {

  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.compose([
      // 1. Username field is Required
      Validators.required,

      // 2. check length of username
      Validators.minLength(3),
      Validators.maxLength(30),

      // 3. check whether the entered username has a special character
      Validators.pattern('^[a-zA-Z-0123456789]*$'),
    ])),
    password: new FormControl('', Validators.compose([
      // 1. Password Field is Required
      Validators.required,

      // 2. check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {hasNumber: true}),

      // 3. check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),

      // 4. check whether the entered password has a lower-case letter
      CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),

      // 5. check whether the entered password has a special character
      CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]/, {hasSpecialCharacters: true}),

      // 6. Has a minimum length of 8 characters
      Validators.minLength(8)
    ]))
  });

  // todo Подумать когда подписать а когда отписать

  get username() {
    return this.loginFormGroup.controls['username'];
  }

  get password() {
    return this.loginFormGroup.controls['password'];
  }
}
