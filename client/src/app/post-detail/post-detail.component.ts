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

  smileyVeryHappy: any = '😄';
  smileySlightlyHappy: any = '🙂';
  smileyNeutral: any = '😐';
  smileyAngry: any = '😡';
  smileySad: any = '😢';

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

    this.postService.findById(id).subscribe(post => {
      this.post = post;

      const currentPostIndex = this.allPosts.findIndex(
        currentPost => currentPost.id === this.post.id);

      if (currentPostIndex === 0) {
        this.postService.firstPost = true;
      }
      if (currentPostIndex === this.allPosts.length - 1) {
        this.postService.lastPost = true;
      }
    });

    this.allPosts = this.postService.posts;
  }

  getSmiley(storedSmiley) {
    let smiley: any = '';
    if (storedSmiley == "very happy") {
      smiley = this.smileyVeryHappy;
    }
    else if (storedSmiley == "slightly happy") {
      smiley = this.smileySlightlyHappy;
    }
    else if (storedSmiley == "neutral") {
      smiley = this.smileyNeutral;
    }
    else if (storedSmiley == "angry") {
      smiley = this.smileyAngry;
    }
    else if (storedSmiley == "sad") {
      smiley = this.smileySad;
    }
    return smiley;
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => { 
      this.postService.getAllPosts();
      this.router.navigate(['/home']); });
  }

  olderPost() {
    // Finding index of this post
    const currentPostIndex = this.allPosts.findIndex(
      currentPost => currentPost.id === this.post.id);

    // If last post was the most recent post, this sets lastPost to false, so nav arrow to newer posts appears again
    this.postService.lastPost = false;

    // If it's the most recent post in the array, set firstPost to true, so nav arrow gets hidden
    if (currentPostIndex - 1 == 0) {
      this.postService.firstPost = true;
    }

    // Getting index of next post
    const nextPost = this.allPosts[currentPostIndex - 1];
    const nextId = nextPost.id;

    // Putting router.navigate in a subscribe(), because it doesn't work properly as standalone function
    // So this findById() function is not really necessary, but it takes the user to the next page
    this.postService.findById(nextId).subscribe(post => { 
      this.post = post;
      this.router.navigate(['/postdetail/', nextId]) });
  }

  newerPost() {
    const currentPostIndex = this.allPosts.findIndex(
      currentPost => currentPost.id === this.post.id);

    // If last post was of index 0, this sets firstPost to false, so nav arrow to older posts appears again
    this.postService.firstPost = false;
    
    // If it's the last post in the array, set lastPost to true, so nav arrow gets hidden
    if (currentPostIndex + 1 == this.allPosts.length - 1) {
      this.postService.lastPost = true;
    }

    const nextPost = this.allPosts[currentPostIndex + 1];
    const nextId = nextPost.id;

    this.postService.findById(nextId).subscribe(post => { 
      this.post = post;
      this.router.navigate(['/postdetail/', nextId]) });
  }

  // TODO: Decide if a post is the first or last in the array. If so, hide the navigation buttons accordingly

}
