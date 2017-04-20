import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, ProfilePage, SearchPage, SavedPage, TabsPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DemoAPI } from '../providers/providers';
import { HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    SearchPage,
    SavedPage,
    TabsPage
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
    TabsPage
  ],
  providers: [
    DemoAPI,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
