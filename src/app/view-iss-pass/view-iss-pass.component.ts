import { Component, OnInit } from '@angular/core';
import {  UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-iss-pass',
  templateUrl: './view-iss-pass.component.html',
  styleUrls: ['./view-iss-pass.component.css']
})
export class ViewIssPassComponent implements OnInit {
  issHistory = []
  id: number;
  showModal = false;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  looadModal(index: number) {
    this.id = index;
    this.showModal = true;
  }

  ngOnInit() {
    this.userService.viewIssHistory()
      .subscribe((data) => {
        this.issHistory = data.history.slice().reverse();
      }, () => {
        this.toastrService.error('Soome Error occured!');
      })
  }
}
