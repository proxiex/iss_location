import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'My first AGM project';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  lat: number = 0;
  lng: number = 0 ;
  marker: google.maps.Marker;
  myLatlng: google.maps.LatLng

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
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
      this.lat -= 2.4;
      this.lng += 4.24;
  
      let x = new google.maps.LatLng(this.lat, this.lng)
      this.map.panTo(x);
      this.marker.setPosition(x);

  }, 2000)

  }

}
