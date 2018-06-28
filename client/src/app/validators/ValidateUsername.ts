import { AbstractControl } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { map } from "rxjs/operators";

export class ValidateUsername {
  static createValidator(registerService: RegisterService) {
    return (control: AbstractControl) => {
      return registerService.findByUsername(control.value).pipe(map(res => {

        if(res.length !== 0){
          return ({usernameTaken: true});
        } else {
          return (null);
        }

      }));
    }
  }
}