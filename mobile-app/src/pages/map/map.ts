import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
declare var window: any;
@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  map: any;
  tarBarElement: any;
  constructor(public navParams: NavParams) {
    this.tarBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewCanEnter(){
    
    let location = this.navParams.data;
    console.log(location);
    this.map = {
      lat: location.latitude,
      lng: location.longtitude,
      zoom: 17,
      markerLabel: location.name 
    };

  }

  ionViewWillEnter() {
    this.tarBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tarBarElement.style.display = 'flex';
  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
