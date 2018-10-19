import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UserService {
  public token: string;
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    protected http: Http,
  ) {}

  /**
   * Creates a new user.
   *
   * @param {object} - userData
   *
   * @return {Observable} user
   */
  createUser(userData: Object) {
    return this.http.post(`${this.apiBaseUrl}/auth/signup`, userData).pipe(
        map((user) => {
          this.token = user.json().token;
          const msg = user.json().message;
            if (this.token) {
                localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
                return msg
            }
        })
    )
  }

  login(userData: Object) {
    return this.http.post(`${this.apiBaseUrl}/auth/login`, userData).pipe(
      map((user) => {
        this.token = user.json().token;
        const msg = user.json().message;
          if (this.token) {
              localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
              return msg
          }
      })
    )
  }

}