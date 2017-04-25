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
import { Observable, Subscription } from 'rxjs/Rx';

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

    private STATE_STOP = 0;
    private STATE_PLAYING = 1;
    private STATE_PAUSED = 2;

    private composition: Composition = null;
    private loader: Loading = null;
    private state: number = 0;
    private flagRendering: boolean = false;

    private daoSubscription: Subscription = null;
    private resizeSubscription: Subscription = null;

    @ViewChild('myknob1') knob: KnobComponent;

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

        //settings unsubscription
        if (this.daoSubscription != null) {
            this.daoSubscription.unsubscribe();
        }
        //resize unsubscription
        if (this.resizeSubscription != null) {
            this.resizeSubscription.unsubscribe();
        }
    }

    /**
     * @name listenResizeEvents
     * @description we listen the resize events to render again
     */
    private listenResizeEvents() {
        const $resizeEvent = Observable.fromEvent(window, 'resize').debounceTime(200);

        let self = this;
        this.resizeSubscription = $resizeEvent.subscribe(data => {
            if (!this.flagRendering) {
                this.flagRendering = true;
                if (this.state == this.STATE_PLAYING) {
                    self.pause();
                }

                this.loader = this.loadingCtrl.create({
                    content: this.translate.instant("TRAINER-WAIT-SCORE")
                });
                this.loader.present().then((value) => {
                    this.player.loadAndRenderScore(this.composition).then((svg) => {
                        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);
                        this.flagRendering = false;
                        this.loader.dismiss();
                    });
                });
            }
        });
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
        this.loader.present().then((value) => {
            this.flagRendering = true;

            this.listenResizeEvents();
            this.dao.getSettings().then((settings) => {
                this.player.init(this.composition, this, settings);
            });


            this.daoSubscription = this.dao.observeSettings().subscribe((settings) => {
                this.player.updateSettings(settings);
            });

        });
    }

    /**
     * @name svgLoaded
     * @description The SVG has been generated
     * @param {string} svg the svg created
     * @override
     */
    svgLoaded(svg: string): void {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);

        /*
        this.loader.dismiss();
        this.loader = this.loadingCtrl.create({
            content: this.translate.instant("TRAINER-WAIT-AUDIO")
        });
        this.loader.present();
        */
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
        this.flagRendering = false;
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
        if (this.state == this.STATE_PAUSED) {
            this.resume();
        } else if (this.state == this.STATE_STOP) {
            this.showPrepare().then(() => {
                this.state = 1;
                this.player.play(120);
            });
        }
    }

    /**
     * @name pause
     * @description pause the music
     */
    pause() {
        if (this.state == this.STATE_PLAYING) {
            this.state = this.STATE_PAUSED;
            this.player.pause();
        }
    }

    /**
     * @name stop
     * @description stop the music
     */
    stop() {
        if (this.state == this.STATE_PAUSED || this.state == this.STATE_PLAYING) {
            this.state = this.STATE_STOP;
            this.player.stop();
            //seems necesary in android
            this.appref.tick();
        }
    }

    /**
     * @name resume
     * @description resume the music
     */
    resume() {
        this.showPrepare().then(() => {
            this.state = this.STATE_PLAYING;
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
