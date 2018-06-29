import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';

import {catchError, filter, map } from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // Subject for alert message LoginComponent
  private subject = new Subject<any>();

  private eventCallback = new Subject<User[]>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  users: User[];

  user: User;

  constructor(private http: HttpClient,
              private router: Router) { }

  getAllUsers() {
    this.findAll().subscribe(
      users => {
        this.users = users;
        console.log("users from register service = ");
        console.log(this.users);
        this.eventCallback.next(this.users);
      },
      err => {
        console.log(err);
      }
    );
  }

  public saveUser(user: User) {
    console.log("Saved user:");
    console.log(user);
    return this.http.post('http://localhost:8080/user', user)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findAll(): Observable<User[]>  {
    console.log("findAll() in register service");
    return this.http.get<User[]>('http://localhost:8080/user')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/user').pipe(
      map(users => users.filter(user => user.email === email)),
      catchError(this.errorHandler));
  }

  findByUsername(username: string): Observable<User[]>  {
    return this.http.get<User[]>('http://localhost:8080/user/').pipe(
      map(users => users.filter(user => user.username === username)),
      catchError(this.errorHandler));
  }

  delete(id) {
    return this.http.delete('http://localhost:8080/user/' + id).pipe(
      catchError(this.errorHandler));
  }


  // Login functions
  authenticate(username: string, password: string) {
    try {
      // If this.user is empty, because it couldn't find a user with this username, it throws an error which will be caught
      this.user = this.users.find(u => u.username == username);

      if(this.user.username == username) {
          if(this.user.password == password) {
            localStorage.setItem('currentUser', JSON.stringify(this.user));

            // Login successful and AuthGuard's canActivate() returns true, so redirect to /home
            this.router.navigate(['/home']);
          } else {
            // Login was not successful
            this.error('Username or password is incorrect');
          }
      }

    } catch(error) {
      this.error('Username or password is incorrect');
      this.errorHandler(error);
    }
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
  }

  // Returning message as subject when authentication is invalid
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
