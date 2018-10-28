import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() issCurrentOut = new EventEmitter<boolean>();
  @Output() issPassOut = new EventEmitter<boolean>();
  @Output() issHistoryOut = new EventEmitter<boolean>();
  @Output() onLoggedin = new EventEmitter<boolean>();
  loggedin = false;
  token: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('currentUser');
    if (this.token !== null) {
      this.loggedin = true
    } else {
      this.loggedin = false
      this.userService.logout();
    }
  }

  issCurrent(){
    return this.issCurrentOut.emit(true);
  }

  issPass() {
    return this.issPassOut.emit(true);
  }

  issHistory() {
    return this.issHistoryOut.emit(true);
  }

  logout() {
    this.userService.logout();
    this.loggedin = false
    this.onLoggedin.emit(false);
  }

  userIsLoggedIn(logged: boolean) {
    this.onLoggedin.emit(logged);
    this.loggedin = logged
  }
}
