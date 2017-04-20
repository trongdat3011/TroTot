import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { DemoAPI } from '../../providers/providers';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: String;
  houses: any[];
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
            this.houses = houses;
            loader.dismiss();
            console.log(houses.length)
          }
        );
  }
}
