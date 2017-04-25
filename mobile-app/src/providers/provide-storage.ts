import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProvideStorage {
    constructor(public storage: Storage) { }

    favoriteHouse(house) {
        return new Promise(resolve => {
            this.storage.set(house.listing.id.toString(), JSON.stringify(house));
        })

    }

    unfavoriteHouse(houseId) {
        return new Promise(resolve => {
            this.storage.remove(houseId.toString());
        })
    }

    isFavoriteHouse(houseId) {
        return new Promise<boolean>(resolve => {
            this.storage.get(houseId.toString()).then((val) => resolve(val ? true : false));
        })
    }

    getAllFavorites() {
        return new Promise<any[]>(resolve => {
            let results = [];
            this.storage.forEach(data => {
                results.push(JSON.parse(data));
            });
            resolve(results);
        });
    }


}