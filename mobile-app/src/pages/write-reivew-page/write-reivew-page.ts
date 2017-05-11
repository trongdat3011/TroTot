import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvideStorage, TrototData } from '../../providers/providers';
@Component({
  selector: 'page-write-reivew-page',
  templateUrl: 'write-reivew-page.html',
})
export class WriteReivewPage {
  star_rating: string = "0";
  comment: string = "";
  houseId: string = "";
  token: string;
  tarBarElement: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    public trototData: TrototData,
    public toastController: ToastController) {
    this.tarBarElement = document.querySelector('.tabbar.show-tabbar');
    this.houseId = this.navParams.data;
    this.provideStorage.getToken().then(token => this.token = token);
  }
  getRatingImg(rating: number) {
    let res = 'assets/star/small_' + Math.round(rating - 0.5);
    if (Math.round(rating) != rating)
      res += '_half';
    res += '.png';
    return res;
  }

  onSubmit() {
    let data = "star_rating=" + this.star_rating
      + "&comment=" + this.comment;
    this.trototData.createReview(this.houseId, this.token, data).subscribe(msg => console.log(msg));
    let toast = this.toastController.create({
      message: 'New review!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.navCtrl.pop();

  }

  ionViewWillEnter() {
    this.tarBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tarBarElement.style.display = 'flex';
  }
}
