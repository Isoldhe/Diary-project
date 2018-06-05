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

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.findAll().subscribe(
      posts => {
        this.posts = posts;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id) {
    this.postService.delete(id).subscribe(
      () => this.getAllPosts()
    );
  }
}
