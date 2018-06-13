import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";
import {User} from "../models/User";

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [PostService]
  })

export class NewpostComponent implements OnInit {
  submitted = false;

  currentUser: User;

  constructor(public fb: FormBuilder,
              private postService: PostService,
              private registerService: RegisterService,
              private router: Router) {
  }

  public newPost = this.fb.group({
    title: ['', Validators.required],
    smiley: ['', Validators.required],
    date: ['', Validators.required],
    entry: ['', Validators.required]
  });

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // convenience getter for easy access to form fields
  get f() { return this.newPost.controls; }

  public saveNewPost(event) {
    const title = this.f['title'].value;
    const smiley = this.f['smiley'].value;
    const date = this.f['date'].value;
    const entry = this.f['entry'].value;
    const user_id = this.currentUser.id;

    this.submitted = true;
    // stop here if form is invalid
    if (this.newPost.invalid) {
      return;
    }

    this.postService.saveNewPost(new Post(0, title, smiley, date, entry, user_id)).subscribe(() => this.router.navigate(['/home']));
  }
}
