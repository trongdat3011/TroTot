import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage, SearchPage, SavedPage} from '../pages';

@Component({
  templateUrl: 'tabs-page.html',
})
export class TabsPage {
  homePage = HomePage;
  searchPage = SearchPage;
  savedPage = SavedPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
