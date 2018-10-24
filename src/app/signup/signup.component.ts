import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastrService: ToastrService
        ) {}
    isEmpty (control: FormControl){
      if (control.value.trim() === ''){
        return ({ required: true })
      }
      return (null);
    }

    isValid(control: FormControl) {
      const check = new RegExp(/^[a-z0-9]+$/i);
      const res = check.test(control.value)
      if (res === false) {
        return ({ invalid: true })
      }
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['', [
              Validators.required,
              Validators.email,
              Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ]],
            username: ['', [
              Validators.required,
              this.isEmpty,
              this.isValid

            ]],
            password: ['', [
              Validators.required,
              this.isEmpty,
              Validators.minLength(6)
            ]]
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;

        const {email, username, password} = this.signupForm.value;

        const userPayload = {
          username: username,
          email: email,
          password: password,
        };
        this.userService.createUser(userPayload)
          .subscribe(() => {
            this.toastrService.success('Your registration was succesfull');
            this.loading = false;
            this.signupForm.reset({
              username: '',
              email: '',
              password: ''
            });
            this.submitted = false;
          }, (err) => {
            this.loading = false;
            const errData = JSON.parse(err._body)
            const errMsg =  errData.message;
            this.toastrService.error(errMsg);
          });
    }
}
