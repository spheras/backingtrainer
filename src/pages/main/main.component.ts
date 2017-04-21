import { Component } from '@angular/core';
import { RecentPage } from './recent/recent.component';
import { DownloadedPage } from './downloaded/downloaded.component';
import { SearchPage } from './search/search.component';
import { InfoPage } from './info/info.component';
import { Tab } from 'ionic-angular';

@Component({
    templateUrl: 'main.component.html'
})

export class MainPage {
    tab0: typeof InfoPage = InfoPage;
    tab1: typeof RecentPage = RecentPage;
    tab2: typeof DownloadedPage = DownloadedPage;
    tab3: typeof SearchPage = SearchPage;

    private currentTab: Tab = null;

    constructor() {
    }

    ionViewWillEnter() {
        this.enableMenus();
    }

    ionViewWillLeave() {
        this.disableMenus();
    }

    /**
     * @name enableMenus
     * @description Enable the corresponding menu to the selected tab
     */
    private enableMenus() {
        if (this.currentTab != null) {
            if (this.currentTab.root === RecentPage) {

            } else if (this.currentTab.root === DownloadedPage) {

            } else if (this.currentTab.root === SearchPage) {

            }
        } else {
            this.disableMenus();
        }
    }

    /**
     * @name disableMenus
     * @description disable all the menus for all the tabs
     */
    private disableMenus() {

    }

    /**
     * @name change
     * @description capture the change event for the ion-tab component
     * @param {Tab} tab the selected tab
     */
    change(tab: Tab) {
        this.currentTab = tab;
        this.enableMenus();
    }


}