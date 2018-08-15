import { Component } from '@angular/core';
import { Composition } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { MP3Player } from '../../../player/mp3player';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, PopoverController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App } from 'ionic-angular';
import { SortPage } from '../sort/sort.component';

@Component({
    templateUrl: './downloaded.component.html',
    providers: [MidiPlayer, PlayerService, MP3Player]
})
export class DownloadedPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];
    private lastCompositionsSearch: string = "";
    private sortby: string = SortPage.SORT_BY_NAME;

    constructor(private app: App, private midiPlayer: MidiPlayer, private mp3Player: MP3Player,
        private dao: DAO, private loadingCtrl: LoadingController, public popoverCtrl: PopoverController, ) {
    }

    public enableMenus() {
    }

    public disableMenus() {
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
        return new Promise<void>(resolve => {
            this.dao.getCompositions().then((compositions) => {
                this.compositions = compositions;
                this.filteredComp = this.compositions;
                this.filterCompositions(this.lastCompositionsSearch);
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
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
    }

    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param <number> index the index to be played
     */
    playMidi(index: number) {
        let comp = this.filteredComp[index];

        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
        comp.flagPlaying = true;

        if (comp.mp3URL && comp.mp3URL.length > 0) {
            let url = PlayerService.dataUrl1 + '/[' + comp.id + ']-' + comp.mp3URL;
            this.mp3Player.init(url).then(() => {
                this.midiPlayer.load(comp).then(() => {
                    this.mp3Player.play();
                    this.midiPlayer.play();
                });
            });
        } else {
            this.midiPlayer.load(comp).then(() => {
                this.midiPlayer.play();
            });
        }
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
        this.dao.addRecent(comp);
        this.app.getRootNav().push(TrainerPage, comp);
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    }


    onSortPopup(myEvent) {
        let popover = this.popoverCtrl.create(SortPage, { data: this.sortby });
        popover.present({
            ev: myEvent
        }).then((value) => {
            //nothing
        });

        popover.onWillDismiss((data) => {
            this.sortby = data;
            this.filterCompositions(this.lastCompositionsSearch);
        });
    }

    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param <string> val the value to filter
     */
    filterCompositions(val: string) {
        this.lastCompositionsSearch = val;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredComp = this.compositions.filter((item: Composition) => {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            })
        } else {
            this.filteredComp = this.compositions;
        }

         //before continue, sorting the compositions properly
         this.sortCompositions();
    }

    /**
     * @name sortCompositions
     * @description sort the compositions by name, author, level and instrument
     */
    sortCompositions() {
        this.filteredComp = SortPage.sort(this.sortby, this.filteredComp);
    }
}