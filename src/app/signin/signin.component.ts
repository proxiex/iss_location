import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService
              ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.signInForm.controls; }


  loginUser() { 
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.signInForm.value;
      const userPayload = {
        email,
        password,
      };
    this.userService.login(userPayload)
    .subscribe((response) => {
      console.log(response)
      this.toastrService.success(response);
      this.loading = false;
      this.signInForm.reset();
    }, (err) => {
      this.loading = false;
        const errData = JSON.parse(err._body)
        const errMsg =  errData.message;
        this.toastrService.error(errMsg)
    });
  }

}