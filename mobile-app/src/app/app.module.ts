import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, ProfilePage, SearchPage, SavedPage, TabsPage, HouseInfoPage } from '../pages/pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DemoAPI } from '../providers/providers';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
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
    HttpModule,
    IonicStorageModule.forRoot()
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
