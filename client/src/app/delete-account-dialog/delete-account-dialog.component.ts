import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  deleteAccount: boolean;
}

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.data.deleteAccount = false;
    this.dialogRef.close(this.data.deleteAccount);
  }

  onYesClick() {
    this.data.deleteAccount = true;
    this.dialogRef.close(this.data.deleteAccount);
  }

}
