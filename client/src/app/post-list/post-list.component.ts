import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {User} from "../models/User";
import {Router} from "@angular/router";
import { ReversePipe } from '../helpers/reversePipe';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
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

    this.allPosts = this.allPosts.sort((a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => this.postService.getAllPosts());
  }


}
