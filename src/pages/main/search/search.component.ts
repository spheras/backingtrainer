import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService, MidiPlayer, PlayerService, DAO]
})
export class SearchPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];

    constructor(public alertCtrl: AlertController, private service: SearchService, private player: MidiPlayer, private dao: DAO, private loadingCtrl: LoadingController) {
        this.service.getServerIndex().subscribe((compositions) => {
            this.compositions = compositions;
            this.filteredComp = this.compositions;
        });
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
        this.player.play("assets/data/" + comp.midiURL);
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