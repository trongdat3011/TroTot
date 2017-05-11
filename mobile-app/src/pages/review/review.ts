import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TrototData } from '../../providers/providers';
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
    public trototData: TrototData) {
    this.tarBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewCanEnter() {
    let houseId = this.navParams.data;
    //console.log(houseId);
    let loader = this.loadingController.create({
      content: 'Getting Reviews...'
    });
    loader.present()
    this.trototData.getReviews(houseId).subscribe(reviews => {
      this.reviews = reviews;
      //console.log(reviews);
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
