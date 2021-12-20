import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../CustomValidators";
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-auth-form-register',
  templateUrl: './auth-form-register.component.html',
  styleUrls: ['./auth-form-register.component.scss']
})
export class AuthFormRegisterComponent {


  loginFormGroup = this.fb.group({
    username: [null, Validators.compose([
      // 1. Username field is Required
      Validators.required,

      // 2. check length of username
      Validators.minLength(3),
      Validators.maxLength(30),

      // 3. check whether the entered username has a special character
      Validators.pattern('^[a-zA-Z-0123456789]*$'),
    ])],
    password: [null, Validators.compose([
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
    ])],
    confirmPassword: [null, Validators.compose([Validators.required])]
  }, {
    validator: CustomValidators.passwordMatchValidator
  })

  get username() {
    return this.loginFormGroup.controls['username'];
  }

  get password() {
    return this.loginFormGroup.controls['password'];
  }

  get confirmPassword() {
    return this.loginFormGroup.controls['confirmPassword'];
  }

  constructor(private fb: FormBuilder) {
  }

}
