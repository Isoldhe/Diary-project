import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { NewpostComponent } from './newpost/newpost.component';
import {HttpClientModule} from '@angular/common/http';

import { RegisterComponent } from './register/register.component';

import { PostListComponent } from './post-list/post-list.component';

import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NewpostComponent,
    PostListComponent,
    LoginComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
