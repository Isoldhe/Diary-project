import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  deletePost: boolean;
}

@Component({
  selector: 'app-delete-post-dialog',
  templateUrl: './delete-post-dialog.component.html',
  styleUrls: ['./delete-post-dialog.component.css']
})
export class DeletePostDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.data.deletePost = false;
    this.dialogRef.close(this.data.deletePost);
  }

  onYesClick() {
    this.data.deletePost = true;
    this.dialogRef.close(this.data.deletePost);
  }

}
