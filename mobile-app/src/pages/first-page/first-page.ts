import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage, Login } from '../pages';
@Component({
  selector: 'page-first-page',
  templateUrl: 'first-page.html',
})
export class FirstPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {}
    
  searchPageTapped() {
    this.navCtrl.push(TabsPage);
  }

  loginPageTapped() {
    this.navCtrl.push(Login);
  }
  
}
