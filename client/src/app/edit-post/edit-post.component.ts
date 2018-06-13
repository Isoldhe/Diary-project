import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../models/User";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [PostService]
})
export class EditPostComponent implements OnInit {
  submitted = false;

  @Input() post: Post;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
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
    console.log('getAllPost uit Edit Post = ' + this.postService.posts);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editPost.controls; }

  save() {
    console.log('in save');
    console.log('Title vanuit editPost form-control = ' + this.f['title'].value);
    this.post.title = this.f['title'].value;
    this.post.smiley = this.f['smiley'].value;
    this.post.date = this.f['date'].value;
    this.post.entry = this.f['entry'].value;

    this.submitted = true;
    // stop here if form is invalid
    if (this.editPost.invalid) {
      console.log('Form is not valid');
      return;
    }

    this.postService.updatePost(this.post.id, this.post).subscribe(() => this.router.navigate(['/home']));
  }

  callbackFunction() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.findById(id).subscribe(post => this.post = post);  }

}
