import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { HouseInfoPage } from '../pages';

@Component({
  selector: 'page-saved-page',
  templateUrl: 'saved-page.html',
})
export class SavedPage {
  favorites:any[] = [];
  show:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provideStorage: ProvideStorage
    ) {}

  ionViewDidEnter() {
    this.show = false;
    this.provideStorage.getAllFavorites().then(favs => {
      this.favorites = favs;
      if (favs.length == 0)
        this.show = true;
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

}
