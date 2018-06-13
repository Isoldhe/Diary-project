import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {User} from "../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService],
  // encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit {

  // All posts for currentUser
  allPosts: Post[];

  currentUser: User;

  constructor(private postService: PostService,
              private router: Router) {
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
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => this.postService.getAllPosts());
  }


}
