import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition, Collection } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, AlertController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App } from 'ionic-angular';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService, MidiPlayer, PlayerService]
})
export class SearchPage {

    type: string = "compositions";

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];
    private collections: Collection[] = [];
    private filteredCollections: Collection[] = [];

    constructor(private app: App, public alertCtrl: AlertController, private service: SearchService,
        private player: MidiPlayer, private dao: DAO, private loadingCtrl: LoadingController) {

        //first we get the compositions
        this.service.getServerCompositionIndex().subscribe((compositions) => {
            this.compositions = compositions;
            this.filteredComp = this.compositions;
            this.checkDownloaded();
        });

        //second we get the collections
        this.service.getServerCollectionIndex().subscribe((collections) => {
            this.collections = collections;
            this.filteredCollections = this.collections;
            this.checkDownloaded();
        });
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
     * @param <number> indexComposition the index of the composition to be trained
     * @param <number> indexCollection (optional) the index of the collection to be trained
      */
    trainComposition(indexComposition: number, indexCollection?:number) {
        let comp = null;
        if (indexCollection) {
            let coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        } else {
            comp = this.filteredComp[indexComposition];
        }

        this.dao.addRecent(comp);
        this.app.getRootNav().push(TrainerPage, comp, null, function () {
            //console.log('done');
        });
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    }

    /**
     * @name downloadComposition
     * @description download an existing composition
     * @param <number> indexComposition the index of the composition to be downloaded
     * @param <number> indexCollection (optional) the index of the collection to be downloaded
     */
    downloadComposition(indexComposition: number, indexCollection?: number) {
        let comp = null;
        if (indexCollection) {
            let coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        } else {
            comp = this.filteredComp[indexComposition];
        }

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
     * @param <number> indexComposition the index of the composition to be stopped
     * @param <number> indexCollection (optional) the index of the collection to be stopped
     */
    stopMidi(indexComposition: number, indexCollection?: number) {
        let comp = null;
        if (indexCollection) {
            let coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        } else {
            comp = this.filteredComp[indexComposition];
        }
        comp.flagPlaying = false;
        this.player.stop();
    }

    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param <number> indexComposition the index of the composition to be played
     * @param <number> indexCollection (optional) the index of the collection to be played
     */
    playMidi(indexComposition: number, indexCollection?: number) {
        let comp = null;
        if (indexCollection) {
            let coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        } else {
            comp = this.filteredComp[indexComposition];
        }
        this.player.stop();
        comp.flagPlaying = true;
        this.player.load(comp).then(() => {
            this.player.play();
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
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            })
        } else {
            this.filteredComp = this.compositions;
        }

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredCollections = this.collections.filter((item: Collection) => {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.instrument.toLowerCase().indexOf(val) > -1);
            })
        } else {
            this.filteredCollections = this.collections;
        }
    }

    expandCollection(index: number) {
        let col = this.filteredCollections[index];
        col.flagExpanded = !col.flagExpanded;

        if (col.flagExpanded && !col.compositions) {
            col.compositions = [];
            for (let i = 0; i < col.compositionIds.length; i++) {
                let id = col.compositionIds[i];
                for (let j = 0; j < this.compositions.length; j++) {
                    if (id == this.compositions[j].id) {
                        col.compositions.push(this.compositions[j]);
                        break;
                    }
                }
            }
        }
    }
}