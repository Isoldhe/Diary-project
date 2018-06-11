import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {Router} from "@angular/router";

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [PostService]
  })

export class NewpostComponent implements OnInit {
  user: string;

  constructor(public fb: FormBuilder,
              private postService: PostService,
              private router: Router) { }

  public newPost = this.fb.group({
    title: ['', Validators.required],
    smiley: ['', Validators.required],
    date: ['', Validators.required],
    entry: ['', Validators.required]
  });

  ngOnInit() {
    this.user = localStorage.getItem('currentUser');
    console.log('the user in NewpostComponent = ' + this.user);
    console.log(this.user[0]);
  }

  public saveNewPost(event) {

    const title = this.newPost.controls['title'].value;
    const smiley = this.newPost.controls['smiley'].value;
    const date = this.newPost.controls['date'].value;
    const entry = this.newPost.controls['entry'].value;

    this.postService.saveNewPost(new Post(0, title, smiley, date, entry)).subscribe();

    // Adding routerlink here, because it doesn't work in html
    this.router.navigate(['/home']);
  }

}
