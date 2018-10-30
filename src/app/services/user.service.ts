import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UserService {
  public token: string;
  private isLoggedin: boolean;
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    protected http: Http,
  ) {
    this.isLoggedin = false;
  }

  getToken() {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token
    return this.token;
 }

 createAuthorizationHeader(headers: Headers, token: string) {
   headers.append('Authorization', token)
 }

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
              this.isLoggedin = true;
              localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
              return msg
          }
      })
    )
  }

  saveIssHistory(data: object) {
    let headers = new Headers();
    const token = this.getToken();
    this.createAuthorizationHeader(headers, token);
    return this.http.post(`${this.apiBaseUrl}/iss/location`, data,
    { 
      headers: headers
    }
    ).pipe(
      map(data => {
        return data.json();
      })
    )
  }

  viewIssHistory() {
    let headers = new Headers();
    const token = this.getToken();
    this.createAuthorizationHeader(headers, token);
    return this.http.get(`${this.apiBaseUrl}/iss/location`,
    { 
      headers: headers
    }
    ).pipe(
      map(data => {
        return data.json();
      })
    )
  }

  isLoggedIn() {
    return this.isLoggedin;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}


/** 
 * 
 * 
 * 
  
      
*/