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
  @ViewChild('pacInput') pacInputElm: any;
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
        const { data: { iss_position: { latitude,longitude } } } = data;
          this.lat = latitude;
          this.lng = longitude;
      })
  }


  ngOnInit() {
  }

  ngAfterContentInit(){
    this.issLocation();

    const mapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 2,
    };
    this.myLatlng = new google.maps.LatLng(this.lat, this.lng);
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);

    const input: any = this.pacInputElm.nativeElement;
    const searchBox = new google.maps.places.SearchBox(input)
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    const bounds = this.map.getBounds()

    this.map.addListener('bounds_changed', function() {
      searchBox.setBounds(bounds);
    });

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log('Plaecss >>>', places.length, places)

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      places.forEach(function(place) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      console.log('Locatoin for Jos is ->>>>>', lat, lng);
      });
    });

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
