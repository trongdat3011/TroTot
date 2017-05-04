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
  grid: any[];
  constructor(
    public navCtrl: NavController,
    public trototData: TrototData,
    public loadingController: LoadingController,
    public geolocation: Geolocation) { }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting data...'
    })
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.trototData.getHousesData(resp.coords.latitude, resp.coords.longitude)
        .subscribe(
        houses => {
          let rowNum = 0;
          this.grid = [];
          for (let i = 0; i < houses.length; i += 2) {
            this.grid.push([]);
            if (houses[i]) {
              this.grid[rowNum].push(houses[i]);
            }
            if (houses[i + 1]) {
              this.grid[rowNum].push(houses[i + 1]);
            }
            rowNum++;
          }
          loader.dismiss();
        });
    }).catch((error) => {
      console.log('Error getting location', error);
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
