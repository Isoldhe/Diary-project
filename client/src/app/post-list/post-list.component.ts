import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
})
export class PostListComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) {
    console.log('postList constructor');
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    console.log('PostListComponent ngOnInit, posts = ' + this.posts);
    this.postService.getAllPosts();
  }

  callbackFunction() {
    this.posts = this.postService.posts;
    console.log('DOE HET in PostList!!!! ' + this.posts);
  }

  delete(id) {
    this.postService.delete(id).subscribe();
  }
}
