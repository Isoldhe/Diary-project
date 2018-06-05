import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public saveUser(user: User) {
    console.log(user);
    return this.http.post('http://localhost:8080/user', user)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findAll(): Observable<User[]>  {
    return this.http.get<User[]>('http://localhost:8080/user')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public authenticate(username: string, password: string) {
    return this.http.post('http://localhost:8080/user', {username, password} )
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
