import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AuthRequest} from "../interfaces/AuthRequest";
import {AuthStatus} from "../auth/AuthStatus";

@Injectable({
  providedIn: 'root'
})
export class FormConverterService {

  convertToRequest(formGroup: FormGroup, type: AuthStatus):AuthRequest {
    return  {
      typeOfAuth: type,
      username: formGroup.controls['username'].value,
      password: formGroup.controls['password'].value
    };
  }
}
