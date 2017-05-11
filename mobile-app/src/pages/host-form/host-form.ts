import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { TrototData } from '../../providers/providers';
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
    private geolocation: Geolocation,
    public trototData: TrototData,
    public toastController: ToastController) {
    this.provideStorage.getToken().then(token => this.token = token);
    this.pictures_url = this.navParams.data;
    if (this.pictures_url.constructor !== Array) {
      this.picture_url = "https://static.phongtro123.com/uploads/2017/04/anh-phong-tro.jpg";
      this.pictures_url = [
        "https://static.phongtro123.com/uploads/2017/04/anh-phong-tro.jpg",
        "https://static.phongtro123.com/uploads/2017/04/anh-phong-tro.jpg"
      ];
    }
    else this.picture_url = this.pictures_url[0];
    //console.log(this.pictures_url);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

    });
  }

  onSubmit() {
    this.price = this.superPrice * 100000;
    let data = {
      city: "Hà Nội",
      lat: this.lat,
      lng: this.lng,
      name: this.name,
      person_capacity: this.person_capacity,
      description: this.description,
      price: this.price,
      phone_number: this.phone_number,
      picture_url: this.picture_url,
      public_address: this.public_address,
      available: true,
      rent_type: this.rent_type
    };
    let query = "";
    for (let key in data) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let arr = '["' + this.pictures_url.toString() + '"]';
    arr = arr.replace(/,/g, '", "');
    //console.log(arr);
    query += encodeURIComponent("pictures_url") + "=" + encodeURIComponent(arr);
    query = query.replace(/%20/g, '+');
    //console.log(query);
    this.trototData.createNewHouse(query, this.token).subscribe(res => {
      let toast = this.toastController.create({
        message: 'You have created new house successfully!',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop();
    });
  }
}
