import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { DemoAPI } from '../../providers/providers';
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class Review {
  tarBarElement: any;
  reviews: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public demoAPI: DemoAPI) {
    this.tarBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewCanEnter() {
    let houseId = this.navParams.data;
    console.log(houseId);
    let loader = this.loadingController.create({
      content: 'Getting Reviews...'
    });
    loader.present()
    this.demoAPI.getReviews(houseId).subscribe(reviews => {
      this.reviews = reviews;
      loader.dismiss();
    })
  }

  ionViewWillEnter() {
    this.tarBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tarBarElement.style.display = 'flex';
  }
}
