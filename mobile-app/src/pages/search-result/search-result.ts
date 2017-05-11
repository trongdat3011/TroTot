import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HouseInfoPage } from '../pages';
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})

export class SearchResult {
  col1: any[];
  col2: any[];
  bundleMarkers: any[];
  lat: number;
  lng: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewCanEnter() {
    let houses = this.navParams.data.houses;
    let location = this.navParams.data.location;
    let rowNum = 0;
    this.col1 = [];
    this.col2 = [];
    for (let i = 0; i < houses.length; i += 2) {
      if (houses[i]) {
        this.col1.push(houses[i]);
      }
      if (houses[i + 1]) {
        this.col2.push(houses[i + 1]);
      }
    }
    this.bundleMarkers = [];
    for (let i = 0; i < houses.length; i++) {
      this.bundleMarkers.push({
        latitude: houses[i].lat,
        longitude: houses[i].lng,
        title: houses[i].name,
        label: houses[i].name
      })
    }
    this.lat = location.lat;
    this.lng = location.lng;
  }

  getRatingImg(rating: number) {
    let res = 'assets/star/small_' + Math.round(rating - 0.5);
    if (Math.round(rating) != rating)
      res += '_half';
    res += '.png';
    return res;
  }

  houseTapped($event, item) {
    this.navCtrl.push(HouseInfoPage, item);
  }
}
