import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RegisterService} from "../services/register.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private registerService: RegisterService,
              private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
