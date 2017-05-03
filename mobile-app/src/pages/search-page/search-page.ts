import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
@Component({
  selector: 'page-search-page',
  templateUrl: 'search-page.html',
})
export class SearchPage {
  useUserLocation: boolean = false;
  price: any = { lower: 0, upper: 10};
  rating: any = {lower: 0, upper: 5};
  @ViewChild('map') mapElement: ElementRef;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation) {}

  ionViewDidLoad() {
    
  }

}
