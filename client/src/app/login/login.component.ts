import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {User} from "../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RegisterService]
})
export class LoginComponent implements OnInit {

  users: User[];

  constructor(public fb: FormBuilder, private registerService: RegisterService) {
    this.registerService.eventCallback$.subscribe(data => {
      console.log('eventCallBack login');
      this.callbackFunction();
    });
  }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    console.log('ngOnInit before getAllUsers');
    this.registerService.getAllUsers();
    console.log('ngOnInit after getAllUsers');
    console.log(this.users)

    this.logout();
  }

  login() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.registerService.authenticate(username, password);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  callbackFunction() {
    this.users = this.registerService.users;
  }
}
