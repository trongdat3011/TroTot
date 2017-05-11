import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TrototData } from '../../providers/providers';
import { HouseInfoPage } from '../pages';
@Component({
  selector: 'page-listings-page',
  templateUrl: 'listings-page.html',
})
export class ListingsPage {
  col1: any[];
  col2: any[];
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public trototData: TrototData,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ionViewCanEnter() {
    this.user = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present()
    this.trototData.getHousesByUserId(this.user.userId).subscribe(houses => {
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
      loader.dismiss();
    });
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

  trashTapped(houseId: string) {
    let confirm = this.alertController.create({
      title: 'Unfollow?',
      message: 'Are you sure that you want to permanently delete the selected house?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.trototData.deleteHouse(this.user.token, houseId).subscribe(msg => console.log(msg));
            let index = -1;
            for (let i = 0; i < this.col1.length; i++)
              if (this.col1[i]._id == houseId) {
                index = i;
                break;
              }
            if (index != -1)
              this.col1.splice(index, 1);
            index = -1;
            for (let i = 0; i < this.col2.length; i++)
              if (this.col2[i]._id == houseId) {
                index = i;
                break;
              }
            if (index != -1)
              this.col2.splice(index, 1);
            let toast = this.toastController.create({
              message: 'You have deleted a house!',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        { text: 'No' }
      ]
    });
    confirm.present();
  }
}