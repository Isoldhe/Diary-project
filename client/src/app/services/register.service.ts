import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private eventCallback = new Subject<User[]>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  users: User[];

  user: User;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    this.findAll().subscribe(
      users => {
        this.users = users;
        console.log(this.users);
        this.eventCallback.next(this.users);
      },
      err => {
        console.log(err);
      }
    );
  }

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
    this.user = this.users.find(u => u.username == username);
    console.log('found user = ' + this.user.username + ' with password = ' + this.user.password);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
