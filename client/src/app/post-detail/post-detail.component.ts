import {Component, Input, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PostService} from "../services/post.service";
import {Post} from "../models/Post";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    // Don't remove:
    console.log('ngOnInit of PostDetail');
    this.postService.getAllPosts();
  }

  callbackFunction() {
    console.log('in callback of postdetail');
    const id = +this.route.snapshot.paramMap.get('id');

    this.postService.findById(id).subscribe(post => this.post = post);
    console.log('this.post after callling findById = ' + this.post);
  }

//  TODO: methods nextPost() and previousPost() for navigating through post views
//  Edit routlink in html for this

}
