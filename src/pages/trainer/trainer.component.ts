import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MusicXMLPlayer, PlayerListener } from '../../player/musicxmlplayer';
import { Composition } from '../../player/composition';
import { PlayerService } from '../../player/player.service';
import { LoadingController, Loading, AlertController, NavController, NavParams } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { App, MenuController, Platform } from 'ionic-angular';
import { DAO } from '../../dao/dao';
import { Settings } from '../../dao/settings';
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
    private composition: Composition = null;
    private loader: Loading = null;
    private playing: number = 0;
    @ViewChild('myknob3') knob: KnobComponent;

    bpm: number = 120;

    constructor(app: App, private menu: MenuController, private insomnia: Insomnia, private loadingCtrl: LoadingController, private nav: NavController,
        navParams: NavParams, private player: MusicXMLPlayer, private _sanitizer: DomSanitizer, private dao: DAO, public platform: Platform) {
        let self = this;
        this.composition = navParams.data;
    }

    public enableMenus() {
        this.menu.enable(true, 'menu-trainer');
    }

    public disableMenus() {
        this.menu.enable(false, 'menu-trainer');
    }


    ionViewDidLeave() {
        this.player.stop();
        this.insomnia.allowSleepAgain();
        this.disableMenus();
        this.nav.getPrevious().willEnter.emit();
    }

    ionViewDidEnter() {
        this.enableMenus();
        this.insomnia.keepAwake();
        this.loader = this.loadingCtrl.create({
            content: "Please wait while creating score..."
        });
        this.loader.present();

        this.player.init({ listener: this, composition: this.composition });
    }

    svgLoaded(svg: string): void {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);
    }

    /**
      * @name setTempo
      * @description set the tempo of the midi loaded
      * @param {number} bpm beats per minute
      */
    setTempo(bpm: number) {
        this.player.setTempo(bpm);
    }

    playerInitialized() {
        this.bpm = this.player.getTempo();
        this.knob.setInitialValue(this.bpm);
        this.loader.dismiss();
    }


    /**
     * @name play
     * @description play or resume the music
     */
    play() {
        if (this.playing == 2) {
            this.resume();
        } else {
            this.playing = 1;
            this.player.play(120);
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
        this.playing = 1;
        this.player.resume();
    }

}
