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
  // This field is for testing. Remove if it works:
  submitted = '';
  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';

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
    // After testing: put const in front of each var here, then remove instance fields
    this.firstName = this.registerForm.controls['firstName'].value;
    this.lastName = this.registerForm.controls['lastName'].value;
    this.email = this.registerForm.controls['email'].value;
    this.username = this.registerForm.controls['username'].value;
    this.password = this.registerForm.controls['password'].value;

    this.submitted = 'Form is submitted';

    // this.registerService.saveUser(new User(0, firstName, lastName, email, username, password)).subscribe(
    //   // TODO: Change this to...
    //   // () => this.todoList.getAllTodos()
    // );

  }
}
