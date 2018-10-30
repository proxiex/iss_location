/// <reference types="@types/googlemaps" />
import { 
  Component, 
  OnInit, 
  ViewChild, 
  EventEmitter, 
  Output,
  Input, 
  SimpleChanges 
} from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'My first AGM project';

  @ViewChild('gmap') gmapElement: any;
  @Output() currentLocation = new EventEmitter<{lat: number, lng: number}>();
  @Input() loggedin;
  @Input() searchLat;
  @Input() searchLng;
  @Input() startTimer;


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
    
    this.marker = new google.maps.Marker({
      position: this.myLatlng,
      map: this.map,
      icon: 'assets/img/ISSIcon.png',
    });
    this.setResetInterval(true)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchLat && this.searchLng ){
      this.lat = this.searchLat;
      this.lng = this.searchLng;
      this.setResetInterval(false)
      this.recenterMap()
    }

    if (this.startTimer) {
      this.setResetInterval(true);
    }
  }
}
