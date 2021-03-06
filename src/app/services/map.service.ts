import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class MapService {
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
  ISSCurrentLocatoin() {
    return this.http.get(`${this.apiBaseUrl}/current-location`).pipe(
        map((issLoc) => {
          const lnglat = issLoc.json();
          return lnglat;
        })
    )
  }

}