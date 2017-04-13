import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MusicXMLPlayer, PlayerListener } from '../../player/musicxmlplayer';
import { Composition } from '../../player/composition';
import { PlayerService } from '../../player/player.service';
import { LoadingController, Loading, AlertController, NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'trainer.component.html',
    providers: [MusicXMLPlayer, PlayerService]
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

    constructor(private loadingCtrl: LoadingController, navParams: NavParams, private player: MusicXMLPlayer, private _sanitizer: DomSanitizer) {
        this.composition = navParams.data;
    }

    ionViewDidEnter() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait while creating score..."
        });
        this.loader.present();

        this.player.init({ listener: this, composition: this.composition });
    }

    svgLoaded(svg: string): void {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);
    }

    playerInitialized() {
        this.loader.dismiss();
        this.player.play(120);
    }
}
