import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImage {
  file: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private imagePicker: ImagePicker) {
  }
  
  private openGallery(): void {
    let options = {
      maximumImagesCount: 5,
      width: 500,
      height: 500,
      quality: 75
    }

    this.imagePicker.getPictures(options).then(
      file_uris => this.file = file_uris,
      err => console.log('uh oh')
    );
  }

}
