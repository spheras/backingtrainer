import { Component } from '@angular/core';

@Component({
    template:
    `<ion-content></ion-content>`
})
export class TabsTextContentPage {
    constructor() { }
}

@Component({
    templateUrl: 'main.component.html'
})

export class MainPage {
    pages = [];
    tab1: any;
    tab2: any;
    tab3: any;
    tab4: any;

    constructor() {
        this.tab1 = TabsTextContentPage;
        this.tab2 = TabsTextContentPage;
        this.tab2 = TabsTextContentPage;
        this.tab2 = TabsTextContentPage;
    }

}