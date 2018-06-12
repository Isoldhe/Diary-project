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

  public saveNewPost(event) {
    const title = this.newPost.controls['title'].value;
    const smiley = this.newPost.controls['smiley'].value;
    const date = this.newPost.controls['date'].value;
    const entry = this.newPost.controls['entry'].value;
    const user_id = this.currentUser.id;

    this.postService.saveNewPost(new Post(0, title, smiley, date, entry, user_id)).subscribe();

    // Adding routerlink here, because it doesn't work in html
    this.router.navigate(['/home']);
  }
}
