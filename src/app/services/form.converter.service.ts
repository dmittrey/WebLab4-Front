import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AuthRequest} from "../utility/AuthRequest";
import {HitRequest} from "../utility/HitRequest";

@Injectable({
  providedIn: 'root'
})
export class FormConverterService {

  convertAuthToRequest(authFormGroup: FormGroup): AuthRequest {
    return {
      username: authFormGroup.value.username,
      password: authFormGroup.value.password
    };
  };

  convertHitToRequest(hitFormGroup: FormGroup): HitRequest {
    return {
      xValue: hitFormGroup.value.xSelect,
      yValue: hitFormGroup.value.yText,
      rValue: hitFormGroup.value.rSelect
    };
  };
}
