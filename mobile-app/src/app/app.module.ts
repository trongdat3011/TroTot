import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, ProfilePage, SearchPage, SavedPage, TabsPage, HouseInfoPage } from '../pages/pages';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DemoAPI, UserSettings } from '../providers/providers';
import { HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    SearchPage,
    SavedPage,
    TabsPage,
    HouseInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    SearchPage,
    SavedPage,
    TabsPage,
    HouseInfoPage
  ],
  providers: [
    DemoAPI,
    StatusBar,
    SplashScreen,
    Storage,
    UserSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
