import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Subject} from 'rxjs/internal/Subject';
import {User} from "../models/User";
import {RegisterService} from "./register.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private eventCallback = new Subject<Post[]>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  posts: Post[];

  user: User;

  constructor(private http: HttpClient) {
  }

  getAllPosts() {
    this.findAll().subscribe(
      posts => {
        this.posts = posts;
        console.log('this.posts van PostService = ', this.posts);
        this.eventCallback.next(this.posts);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // this.user = localStorage.getItem('currentUser');
    console.log('the user in NewpostComponent = ' + this.user);
    console.log(this.user.id);
  }

  getPost(id: number): Observable<Post>  {
    return this.http.get<Post>('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  findAll(): Observable<Post[]>  {
    this.getCurrentUser();
    return this.http.get<Post[]>('http://localhost:8080/postByUserId/' + this.user.id).pipe(
      catchError(this.errorHandler));
  }

  findById(id: number): Observable<Post>  {
    return this.http.get<Post>('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  saveNewPost(post: Post) {
    this.getCurrentUser();
    console.log(post);
    return this.http.post('http://localhost:8080/post/' + this.user.id, post).pipe(
      catchError(this.errorHandler));
  }

  delete(id) {
    return this.http.delete('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  updatePost(id: number, post: Post) {
    console.log('in updatepost' + id + post);
    return this.http.put('http://localhost:8080/post/' + id, post).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }
}

