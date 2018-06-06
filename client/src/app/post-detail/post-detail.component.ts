import {Component, Input, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PostService} from "../services/post.service";
import {Post} from "../models/Post";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;

  posts: Post[];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private location: Location) { }

  ngOnInit() {
    this.getPost();
  // FIXME: getPost returns as undefined
    console.log('getPost = ' + this.getPost());
  }


  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id = ' + id)
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
    console.log(this.post);
  }

}
