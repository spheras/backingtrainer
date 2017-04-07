import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition } from '../../../player/composition';
import { Player } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService, Player, PlayerService]
})
export class SearchPage {

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];

    constructor(private service: SearchService, private player: Player, private storage: Storage, private loadingCtrl: LoadingController) {
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
        let midib64 = this.service.downloadMidiB64(comp);
        let score = this.service.downloadScore(comp);
        comp.flagDownloaded=true;
        loader.dismiss();
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