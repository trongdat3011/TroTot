import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, ProfilePage, SearchPage, SavedPage, TabsPage, HouseInfoPage, MapPage, FirstPage, Login, Review } from '../pages/pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DemoAPI, ProvideStorage } from '../providers/providers';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    SearchPage,
    SavedPage,
    TabsPage,
    HouseInfoPage,
    MapPage,
    FirstPage,
    Login,
    Review
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD0CAaK08V00HNBekjLkQnkX9YyZvqfbYI'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    SearchPage,
    SavedPage,
    TabsPage,
    HouseInfoPage,
    MapPage,
    FirstPage,
    Login,
    Review
  ],
  providers: [
    DemoAPI,
    StatusBar,
    SplashScreen,
    ProvideStorage,
    SocialSharing,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
