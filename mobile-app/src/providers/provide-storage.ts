import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class  ProvideStorage {
    constructor(
        public storage: Storage) {}
    
    favoriteHouse(house) {

    }

    unfavoriteHouse(houseId) {

    }

    isFavoriteHouse(houseId) {

    }

    getAllFavorites() {

    }

    
}