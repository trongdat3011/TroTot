import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { TrototData } from '../../providers/providers';
import { HouseInfoPage } from '../pages';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: String;
  loader: any;
  col1: any[];
  col2: any[];
  constructor(
    public navCtrl: NavController,
    public trototData: TrototData,
    public loadingController: LoadingController,
    public geolocation: Geolocation) { }

  getData(lat:number, lng:number) {
    this.trototData.getHousesData(lat, lng)
      .subscribe(
      houses => {
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
        this.loader.dismiss();
      });
  }
  ionViewDidLoad() {
    this.loader = this.loadingController.create({
      content: 'Getting data...'
    })
    this.loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getData(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loader.dismiss();
      //this.getData(21.0282368, 105.7739294);
    })
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
