import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
declare var window: any;
@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  map: any;
  constructor(public navParams: NavParams) {
    
  }

  ionViewCanEnter(){
    let location = this.navParams.data;
    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: location.name 
    };

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
