import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MapPage, Review, WriteReivewPage } from '../pages';
declare var window;
@Component({
  selector: 'page-house-info-page',
  templateUrl: 'house-info-page.html',
})
export class HouseInfoPage {
  house: any;
  isFollowing = false;
  tarBarElement: any;
  isLogin = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    public alertController: AlertController,
    public toastController: ToastController,
    public socialSharing: SocialSharing,
    public loadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {
    this.tarBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewCanEnter() {

    this.house = this.navParams.data;
    if (this.house.pictures_url.length > 5)
      this.house.pictures_url = this.house.pictures_url.slice(0, 5);
    this.provideStorage.isFavoriteHouse(this.house._id)
      .then(val => this.isFollowing = val);
    this.provideStorage.hasLoggedIn().then(val => this.isLogin = val);
  }

  ionViewWillEnter() {
    this.tarBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tarBarElement.style.display = 'flex';
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.provideStorage.unfavoriteHouse(this.house._id);

              let toast = this.toastController.create({
                message: 'You have unfollowed this house.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.provideStorage.favoriteHouse(this.house);
    }
  }

  shareImg() {
    let loader = this.loadingController.create({
      content: 'Processing...'
    })
    loader.present();
    this.socialSharing.share('Hello', 'blah blah', this.house.picture_url, 'https://www.facebook.com/vietdoan.hp')
      .then(() => {
        loader.dismiss();
      });
  }

  callMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Do remember to mention you have found this one on TroTot! Good luck!',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Email Host',
          icon: 'ios-mail',
          handler: () => {
            window.open("mailto:vietdoanhp1996@gmail.com", '_system');
          }

        },
        {
          text: 'Call ' + this.house.phone_number,
          icon: 'ios-call',
          handler: () => {
            window.open("tel:" + this.house.phone_number);
          }
        },
        {
          text: 'Cancel',
          icon: 'ios-close-circle',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  mapTapped($event: Event, item: any) {
    let location = {
      latitude: item.lat,
      longtitude: item.lng,
      name: item.name
    }
    this.navCtrl.push(MapPage, location);
  }

  reviewTapped($event: Event, houseId: number) {
    this.navCtrl.push(Review, houseId);
  }

  writeReviewTapped($event: Event, houseId) {
    this.navCtrl.push(WriteReivewPage, houseId);
  }
}
