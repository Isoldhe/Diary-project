import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NewpostComponent } from './newpost/newpost.component';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';

import { PostListComponent } from './post-list/post-list.component';

import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReversePipe } from './helpers/reversePipe';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NewpostComponent,
    EditPostComponent,
    PostListComponent,
    LoginComponent,
    PostDetailComponent,
    ReversePipe,
    DeleteAccountDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DeleteAccountDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
