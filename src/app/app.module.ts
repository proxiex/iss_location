import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

import { UserService } from './services/user.service';
import { MapService } from './services/map.service';
import { IssService  } from './services/iss.service';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { FindPassComponent } from './find-pass/find-pass.component';
import { ViewIssPassComponent } from './view-iss-pass/view-iss-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    FindPassComponent,
    ViewIssPassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    MapService,
    IssService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
