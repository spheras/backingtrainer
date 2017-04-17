import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { ModalController, LoadingController, AlertController, NavController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App, MenuController } from 'ionic-angular';

@Component({
    templateUrl: './downloaded.component.html',
    providers: [MidiPlayer, PlayerService]
})
export class DownloadedPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];

    constructor(private app: App, private menu: MenuController, private modalCtrl: ModalController,
        private navCtrl: NavController, private alertCtrl: AlertController, private player: MidiPlayer,
        private dao: DAO, private loadingCtrl: LoadingController) {
    }

    public enableMenus(){
    }

    public disableMenus(){
    }

    ionViewDidEnter() {
        this.loadCompositions();
    }

    /**
     * @name loadCompositions
     * @description load the compositions downloaded
     * @return the promise to load them
     */
    private loadCompositions(): Promise<void> {
        return new Promise<string>(resolve => {
            this.dao.getCompositions().then((compositions) => {
                this.compositions = compositions;
                this.filteredComp = this.compositions;
                resolve();
            });
        });
    }

    /**
     * @name stopMidi
     * @description stop the currently midi being played
     */
    stopMidi(index: number) {
        let comp = this.filteredComp[index];
        comp.flagPlaying = false;
        this.player.stop();
    }

    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param <number> index the index to be played
     */
    playMidi(index: number) {
        let comp = this.filteredComp[index];
        this.player.stop();
        comp.flagPlaying = true;
        this.player.load(comp).then(() => {
            this.player.play(120);
        });
    }

    removeComposition(index: number) {
        let loader = this.loadingCtrl.create({
            content: "Please wait while removing..."
        });
        loader.present();

        let comp = this.filteredComp[index];
        this.dao.removeComposition(comp.id).then(() => {
            this.loadCompositions().then(() => {
                loader.dismiss();
            });
        });
    }

    /**
     * @name trainComposition
     * @description train the selected composition
     * @param {number} index the index of the composition selected
     */
    trainComposition(index: number) {
        let comp = this.filteredComp[index];
        this.app.getRootNav().push(TrainerPage, comp);
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    }

    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param <string> val the value to filter
     */
    filterCompositions(val: string) {
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredComp = this.compositions.filter((item: Composition) => {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.toLowerCase().indexOf(val) > -1);
            })
        } else {
            this.filteredComp = this.compositions;
        }
    }
}