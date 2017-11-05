import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition, Collection } from '../../../player/composition';
import { MidiPlayer } from '../../../player/midiplayer';
import { MP3Player } from '../../../player/mp3player';
import { PlayerService } from '../../../player/player.service';
import { DAO } from '../../../dao/dao';
import { LoadingController, AlertController } from 'ionic-angular';
import { TrainerPage } from '../../trainer/trainer.component';
import { App } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { Settings } from '../../../dao/settings';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService, MidiPlayer, PlayerService, MP3Player]
})
export class SearchPage {

    type: string = "compositions";

    private compositions: Composition[] = [];
    private filteredComp: Composition[] = [];
    private collections: Collection[] = [];
    private filteredCollections: Collection[] = [];
    private daoSubscription: Subscription = null;
    private settings: Settings;
    private lastCompositionsSearch: string = "";

    constructor(private app: App, public alertCtrl: AlertController, private service: SearchService,
        private midiPlayer: MidiPlayer, private mp3Player: MP3Player, private dao: DAO, private loadingCtrl: LoadingController) {

        this.dao.getSettings().then((settings) => {
            this.settings = settings;
        });
        this.daoSubscription = this.dao.observeSettings().subscribe((settings) => {
            this.settings = settings;
            this.filterCompositions(this.lastCompositionsSearch);
        });

        //first we get the compositions
        this.service.getServerCompositionIndex().subscribe((compositions) => {
            this.compositions = compositions;
            this.filteredComp = this.compositions;
            this.dao.getSettings().then((settings) => {
                this.settings = settings;
                this.filterCompositions("");
                this.checkDownloaded();
            });
        });

        //second we get the collections
        this.service.getServerCollectionIndex().subscribe((collections) => {
            this.collections = collections;
            this.filteredCollections = this.collections;
            this.dao.getSettings().then((settings) => {
                this.settings = settings;
                this.filterCompositions("");
                this.checkDownloaded();
            });
        });


    }

    ionViewDidLeave() {
        //settings unsubscription
        if (this.daoSubscription != null) {
            this.daoSubscription.unsubscribe();
        }
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
     * @param {number} indexComposition the index of the composition to be trained
     * @param {number} indexCollection (optional) the index of the collection to be trained
      */
    trainComposition(indexComposition: number, indexCollection?: number) {
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
     * @param {number} indexComposition the index of the composition to be downloaded
     * @param {number} indexCollection (optional) the index of the collection to be downloaded
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
     * @param {number} indexComposition the index of the composition to be stopped
     * @param {number} indexCollection (optional) the index of the collection to be stopped
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
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
    }

    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param {number} indexComposition the index of the composition to be played
     * @param {number} indexCollection (optional) the index of the collection to be played
     */
    playMidi(indexComposition: number, indexCollection?: number) {
        let comp = null;
        if (indexCollection) {
            let coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        } else {
            comp = this.filteredComp[indexComposition];
        }
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

    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param {string} val the value to filter
     */
    filterCompositions(val: string) {
        this.lastCompositionsSearch = val;
        // if the value is an empty string don't filter the items
        val = val.toLowerCase();
        this.filteredComp = this.compositions.filter((item: Composition) => {
            if (!this.isValidInstrument(item.frontInstrument.name)) {
                return false;
            }
            if (val && val.trim().length > 0) {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            } else {
                return true;
            }
        })

        this.sortCompositions();

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredCollections = this.collections.filter((item: Collection) => {
                if (!this.isValidInstrument(item.instrument)) {
                    return false;
                }
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.instrument.toLowerCase().indexOf(val) > -1);
            })
        } else {
            this.filteredCollections = this.collections;
        }
    }

    /**
     * @name isValidInstrument
     * @description check if a certain instrument is valid in terms of is can be showed or not
     * @param {string} name the name of the instrument
     * @return {boolean} true if it can be showed
     */
    private isValidInstrument(name: string): boolean {
        name = name.toLowerCase();
        if (this.settings) {
            if (this.settings.filterSettings) {
                if (!this.settings.filterSettings.clarinet && name == "clarinet") {
                    return false;
                }
                if (!this.settings.filterSettings.flute && name == "flute") {
                    return false;
                }
                if (!this.settings.filterSettings.record && name == "record") {
                    return false;
                }
                if (!this.settings.filterSettings.saxophone && name == "saxophone") {
                    return false;
                }
                if (!this.settings.filterSettings.trumpet && name == "trumpet") {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * @name sortCompositions
     * @description sort the compositions by name, author, level and instrument
     */
    sortCompositions() {
        //por nombre del tema
        //por nombre del autor
        //por nivel
        //por instrumento
        this.filteredComp = this.filteredComp.sort(function (a: Composition, b: Composition): number {
            if (a.name === b.name) {
                if (a.author == b.author) {
                    if (a.level == b.level) {
                        if (a.frontInstrument.name == b.frontInstrument.name) return 0;
                        if (a.frontInstrument.name < b.frontInstrument.name) return -1;
                        if (a.frontInstrument.name > b.frontInstrument.name) return 1;
                    } else {
                        if (a.level < b.level) return -1;
                        if (a.level > b.level) return 1;
                    }
                } else {
                    if (a.author < b.author) return -1;
                    if (a.author > b.author) return 1;
                }
            } else {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
            }
            return 1;
        });
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