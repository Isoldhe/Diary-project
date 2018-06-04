import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {RegisterService} from '../services/register.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(public fb: FormBuilder, private registerService: RegisterService) { }

  public registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  public register() {
    const firstName = this.registerForm.controls['firstName'].value;
    const lastName = this.registerForm.controls['lastName'].value;
    const email = this.registerForm.controls['email'].value;
    const username = this.registerForm.controls['username'].value;
    const password = this.registerForm.controls['password'].value;

    this.registerService.saveUser(new User(0, firstName, lastName, email, username, password)).subscribe();

  }
}
