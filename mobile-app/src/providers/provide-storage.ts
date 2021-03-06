import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, ToastController } from 'ionic-angular';
import { TrototData } from './trotot-data';
@Injectable()
export class ProvideStorage {
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    TOKEN = 'accessToken';
    constructor(
        public storage: Storage,
        public events: Events,
        public trototData: TrototData,
        public toastController: ToastController) {
        //this.storage.clear().then(() => console.log('everything is removed!!'))
    }

    favoriteHouse(house): void {
        this.storage.set(house._id.toString(), JSON.stringify(house));
    }

    unfavoriteHouse(houseId): void {
        this.storage.remove(houseId.toString());
    }

    isFavoriteHouse(houseId): Promise<boolean> {
        return this.storage.get(houseId.toString()).then((val) => val ? true : false);
    }

    getAllFavorites() {
        let results = [];
        return this.storage.forEach((data, key, index) => {
                if (key != this.TOKEN && key != this.HAS_LOGGED_IN && key != this.HAS_SEEN_TUTORIAL)
                    results.push(JSON.parse(data));
            }).then(() => results);
    }

    hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then(value => value === true);
    }

    login(user): void {
        this.trototData.login(user).subscribe(info => {
            if (!info.success) {
                let toast = this.toastController.create({
                    message: 'Your username or password is incorrect!',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                let toast = this.toastController.create({
                    message: 'You have logged in!',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
                this.storage.set(this.HAS_LOGGED_IN, true);
                this.storage.set(this.TOKEN, info.token);
                this.events.publish('user:login');
            }
        });
    }

    logout(): void {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove(this.TOKEN);
        this.events.publish('user:logout');
    }

    getToken(): Promise<string> {
        return this.storage.get(this.TOKEN).then(token => token);
    }

    checkHasSeenTutorial(): Promise<boolean> {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then(value => value === true);
    }

    seenTutorial(): void {
        this.storage.set(this.HAS_SEEN_TUTORIAL, true);
    }

}