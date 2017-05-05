import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CreditsPage } from '../../credits/credits.component';
import { PlayerService } from '../../../player/player.service';

@Component({
    templateUrl: './info.component.html',
    providers: [PlayerService]
})
export class InfoPage {

    constructor(private modalCtrl: ModalController, private service: PlayerService) {

    }

    /**
     * @name showCredits
     * @description show the credits of the application
     */
    showCredits() {
        this.modalCtrl.create(CreditsPage).present();
    }
}