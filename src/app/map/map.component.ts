/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'My first AGM project';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  lat: number;
  lng: number;
  marker: google.maps.Marker;
  myLatlng: google.maps.LatLng

  constructor(
    private mapService: MapService
  ) { }

  issLocation() {
    this.mapService.ISSCurrentLocatoin()
      .subscribe((data) => {
        const {iss_position: { latitude,longitude } } = data;
          this.lat = latitude;
          this.lng = longitude;
      })
  }


  ngOnInit() {
  }

  ngAfterContentInit(){
    this.issLocation();

    var mapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 2,
    };
    this.myLatlng = new google.maps.LatLng(this.lat, this.lng);
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: this.myLatlng,
      map: this.map,
      icon: 'assets/img/ISSIcon.png',
      draggable: true
    });

    let myVar = setInterval(()=> {
      
        this.issLocation();
  
      let x = new google.maps.LatLng(this.lat, this.lng)
      this.map.panTo(x);
      this.marker.setPosition(x);

  }, 5000)

  }

}
