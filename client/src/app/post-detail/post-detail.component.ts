import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {User} from '../models/User';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  currentUser: User;

  allPosts: Post[];

  firstPost = false;  // true if post is newest (index 0 in allPosts)
  lastPost = false;  // true if post is oldest (last index in allPosts)

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    // Don't remove:
    this.postService.getAllPosts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  callbackFunction() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.findById(id).subscribe(post => {this.post = post;
                                                            const currentPostIndex = this.allPosts.findIndex(
                                                              currentPost => currentPost.id === this.post.id);
                                                            if (currentPostIndex === 0) {
                                                              this.firstPost = true;
                                                              console.log("firstPost is true");
                                                            }
                                                            console.log("this.post title = " + this.post.title); });

    this.allPosts = this.postService.posts;
    console.log("allPosts in PostDetail = " + this.allPosts); // works

    // TODO: navigate by index in allPosts
    const post0 = this.allPosts[0];
    const post1 = this.allPosts[1];
    const post2 = this.allPosts[2];
    const post3 = this.allPosts[3];
    console.log("Post at 0 = " + post0.title);
    console.log("Post at 1 = " + post1.title);
    console.log("Post at 2 = " + post2.title);
    console.log("Post at 3 = " + post3.title);

    // next/ older post = index - 1 (going to older posts)
    // previous/ newer post = index + 1 (going to newer posts)
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => { this.postService.getAllPosts();
                                                        this.router.navigate(['/home']); });
  }

  olderPost() {
    // Finding index of this post
    const currentPostIndex = this.allPosts.findIndex(
      currentPost => currentPost.id === this.post.id);

    // if (currentPostIndex -1 == 0) {
    //   console.log("Setting firstPost to true");
    //   this.firstPost = true;
    // }

    // Getting index of next post
    const nextPost = this.allPosts[currentPostIndex - 1];
    const nextId = nextPost.id;

    // Putting router.navigate in a subscribe(), because it doesn't work properly as standalone function
    // So this findById() function is not really necessary, but it takes the user to the next page
    this.postService.findById(nextId).subscribe(post => { this.post = post;
                                                                this.router.navigate(['/postdetail/', nextId]) });
  }

  newerPost() {
    const currentPostIndex = this.allPosts.findIndex(
      currentPost => currentPost.id === this.post.id);

    const nextPost = this.allPosts[currentPostIndex + 1];
    const nextId = nextPost.id;

    this.postService.findById(nextId).subscribe(post => { this.post = post;
      this.router.navigate(['/postdetail/', nextId]) });
  }

  // TODO: Decide if a post is the first or last in the array. If so, hide the navigation buttons accordingly

}
