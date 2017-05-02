import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Signup } from '../pages';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  login: {username?: string, password?: string} = {};
  submitted = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  singupTapped() {
    this.navCtrl.push(Signup);
  }

  onLogin(loginForm) {
    console.log(loginForm);
  }
}
