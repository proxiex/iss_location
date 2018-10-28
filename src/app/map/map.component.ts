/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
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
  @Output() searchLocation = new EventEmitter<{lat: number, lng: number}>();
  @Output() markerDraged = new EventEmitter<{lat: number, lng: number}>();
  @Output() currentLocation = new EventEmitter<{lat: number, lng: number}>();
  @Input() loggedin;

  map: google.maps.Map;
  lat: number;
  lng: number;
  marker: google.maps.Marker;
  myLatlng: google.maps.LatLng
  timeOut: any;


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

  recenterMap() {
    let latLng = new google.maps.LatLng(this.lat, this.lng)
    this.map.panTo(latLng);
    this.marker.setPosition(latLng);
  }

  ngOnInit() {
  }

  setResetInterval(bool: boolean) {
    if (bool) {
      this.timeOut = setInterval(()=> {
            this.issLocation();
            this.recenterMap();
            this.currentLocation.emit({
              lat: this.lat,
              lng: this.lng
            })
      }, 5000);
  } else {
      clearInterval(this.timeOut);
    }
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
      this.searchLocation.emit({lat, lng})
      console.log('Locatoin for Jos is ->>>>>', lat, lng);
      });
    });
    
    this.marker = new google.maps.Marker({
      position: this.myLatlng,
      map: this.map,
      icon: 'assets/img/ISSIcon.png',
    });

    // this.marker.addListener('dragend', () => {
    //   const lat = this.marker.getPosition().lat()
    //   const lng = this.marker.getPosition().lng()
    //   this.markerDraged.emit({lat, lng})
    //   this.setResetInterval(false);
        
    // })

    this.setResetInterval(true)
  }
}
