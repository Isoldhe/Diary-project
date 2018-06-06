import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPost(id: number): Observable<Post>  {
    return this.http.get<Post>('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));
  }

  findAll(): Observable<Post[]>  {
    return this.http.get<Post[]>('http://localhost:8080/post').pipe(
      catchError(this.errorHandler));
  }

  saveNewPost(post: Post) {
    console.log(post);
    return this.http.post('http://localhost:8080/post/', post).pipe(
      catchError(this.errorHandler));

  }

  delete(id) {
    return this.http.delete('http://localhost:8080/post/' + id).pipe(
      catchError(this.errorHandler));

  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }
}

