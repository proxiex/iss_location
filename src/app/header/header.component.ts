import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onLoggedin = new EventEmitter<boolean>();
  loggedin = false;

  constructor() { }

  ngOnInit() {
  }

  userIsLoggedIn(logged: boolean) {
    this.onLoggedin.emit(logged);
    this.loggedin = logged
  }
}
