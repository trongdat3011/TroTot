import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { TrototData } from '../../providers/providers';
import { Login, UploadImage, ListingsPage } from '../pages';
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  hasLoggedIn: boolean = true;
  userInfo: any;
  token: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    public trototData: TrototData,
    public toastController: ToastController,
    public events: Events) { }

  ionViewCanEnter() {
    this.provideStorage.hasLoggedIn().then(val => {
      this.hasLoggedIn = val;
      if (val) {
        this.provideStorage.getToken().then(token => {
          this.token = token;
          this.trototData.getAccount(token).subscribe(info => this.userInfo = info);
        })
      }
    });
  }

  openLogin() {
    this.navCtrl.push(Login, true);
  }

  logout() {
    this.provideStorage.logout();
    this.hasLoggedIn = false;
    let toast = this.toastController.create({
      message: 'You have logged out',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  listingsTapped() {
    let user = {
      token: this.token,
      userId: this.userInfo._id
    }
  
    this.navCtrl.push(ListingsPage, user);
  }

  uploadTapped() {
    this.navCtrl.push(UploadImage);
  }
}
