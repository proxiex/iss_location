import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from './services/user.service'
import { IssService } from './services/iss.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/ngx-toastr/toastr.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'ISS Location';
  startTimer: boolean;
  public isLoggedin: boolean;
  loggedin: boolean;
  token: string;
  lat: number;
  lng: number;
  latC = 0;
  lngC = 0;
  showIssPass = false;
  showIssCurrent = true;
  peopleInSpace: any
  noPeopleInSpace: number

  constructor(
    private userService: UserService,
    private issService: IssService
  ) {
    this.isLoggedin = userService.isLoggedIn()
  }

  ngOnInit() {
    this.token = localStorage.getItem('currentUser');
    if (this.token !== null) {
      this.loggedin = true
    } else {
      this.loggedin = false
      this.userService.logout();
    }

   this.issService.getPeopleInSpace()
      .subscribe((data) => {
        this.peopleInSpace =  data.people
        this.noPeopleInSpace = this.peopleInSpace.length;
      });
  }

  currentLocation(lngLat: {lat: number, lng: number}) {
    this.lngC =  lngLat.lng;
    this.latC =  lngLat.lat;
  }

  searchLocation(lngLat: {lat: number, lng: number}) {
    this.lng =  lngLat.lng;
    this.lat =  lngLat.lat;
    this.startTimer = false;
  }

  userIsLoggedIn(logged: boolean) {
    this.isLoggedin = logged;
    this.loggedin = logged;
  }

  issPass(isspass: boolean) {
    this.showIssPass = isspass;
    this.showIssCurrent = false;
  }

  issCurrent(isscurrent: boolean) {
    this.startTimer = true;
    this.showIssCurrent = isscurrent;
    this.showIssPass = false;
  }

}
