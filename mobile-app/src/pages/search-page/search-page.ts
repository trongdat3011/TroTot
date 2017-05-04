import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AutocompletePage } from '../pages';
import { Geolocation } from '@ionic-native/geolocation';
import { TrototData } from '../../providers/providers';
import { SearchResult } from '../pages';
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
  limit: number = 10;
  location:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    public geolocation: Geolocation,
    public trototData: TrototData) {}

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

  goToPageSearchResult() {
    this.trototData.searchHouse(this.location, this.radius, this.limit, this.price)
        .subscribe(
        houses => {
          console.log(houses);
          let rowNum = 0;
          let grid = [];
          for (let i = 0; i < houses.length; i += 2) {
            grid.push([]);
            if (houses[i]) {
              grid[rowNum].push(houses[i]);
            }
            if (houses[i + 1]) {
              grid[rowNum].push(houses[i + 1]);
            }
            rowNum++;
          }
          //this.navCtrl.push(SearchResult, grid);
        })
  }

  showListings() {
    let loader = this.loadingController.create({
      content: 'Processing...'
    })
    let self = this;
    loader.present();
    if (this.useUserLocation) {
      this.geolocation.getCurrentPosition().then(pos => {
        self.location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        console.log(self.location);
        loader.dismiss();
        self.goToPageSearchResult();
      }); 
    }
    else {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': this.address}, function(results, status) {
      if (status == 'OK') {
        self.location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        console.log(self.location);
        loader.dismiss();
        self.goToPageSearchResult();
      } else {
        
        loader.dismiss();
      }
    });
    }
  }

}
