import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {RegisterService} from '../services/register.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  submitted = false;

  constructor(public fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router) { }

  public registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public register() {
    const firstName = this.f['firstName'].value;
    const lastName = this.f['lastName'].value;
    const email = this.f['email'].value;
    const username = this.f['username'].value;
    const password = this.f['password'].value;

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.registerService.saveUser(new User(0, firstName, lastName, email, username, password)).subscribe();

    // Adding routerlink here, because it doesn't work in html
    this.router.navigate(['/login']);
  }
}
