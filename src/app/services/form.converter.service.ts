import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AuthRequest} from "../utility/AuthRequest";
import {AuthStatus} from "../auth/AuthStatus";
import {HitRequest} from "../utility/HitRequest";
import {HitServeStatus} from "../utility/HitServeStatus";

@Injectable({
  providedIn: 'root'
})
export class FormConverterService {

  convertAuthToRequest(authFormGroup: FormGroup, type: AuthStatus): AuthRequest {
    return {
      typeOfAuth: type,
      username: authFormGroup.value.username,
      password: authFormGroup.value.password
    };
  };

  convertHitToRequest(hitFormGroup: FormGroup | null, typeOfService: HitServeStatus): HitRequest {
    return {
      typeOfService: typeOfService,
      xValue: (hitFormGroup as FormGroup).value.xValue,
      yValue: (hitFormGroup as FormGroup).value.yValue,
      rValue: (hitFormGroup as FormGroup).value.rValue
    };
  };

  // convertHitServiceToRequest(typeOfService: HitServeStatus): HitRequest {
  //   return {
  //     typeOfService: typeOfService,
  //     xValue: null,
  //     yVa
  //   }
  // }
}
