import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-host-form',
  templateUrl: 'host-form.html',
})
export class HostForm {
  token: string;
  pictures_url: string[];
  picture_url: string;
  lat: number;
  lng: number;
  city: string;
  available: boolean;
  rent_type: string = "Cho thuê";
  superPrice: number = 0;
  price: number = 0;
  name: string;
  person_capacity: string = "2";
  description: string;
  phone_number: string;
  public_address: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    private geolocation: Geolocation) {
    this.provideStorage.getToken().then(token => this.token = token);
    this.pictures_url = this.navParams.data;
    this.picture_url = this.pictures_url[0];
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

    });
    this.city = "Hà Nội";
    this.available = true;
  }

  onSubmit() {
    this.price = this.superPrice * 100000;
    
  }
}
