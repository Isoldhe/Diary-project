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

  constructor(public fb: FormBuilder, private registerService: RegisterService) { }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllUsers();
    console.log(this.users)
  }

  getAllUsers() {
    this.registerService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  public login() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.registerService.authenticate(username, password).subscribe();

  }
}
