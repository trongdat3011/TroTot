import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { TabsPage, HomePage, SearchPage, SavedPage, ProfilePage} from '../pages/pages';
import { DemoAPI } from '../providers/providers'
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    SavedPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    SavedPage,
    ProfilePage
  ],
  providers: [
    DemoAPI,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
