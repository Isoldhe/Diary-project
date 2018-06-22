import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private eventCallback = new Subject<Post[]>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  posts: Post[];

  firstPost = false;  // true if post is newest (index 0 in allPosts)
  lastPost = false;  // true if post is oldest (last index in allPosts)

  constructor(private http: HttpClient) {
  }

  getAllPosts() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const user_id = currentUser.id;

    this.findAll(user_id).subscribe(
      posts => {
        this.posts = posts;
        this.eventCallback.next(this.posts);
      },
      err => {
        console.log(err);
      }
    );
  }

  getPost(id: number): Observable<Post>  {
    return this.http.get<Post>('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  findAll(id: number): Observable<Post[]>  {
    return this.http.get<Post[]>('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  findById(id: number): Observable<Post>  {
    return this.http.get<Post>('http://localhost:8080/postdetail/' + id).pipe(
      catchError(this.errorHandler));
  }

  saveNewPost(post: Post) {
    console.log('saved post = ' + post);
    return this.http.post('http://localhost:8080/post/', post).pipe(
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

