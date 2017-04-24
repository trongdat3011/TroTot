import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-saved-page',
  templateUrl: 'saved-page.html',
})
export class SavedPage {
  favorites: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedPage');
  }

}
