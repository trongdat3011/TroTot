import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { DemoAPI } from '../../providers/providers';
import { HouseInfoPage } from '../pages';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: String;
  grid: any[];
  constructor(
    public navCtrl: NavController, 
    public demoAPI: DemoAPI, 
    public loadingController: LoadingController) {}
  
  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Getting data...'
    })
    loader.present();
    this.demoAPI.getHousesData()
        .subscribe(
          houses => {
            let rowNum = 0;
            this.grid = [];
            for (let i = 0; i < houses.length; i += 2) {
              this.grid.push([]);
              if (houses[i]) {
                this.grid[rowNum].push(houses[i]);
              }
              if (houses[i+1]) {
                this.grid[rowNum].push(houses[i + 1]);
              }
              rowNum++;
            }
            loader.dismiss();
            //console.log(houses.length)
          }
        );
  }

  getRatingImg(rating: number) {
    let res = 'star/small_' + Math.round(rating - 0.5);
    if (Math.round(rating) != rating)
      res += '_half';
    res += '.png';
    return res;
  }

  houseTapped($event, item) {
    this.navCtrl.push(HouseInfoPage, item);
  }
}
