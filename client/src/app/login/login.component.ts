import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {User} from "../models/User";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RegisterService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  private subscription: Subscription;
  message: any;

  users: User[];

  constructor(public fb: FormBuilder, private registerService: RegisterService) {
    this.registerService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    this.registerService.getAllUsers();
    console.log(this.users);
    this.logout();

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Subscription to error message for when username/password is incorrect
    this.subscription = this.registerService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    const username = this.f['username'].value;
    const password = this.f['password'].value;

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

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
