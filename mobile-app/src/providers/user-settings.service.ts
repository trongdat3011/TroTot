import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorage } from './providers';

const win: any = window;

@Injectable()
export class UserSettings {
    public db: SQLite;
    public sql: SqlStorage;

    constructor(public events: Events, public storage: Storage) {
        if (win.sqlitePlugin) {
            this.sql = new SqlStorage();
        } else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }
    }

    initStorage(){
        if (this.sql){
            return this.sql.initializeDatabase();
        } else {
            return new Promise(resolve => resolve());
        }
    }
}