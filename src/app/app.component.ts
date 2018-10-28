import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/ngx-toastr/toastr.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'iss-location';
  public isLoggedin: boolean;
  loggedin: boolean;
  token: string;
  lat: number;
  lng: number;
  latC = 0;
  lngC = 0;
  showIssPass: boolean;
  showIssCurrent = true;
  peopleInSpace: any
  noPeopleInSpace: number

  constructor(
    private userService: UserService
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

   this.userService.getPeopleInSpace()
      .subscribe((data) => {
        this.peopleInSpace =  data.people
        console.log(this.peopleInSpace)
        this.noPeopleInSpace = this.peopleInSpace.length;
      });
  }

  currentLocation(lngLat: {lat: number, lng: number}) {
    this.lngC =  lngLat.lng;
    this.latC =  lngLat.lat;
  }

  markerDraged(lngLat: {lat: number, lng: number}) {
    this.lng =  lngLat.lng;
    this.lat =  lngLat.lat;
  }

  userIsLoggedIn(logged: boolean) {
    this.isLoggedin = logged;
    this.loggedin = logged;
  }

  issPass(isspass: boolean) {
    console.log('Pass Isss', isspass)
    this.showIssPass = isspass;
    this.showIssCurrent = false;
  }

  issCurrent(isscurrent: boolean) {
    this.showIssCurrent = isscurrent;
    this.showIssPass = false;
  }

}
