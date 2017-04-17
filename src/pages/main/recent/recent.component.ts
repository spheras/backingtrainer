import { Component } from '@angular/core';
import { Composition } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, AlertController, ModalController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App, MenuController } from 'ionic-angular';

@Component({
    templateUrl: './recent.component.html',
    providers: [MidiPlayer, PlayerService]
})
export class RecentPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];

    constructor(private app: App, private menu: MenuController, private modalCtrl: ModalController, public alertCtrl: AlertController,
        private player: MidiPlayer, private dao: DAO, private loadingCtrl: LoadingController) {
    }

    ionViewDidEnter() {
        this.menu.enable(false, 'menu-trainer');
    }
}