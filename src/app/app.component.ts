import { Component } from '@angular/core';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/ngx-toastr/toastr.css'
  ]
})
export class AppComponent {
  title = 'iss-location';
  public isLoggedin: boolean;
  loggedin = false;

  constructor(
    private userService: UserService
  ) {
    this.isLoggedin = userService.isLoggedIn();
  }

  userIsLoggedIn(logged: boolean) {
    this.isLoggedin = logged;
    this.loggedin = logged;
  }


}
