import { Component } from '@angular/core';
import { RecentPage } from './recent/recent.component';
import { DownloadedPage } from './downloaded/downloaded.component';
import { SearchPage } from './search/search.component';

@Component({
    templateUrl: 'main.component.html'
})

export class MainPage {
    pages = [];
    tab1: any;
    tab2: any;
    tab3: any;

    constructor() {
        this.tab1 = RecentPage;
        this.tab2 = DownloadedPage;
        this.tab3 = SearchPage;
    }

}