import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class IssService {
  public token: string;
  private apiBaseUrl = `${environment.apiBaseUrl}/iss`;

  
  

  constructor(
    protected http: Http,
  ) {

  }

  /**
   * Creates a new user.
   *
   * @param {object} - userData
   *
   * @return {Observable} user
   */
  getIssPassLocation(payload) {
    return this.http.post(`${this.apiBaseUrl}/pass-location`, payload).pipe(
        map((issLoc) => {
          return issLoc.json().data;
        })
    )
  }

  getPeopleInSpace() {
    return this.http.get(`${this.apiBaseUrl}/people`).pipe(
      map((data) => {
        const people = data.json().data;
        return people;
      })
    )
  }

}