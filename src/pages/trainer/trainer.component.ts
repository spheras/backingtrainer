import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MusicXMLPlayer, PlayerListener } from '../../player/musicxmlplayer';
import { Composition } from '../../player/composition';
import { PlayerService } from '../../player/player.service';
import { LoadingController, Loading, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Insomnia } from '@ionic-native/insomnia';
import { MenuController } from 'ionic-angular';
import { DAO } from '../../dao/dao';
import { KnobComponent } from 'ng2-knob';

@Component({
    templateUrl: 'trainer.component.html',
    providers: [MusicXMLPlayer, PlayerService, Insomnia]
})

/**
 * @class
 * @name PlayerPage
 * @description Page to play a backing track
 */
export class TrainerPage implements PlayerListener {
    svgContent: SafeHtml;
    tempo: number = 0;

    prepare: number = -1;

    private composition: Composition = null;
    private loader: Loading = null;
    private playing: number = 0;

    @ViewChild('myknob3') knob: KnobComponent;

    constructor(private appref: ApplicationRef, private menu: MenuController, private insomnia: Insomnia,
        navParams: NavParams, private player: MusicXMLPlayer, private _sanitizer: DomSanitizer, private dao: DAO,
        private loadingCtrl: LoadingController, private translate: TranslateService) {

        //we get from the params the composition we want to train
        this.composition = navParams.data;
    }

    public enableMenus() {
        this.menu.enable(true, 'menu-trainer');
    }

    public disableMenus() {
        this.menu.enable(false, 'menu-trainer');
    }

    ionViewDidLeave() {
        //stopping the player
        this.player.stop();
        //allowing to sleep again the device
        this.insomnia.allowSleepAgain();
        //disabling my menus
        this.disableMenus();
        //this.nav.getPrevious().willEnter.emit();
    }

    ionViewDidEnter() {
        //enabling my menus
        this.enableMenus();
        //we can't go to sleep now
        this.insomnia.keepAwake();

        //lets start loading
        this.loader = this.loadingCtrl.create({
            content: this.translate.instant("TRAINER-WAIT-SCORE")
        });
        this.loader.present();

        this.player.init({ listener: this, composition: this.composition });
    }

    /**
     * @name svgLoaded
     * @description The SVG has been generated
     * @param {string} svg the svg created
     * @override
     */
    svgLoaded(svg: string): void {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);

        this.loader.dismiss();
        this.loader = this.loadingCtrl.create({
            content: this.translate.instant("TRAINER-WAIT-AUDIO")
        });
        this.loader.present();
    }


    /**
     * @name playerInitialized
     * @description the player has been initialized
     * @override
     */
    playerInitialized() {
        let bpm = this.player.getTempo();
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
        //----------------------------------------

        this.knob.setInitialValue(bpm);
        this.loader.dismiss();
    }

    /**
     * @name endOfSong
     * @description the player has finished
     * @override
     */
    endOfSong() {
        this.stop();
    }

    /**
      * @name setTempo
      * @description set the tempo of the midi loaded
      * @param {number} bpm beats per minute
      */
    setTempo(bpm: number) {
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
        //----------------------------------------

        this.player.setTempo(bpm);
    }

    /**
     * @name play
     * @description play or resume the music
     */
    play() {
        if (this.playing == 2) {
            this.resume();
        } else {
            this.showPrepare().then(() => {
                this.playing = 1;
                this.player.play(120);
            });
        }
    }

    /**
     * @name pause
     * @description pause the music
     */
    pause() {
        this.playing = 2;
        this.player.pause();
    }

    /**
     * @name stop
     * @description stop the music
     */
    stop() {
        this.playing = 0;
        this.player.stop();
    }

    /**
     * @name resume
     * @description resume the music
     */
    resume() {
        this.showPrepare().then(() => {
            this.playing = 1;
            this.player.resume();
        });
    }

    /**
     * @name showPrepare
     * @description show the prepare screen, before starting the music
     * @return {Promise<void>} resolve when all the preparation has been finished 
     */
    private showPrepare(): Promise<void> {
        return new Promise<void>((resolve) => {
            let numerator = this.player.getMeterSignatureNumerator();
            let bpm = this.player.getTempo(); //bpm
            let time: number = 60000 / bpm;

            this.prepare = 0;
            let self = this;
            this.dao.getSettings().then((settings) => {
                let double: boolean = settings.playerSettings.doublePreparation;
                let cycle = 0;

                let show = function () {
                    self.prepare++;

                    if (self.prepare > numerator && double && cycle < 1) {
                        cycle++;
                        self.prepare = 1;
                        setTimeout(show, time);
                    } else if (self.prepare <= numerator) {
                        setTimeout(show, time);
                    } else {
                        self.prepare = -1;
                        resolve();
                    }
                };

                setTimeout(show, 1000);

            });
        });
    }

}
