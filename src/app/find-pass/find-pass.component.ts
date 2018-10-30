import { IssService } from './../services/iss.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { last } from '@angular/router/src/utils/collection';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-find-pass',
  templateUrl: './find-pass.component.html',
  styleUrls: ['./find-pass.component.css']
})
export class FindPassComponent implements OnInit {
  issPassForm: FormGroup;
  @Output() searchLocation = new EventEmitter<{lat: number, lng: number}>();
  passTimes = [];
  submitted = false;
  loading = false
  showResult = false;
  latC = 0;
  lngC = 0;

  constructor(
    private formBuilder: FormBuilder,
    private issService: IssService,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  isEmpty (control: FormControl){
    if (control.value === ''){
      return ({ required: true })
    }
    return (null);
  }

  latValidRange(controle: FormControl) {
    const val = controle.value;
    if(val < -90 || val > 90) {
      return ({ invalid: true})
    }
    return (null)
  }

  lngValidRange(controle: FormControl) {
    const val = controle.value;
    if(val < -180 || val > 180) {
      return ({ invalid: true})
    }
  }


  ngOnInit() {
    this.issPassForm = this.formBuilder.group({
      latitiude: ['', [Validators.required, this.latValidRange]],
      longitude: ['', [Validators.required, this.lngValidRange]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.issPassForm.invalid) return;

    this.loading = true
    const { latitiude, longitude } = this.issPassForm.value;
    const payload = {
      lat: latitiude,
      lng: longitude
    }

    this.issService.getIssPassLocation(payload)
      .subscribe((data) => {
        const payloadH = {
          location: {
            lat: data.request.latitude,
            lng: data.request.longitude
          },
          altitude: data.request.altitude,
          datetime: data.request.datetime,
          passes: data.response
        }
        this.userService.saveIssHistory(payloadH).subscribe(() => {
          this.passTimes = []
          this.latC = latitiude;
          this.lngC = longitude;
          this.showResult = true;
          this.searchLocation.emit({
            lat: latitiude,
            lng: longitude
          });

          data.response.map(t => {
            const tt = new Date(t.risetime * 1000);
            this.passTimes.push(tt)
          })
          this.loading = false;
       });

      }, (error) => {
        this.toastrService.error('Some Error occured, please try again later!')
        this.showResult = false;
        this.loading = false;
      })
  }

  get f() { return this.issPassForm.controls; }
}
