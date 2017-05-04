import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AutocompletePage } from '../pages';
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
  radius: number = 1;
  address: string = "";
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    public geolocation: Geolocation) {}

  increaseRadius() {
    if (this.radius < 20)
      this.radius++;
  }

  decreaseRadius() {
    if (this.radius > 1)
      this.radius--;
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.address = data;
    });
    modal.present();
  }

  showListings() {
    let location:any;
    let loader = this.loadingController.create({
      content: 'Processing...'
    })
    loader.present();
    if (this.useUserLocation) {
      this.geolocation.getCurrentPosition().then(pos => {
        location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        console.log(location);
        loader.dismiss();
      }); 
    }
    else {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': this.address}, function(results, status) {
      if (status == 'OK') {
        location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        console.log(location);
        loader.dismiss();
      } else {
        
        loader.dismiss();
      }
    });
    }
  }

}
