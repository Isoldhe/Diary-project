import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {User} from "../models/User";
import {Router} from "@angular/router";

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

  smileyVeryHappy: any = '😄';
  smileySlightlyHappy: any = '🙂';
  smileyNeutral: any = '😐';
  smileyAngry: any = '😡';
  smileySad: any = '😢';

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

    // Sort post order based on date
    this.allPosts = this.allPosts.sort((a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => this.postService.getAllPosts());
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


}
