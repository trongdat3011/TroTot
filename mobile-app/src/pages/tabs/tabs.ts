import { Component } from '@angular/core';

import { HomePage, ProfilePage, SearchPage, SavedPage } from '../pages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage;
  profilePage = ProfilePage;
  searchPage = SearchPage;
  savedPage = SavedPage;
  constructor() {

  }

}
