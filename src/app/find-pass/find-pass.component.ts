import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-find-pass',
  templateUrl: './find-pass.component.html',
  styleUrls: ['./find-pass.component.css']
})
export class FindPassComponent implements OnInit {
  issPassForm: FormGroup;
  @Input() lat;
  @Input() lng;
  submited = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.issPassForm = this.formBuilder.group({
      latitiude: [''],
      longitude: ['']
    })
  }

  get f() { return this.issPassForm.controls; }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.issPassForm = this.formBuilder.group({
      latitiude: [this.lat],
      longitude: [this.lng]
    })

  }
}
