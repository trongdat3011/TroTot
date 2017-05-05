import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
@Injectable()
export class ProvideStorage {
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    TOKEN = 'accessToken'
    constructor(
        public storage: Storage,
        public events: Events) {
            this.storage.clear().then(() => console.log('everything is removed!!'))
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
        return new Promise<any[]>(resolve => {
            let results = [];
            this.storage.forEach((data, key, index) => {
                results.push(JSON.parse(data));
            });
            resolve(results);
        }); 
    }

    hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then(value => value === true);
    }

    login(token): void {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set(this.TOKEN, token);
        this.events.publish('user:login');
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