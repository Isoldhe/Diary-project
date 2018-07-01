import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { User } from "../models/User";
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { DeletePostDialogComponent } from '../delete-post-dialog/delete-post-dialog.component';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

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

  // Boolean for DeleteAccountDialog
  deleteAccount: boolean = false;
  // Boolean for DeletePostDialog
  deletePost: boolean = false;

  constructor(private postService: PostService,
              private registerService: RegisterService,
              private router: Router,
              public dialog: MatDialog) {
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

  // Open DeleteAccountDialog
  openDeleteAccountDialog(): void {
    console.log("this.deleteAccount on open dialog = " + this.deleteAccount);

    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      disableClose: false,
      autoFocus: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '600px',
      height: '',
      position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
      },
      data: {deleteAccount: this.deleteAccount}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteAccount = result;

      // If user clicks "yes, delete account", first deletes all his posts, then deletes user and navigates back to login page
      if (this.deleteAccount) {
        const userId = this.currentUser.id;
        this.postService.deleteAllPosts(userId).subscribe(() => { 
          this.postService.getAllPosts();
          this.registerService.delete(userId).subscribe(() => this.router.navigate(['/login']));
        });
      }
    });
  }

    // Open DeletePostDialog
    openDeletePostDialog(postId): void {
      console.log("this.deletePost on open dialog = " + this.deletePost);
  
      const dialogRef = this.dialog.open(DeletePostDialogComponent, {
        disableClose: false,
        autoFocus: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '600px',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {deletePost: this.deletePost}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.deletePost = result;
  
        // If user clicks "yes", deletes the post
        if (this.deletePost) {
          this.delete(postId);
        }
      });
    }


}
