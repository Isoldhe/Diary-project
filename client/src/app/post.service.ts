import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './Post';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  saveNewPost(post: Post) {
    return this.http.post('http://localhost:8080/post', post).pipe(
      catchError(this.errorHandler));

  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }

}

