import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { TrototData } from '../../providers/providers';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  signup: { username?: string, password?: string, phone?: string, email?: string, real_name?: string } = {};
  submitted = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public trototData: TrototData,
    public toastController: ToastController) { }

  onSubmit(signupForm: NgForm) {
    this.submitted = true;
    if (signupForm.valid) {
      let data = "username=" + this.signup.username
        + "&password=" + this.signup.password
        + "&phone=" + this.signup.phone
        + "&email=" + this.signup.email
        + "&real_name=" + this.signup.real_name;
      this.trototData.register(data).subscribe(msg => {
        if (msg == "Successful!") {
          let toast = this.toastController.create({
            message: 'Welcome! you have signed up successfully!',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.pop();
        }
        else {
          console.log(msg)
          let toast = this.toastController.create({
            message: 'Signup error, please try again!',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }
      })
    }
  }
}
