import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {User} from "../models/User";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
})
export class PostListComponent implements OnInit {

  // All posts in DB
  allPosts: Post[];

  // filtered posts on user_id
  currentUserPosts: Post[];

  currentUser: User;

  constructor(private postService: PostService) {
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    this.postService.getAllPosts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  callbackFunction() {
    this.allPosts = this.postService.posts;
    this.currentUserPosts = this.allPosts.filter(
      post => post.user_id === this.currentUser.id);
  }

  delete(id) {
    this.postService.delete(id).subscribe();
  }
}
