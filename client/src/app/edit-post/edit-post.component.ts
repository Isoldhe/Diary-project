import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [PostService]
})
export class EditPostComponent implements OnInit {

  @Input() post: Post;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  public editPost = this.fb.group({
    title: ['', Validators.required],
    smiley: ['', Validators.required],
    date: ['', Validators.required],
    entry: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getPost();
  }

  save(): void {
    this.postService.updatePost(this.post)
      .subscribe();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

}
