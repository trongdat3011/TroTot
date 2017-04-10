import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage, SearchPage, SavedPage, ProfilePage} from '../pages';

@Component({
  templateUrl: 'tabs-page.html',
})
export class TabsPage {
  homePage = HomePage;
  searchPage = SearchPage;
  savedPage = SavedPage;
  profilePage = ProfilePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
