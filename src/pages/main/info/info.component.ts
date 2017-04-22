import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CreditsPage } from '../../credits/credits.component';

@Component({
    templateUrl: './info.component.html',
})
export class InfoPage {

    constructor(private modalCtrl: ModalController) {

    }

    /**
     * @name showCredits
     * @description show the credits of the application
     */
    showCredits() {
        this.modalCtrl.create(CreditsPage).present();
    }
}