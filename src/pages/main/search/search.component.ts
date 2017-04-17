import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, AlertController, ModalController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App, MenuController, NavOptions } from 'ionic-angular';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService, MidiPlayer, PlayerService]
})
export class SearchPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];

    constructor(private app: App, private menu: MenuController, private modalCtrl: ModalController, public alertCtrl: AlertController, private service: SearchService, private player: MidiPlayer, private dao: DAO, private loadingCtrl: LoadingController) {
        this.service.getServerIndex().subscribe((compositions) => {
            this.compositions = compositions;
            this.filteredComp = this.compositions;
            this.checkDownloaded();
        });
    }

    ionViewCanEnter(){
        console.log("canenter");
    }
    ionViewDidEnter() {
        console.log("didenter");
    }

    ionViewWillEnter() {
        console.log("willenter");
    }

    ionViewWillLeave() {
        console.log("willleave");
    }

    /**
     * @name checkDownloaded
     * @description check the flag downloaded for those compositions already downloaded
     */
    private checkDownloaded() {
        this.dao.getCompositions().then((downloaded) => {
            for (let i = 0; i < downloaded.length; i++) {
                for (let j = 0; j < this.compositions.length; j++) {
                    if (downloaded[i].id == this.compositions[j].id) {
                        this.compositions[j].flagDownloaded = true;
                    }
                }
            }
        })
    }

    /**
      * @name trainComposition
      * @description train the selected composition
      * @param {number} index the index of the composition selected
      */
    trainComposition(index: number) {
        let comp = this.filteredComp[index];
        this.app.getRootNav().push(TrainerPage, comp, null, function () {
            console.log('done');
        });
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    }

    downloadComposition(index: number) {
        let comp = this.filteredComp[index];
        let loader = this.loadingCtrl.create({
            content: "Please wait while downloading..."
        });
        loader.present();
        let midiPromise = this.service.downloadMidiB64(comp);
        let scorePromise = this.service.downloadScore(comp);

        midiPromise.subscribe((midib64: string) => {
            comp.midiB64Data = midib64;
            scorePromise.subscribe((scorexml: string) => {
                comp.scoreXMLData = scorexml;
                this.dao.saveComposition(comp).then(() => {
                    comp.flagDownloaded = true;
                    loader.dismiss();
                });
            }, error => {
                loader.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Error downloading the score from the Server!',
                    buttons: ['OK']
                });
                alert.present();
            });
        }, error => {
            loader.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error downloading the midi from the Server!',
                buttons: ['OK']
            });
            alert.present();
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