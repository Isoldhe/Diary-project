import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmail } from '../validators/ValidateEmail';
import { ValidateUsername } from '../validators/ValidateUsername';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder,
              private registerService: RegisterService,
              private sharedService: SharedService,
              private router: Router) { }
              
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], ValidateEmail.createValidator(this.registerService) ],
      username: ['', [Validators.required], ValidateUsername.createValidator(this.registerService) ],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
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

    // Subscribe with navigate at the end prevents async data load in login component after registration
    this.registerService.saveUser(new User(0, firstName, lastName, email, username, password)).subscribe(() => {
      this.sharedService.setFirstLogin(true);
      this.router.navigate(['/login']);
    });
  }
}
