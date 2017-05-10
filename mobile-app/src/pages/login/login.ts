import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Signup, TabsPage } from '../pages';
import { NgForm } from '@angular/forms';
import { ProvideStorage } from '../../providers/providers';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  login: { username?: string, password?: string } = {};
  submitted = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    public events: Events) {
    this.events.subscribe('user:login', () => {
      if (this.navParams.data === true) {
        this.navParams.data = false;
        this.navCtrl.pop();
      }
      else if (this.navParams.data !== false) {
        this.navCtrl.push(TabsPage);
      }
      this.events.unsubscribe('user:login', () => { });
    })
  }

  singupTapped() {
    this.navCtrl.push(Signup);
  }

  onLogin(loginForm: NgForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.provideStorage.login(this.login);
    }
  }

  ionViewWillLeave() {
    this.events.unsubscribe('user:login', () => { });
  }
}
