import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MapPage, Review } from '../pages';
declare var window;
@Component({
  selector: 'page-house-info-page',
  templateUrl: 'house-info-page.html',
})
export class HouseInfoPage {
  house: any;
  isFollowing = false;
  tarBarElement: any;
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
    if (this.house.listing.picture_urls.length > 5)
      this.house.listing.picture_urls = this.house.listing.picture_urls.slice(0, 5);
    this.provideStorage.isFavoriteHouse(this.house.listing.id)
      .then(val => this.isFollowing = val);
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
              this.provideStorage.unfavoriteHouse(this.house.listing.id);

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
    this.socialSharing.share('Hello', 'blah blah', this.house.listing.picture_url, 'https://www.facebook.com/vietdoan.hp')
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
          text: 'Call +84123456789',
          icon: 'ios-call',
          handler: () => {
            window.open("tel:01253784598")
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
      latitude: item.listing.lat,
      longtitude: item.listing.lng,
      name: item.listing.name
    }
    this.navCtrl.push(MapPage, location);
  }

  reviewTapped($event: Event, houseId: number) {
    this.navCtrl.push(Review, houseId);
  }
}
