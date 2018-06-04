import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public saveUser(user: User) {
    return this.http.post('http://localhost:8080/user', user)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
