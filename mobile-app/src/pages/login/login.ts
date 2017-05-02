import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Signup, TabsPage } from '../pages';
import { NgForm } from '@angular/forms';
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

  onLogin(loginForm: NgForm) {
    this.submitted = true;
    if (loginForm.valid) {
      console.log(this.login);
      this.navCtrl.push(TabsPage);
    }
    
  }
}
