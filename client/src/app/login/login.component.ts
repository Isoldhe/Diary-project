import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {User} from "../models/User";
import {Subscription} from "rxjs/Subscription";
import { SharedService } from '../services/shared.service';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';

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

  firstLogin;

  constructor(public fb: FormBuilder, 
              private registerService: RegisterService,
              private postService: PostService,
              private sharedService: SharedService) {
    this.registerService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    this.registerService.getAllUsers();

    // logout currentuser if he's still logged in from previous browser session
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

    // If it's the first time user logs in, this creates a welcome post
    if (this.firstLogin) {
      const user = this.users.find(u => u.username == username);
      const userId = user.id;

      // Welcome post contents
      const title = 'Welcome to Quacker';
      const smiley = 'very happy';
      const date = '2018-01-01';
      const entry = 
`Hello there! Click the title of this post to find out everything about Quacker!
      
Ah! You clicked the title. Read on to see what you can do at Quacker.

The homepage you came from is where you will see all your posts listed under each other, with your most recent posts at the top. Clicking the title will take you to this page where you can read the full contents of your post.
      
You can add a new post by clicking the Add New Post button in the top left. Enter a smiley, title, date and post content and click the Quack button. You will be returned to the home page where your new post will be visible at the top.
You can delete and edit posts from the home page.

You will be logged out automatically whenever you leave Quacker, so no one can enter your diary when they go to Quacker on your device.

If you ever decide you want to part with us, you can delete your account at the top right, next to the logout button. Do note that if you decide to do so, all your posts will be deleted and won't be retrievable afterwards.

We hope you have a good time at Quacker.
Now go Quack something!`;
      const user_id = userId;

      this.postService.saveNewPost(new Post(0, title, smiley, date, entry, user_id)).subscribe(() => this.registerService.authenticate(username, password));

      // Setting firstLogin boolean to false again
      this.sharedService.setFirstLogin(false);
    }
    else {
      this.registerService.authenticate(username, password);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  callbackFunction() {
    this.users = this.registerService.users;

    // Getting firstLogin boolean
    this.sharedService.getFirstLogin().subscribe(firstLogin => this.firstLogin = firstLogin)

    console.log("callback in login: ");
    console.log(this.users);
    console.log('From Login => firstLogin = ' + this.firstLogin);
    console.log("-------------------------------");
  }
}
