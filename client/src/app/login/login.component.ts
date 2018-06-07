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
  // TODO: if login is valid, redirect to HomeComponent

  users: User[];

  constructor(public fb: FormBuilder, private registerService: RegisterService) {
    console.log('Login constructor');
    this.registerService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.registerService.getAllUsers();
    console.log(this.users)
  }

  public login() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.registerService.authenticate(username, password);

  }

  callbackFunction() {
    this.users = this.registerService.users;
    console.log('DOE HET in Login!!!! ' + this.users);
  }
}
