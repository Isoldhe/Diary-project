import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private loginStatus = new BehaviorSubject(false);
  firstLogin = this.loginStatus.asObservable();

  constructor() { }

  setFirstLogin(val: boolean){
    this.loginStatus.next(val)
  }

  getFirstLogin(){
    return this.firstLogin;
  }
}
