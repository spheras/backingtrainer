import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Player, PlayerListener } from '../../player/player';
import { Composition } from '../../player/composition';
import { PlayerService } from '../../player/player.service';
declare var verovio: any;


@Component({
    templateUrl: 'trainer.component.html',
    providers: [Player, PlayerService]
})

/**
 * @class
 * @name PlayerPage
 * @description Page to play a backing track
 */
export class TrainerPage implements OnInit, PlayerListener {
    svgContent: SafeHtml;

    constructor(private player: Player, private _sanitizer: DomSanitizer) {
        let comp = new Composition(); //temporal
        player.init({ listener: this, composition: comp });
    }

    ngOnInit(): void {
    }

    svgLoaded(svg: string): void {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);
    }

    playerInitialized() {
        this.player.play(120);
    }
}
