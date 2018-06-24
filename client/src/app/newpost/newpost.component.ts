import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  newPost: FormGroup;
  submitted = false;

  currentUser: User;

  // FIXME: in Chrome, after page refresh in this component, all unicode 6.0 smileys disappear from the dropdown menu
  // All smileys are present however when you load NewPost from Home component by clicking 'add new post' button
  // It seems to be a Chrome issue, because FireFox has no issues with emoji

  smileyVeryHappy: any = '😄';
  smileySlightlyHappy: any = '🙂';  // this is the only smiley that stays after page refresh in Chrome
  smileyNeutral: any = '😐';
  smileyAngry: any = '😡';
  smileySad: any = '😢';

  key: any;

  constructor(public fb: FormBuilder,
              private postService: PostService,
              private registerService: RegisterService,
              private router: Router) {
                console.log("Smileys from constructor: " + this.smileyVeryHappy, this.smileySlightlyHappy, this.smileyNeutral, this.smileyAngry, this.smileySad);
                console.log("Constructor done");
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.newPost = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      smiley: ['', Validators.required],
      date: ['', Validators.required],
      entry: ['', Validators.required]
    });
    console.log("Smileys from ngOnInit: " + this.smileyVeryHappy, this.smileySlightlyHappy, this.smileyNeutral, this.smileyAngry, this.smileySad);
    console.log("ngOnInit done");
  }

  // convenience getter for easy access to form fields
  get f() { return this.newPost.controls; }

  public saveNewPost() {
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
