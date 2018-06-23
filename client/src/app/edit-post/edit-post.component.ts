import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [PostService]
})
export class EditPostComponent implements OnInit, OnChanges {
  submitted = false;
  editPost: FormGroup;
  currentUser: User;

  @Input() post: Post;

  smileyVeryHappy: any = '😄';
  smileySlightlyHappy: any = '🙂';
  smileyNeutral: any = '😐';
  smileyAngry: any = '😡';
  smileySad: any = '😢';

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

  createForm() {
    this.editPost = this.fb.group({
        title: ['', Validators.required],
        smiley: ['', Validators.required],
        date: ['', Validators.required],
        entry: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postService.getAllPosts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // Tracks changes in the form
  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.editPost.reset({
      smiley: this.post.smiley,
      title: this.post.title,
      date: this.post.date,
      entry: this.post.entry
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editPost.controls; }

  save() {
    this.post.title = this.f['title'].value;
    this.post.smiley = this.f['smiley'].value;
    this.post.date = this.f['date'].value;
    this.post.entry = this.f['entry'].value;

    this.submitted = true;
    // stop here if form is invalid
    if (this.editPost.invalid) {
      return;
    }

    this.postService.updatePost(this.post.id, this.post).subscribe(() => this.router.navigate(['/home']));
  }

  callbackFunction() {
    const id = +this.route.snapshot.paramMap.get('id');
    // When the post is found (findById), load it in the view with createForm() and rebuildForm()
    this.postService.findById(id).subscribe(post => {this.post = post;
                                                          this.createForm();
                                                          this.rebuildForm();
                                                          });
  }

}
