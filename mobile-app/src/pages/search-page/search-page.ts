import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AutocompletePage } from '../pages';

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
    public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    
  }

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
}
