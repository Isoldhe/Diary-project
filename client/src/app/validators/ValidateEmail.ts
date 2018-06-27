import { AbstractControl } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { map } from "rxjs/operators";
import { User } from '../models/User';

export class ValidateEmail {
  static createValidator(registerService: RegisterService) {
    return (control: AbstractControl) => {
      return registerService.findByEmail(control.value).pipe(map(res => {
        // return res ? { emailTaken: true } : null;

        // I also tried the below if/else statement, but it changes nothing
        if(res.length !== 0){
          return ({emailTaken: true});
        } else {
          return (null);
        }

      }));
    }
  }
}