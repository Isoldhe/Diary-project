import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {NewpostComponent} from "./newpost/newpost.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {EditPostComponent} from "./edit-post/edit-post.component";

// TODO: We still need to add more routes and edit the components, so they refer to the correct paths
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newpost', component:  NewpostComponent},
  { path: 'postdetail/:id', component:  PostDetailComponent},
  { path: 'editpost/:id', component:  EditPostComponent},
  { path: 'home', component: PostListComponent },
  { path: '', component: LoginComponent},

  // otherwise redirect to home (PostListComponent)
  { path: '**', redirectTo: 'home' }

// TODO: If components have links to other components, ensure that there are links to them in html <a> tag: routerLink="/login"
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
