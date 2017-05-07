import { Component, NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { MapsAPILoader } from 'angular2-google-maps/core';
@Component({
  templateUrl: 'autocomplete-page.html'
})

export class AutocompletePage {

  autocompleteItems:any;
  autocomplete:any;
  service:any; 

  constructor (
    public viewCtrl: ViewController, 
    private zone: NgZone,
    public mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => this.service =  new google.maps.places.AutocompleteService());
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss(this.autocomplete.query);
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'VN'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if (predictions !== null)
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}