import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers'
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  hasLoggedIn: boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provideStorage: ProvideStorage) {
  }

  ionViewCanEnter() {
    this.provideStorage.hasLoggedIn().then(val => this.hasLoggedIn = val);
  }
}
