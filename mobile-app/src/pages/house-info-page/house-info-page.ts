import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-house-info-page',
  templateUrl: 'house-info-page.html',
})
export class HouseInfoPage {
  house: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewCanEnter() {
    this.house = this.navParams.data;
  }

}
