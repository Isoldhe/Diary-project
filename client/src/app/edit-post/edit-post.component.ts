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
  ) {
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  public editPost = this.fb.group({
    title: ['', Validators.required],
    smiley: ['', Validators.required],
    date: ['', Validators.required],
    entry: ['', Validators.required]
  });

  ngOnInit(): void {
    this.postService.getAllPosts();
  }

  save(event) {

    this.post.title = this.editPost.controls['title'].value;
    this.post.smiley = this.editPost.controls['smiley'].value;
    this.post.date = this.editPost.controls['date'].value;
    this.post.entry = this.editPost.controls['entry'].value;
    console.log(this.post.entry)
    this.postService.updatePost(this.post.id, this.post);
  }

  callbackFunction() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.postService.findById(id).subscribe(post => this.post = post);
    // getPostByFind(id) does not exist, so I replaced it with the above findById(id)
    // this.post = this.postService.getPostByFind(id);
  }
}
