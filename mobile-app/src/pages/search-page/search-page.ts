import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DemoAPI } from '../../providers/providers';
declare var google;
@Component({
  selector: 'page-search-page',
  templateUrl: 'search-page.html',
})
export class SearchPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  houses: any[];
  bounds: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation,
    public loadingController: LoadingController,
    public demoAPI: DemoAPI) {}

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Please Wait...'
    })
    this.demoAPI.getHousesData().subscribe( houses => {this.houses = houses; loader.dismiss();this.loadMap();} );
  }

  createMarker(location:any) {
    var icon = {
      url: location.img,
      size: new google.maps.Size(30, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var position = new google.maps.LatLng(location.lat, location.lng);
    //this.bounds.extend(position);
    return new google.maps.Marker({
      icon: icon,
      position: position,
      map: this.map,
      title: location.name
    })
  }

  loadMap(){
    
    let img = this.houses[0].listing.picture_url;
    console.log(img);
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.createMarker({lat: position.coords.latitude, lng: position.coords.longitude, img:img, name:'vietdoan'});
 
    }, (err) => {
      console.log(err);
    });

  }
}
