import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { TrototData } from '../../providers/providers';
import { HostForm } from '../pages';
declare var cordova;
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private file: File,
    public loadingController: LoadingController,
    public trototData: TrototData) { }

  private openGallery(): void {
    let options = {
      maximumImagesCount: 5,
      width: 500,
      height: 500,
      quality: 75
    }
    let loader = this.loadingController.create({
      content: 'Uploading...'
    });
    let l = 0;
    this.imagePicker.getPictures(options)
      .then(file_uris => {
        l = file_uris.length;
        if (l > 0)
          loader.present();
        return Promise.all(file_uris.map(imageUri => {
          let arr = imageUri.split('/');
          let fileName = arr[arr.length - 1];
          let path = imageUri.replace('/' + fileName, '');
          return this.file.readAsDataURL(path, fileName);
        }))
      })
      .then(file64s => {
        let result = [];
        file64s.forEach(file => {
          this.trototData.uploadImage(file).subscribe(link => {
            result.push(link);
            if (result.length == l) {
              loader.dismiss();
              this.navCtrl.push(HostForm, result);
            }
          })
        })
      })
      .catch(err => {
        loader.dismiss();
        this.navCtrl.push(HostForm);
      });
  }

}
