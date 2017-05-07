import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProvideStorage } from '../providers/providers'
import { FirstPage, TabsPage } from '../pages/pages';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    provideStorage: ProvideStorage) {
      provideStorage.hasLoggedIn().then(val => {
        if (val) {
          this.rootPage = TabsPage;
        }
        else 
          this.rootPage = FirstPage;
      })
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });

  }
}

