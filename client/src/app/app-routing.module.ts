import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {NewpostComponent} from "./newpost/newpost.component";

// We still need to add more routes and edit the components, so they refer to the correct paths
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newpost', component:  NewpostComponent},
  // { path: 'post/:id', component:  PostDetailComponent},  // TODO: generate this component, shows one post after clicking it on homepage
  { path: 'home', component: AppComponent }
];

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
