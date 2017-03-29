import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { Observable } from 'rxjs';
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
export class TrainerPage {
    svgContent: SafeHtml;

    constructor(private player: Player, private _sanitizer: DomSanitizer) {
        let obs = player.getBackingTrackSVG();
        obs.then((data) => {
            this.svgContent = this._sanitizer.bypassSecurityTrustHtml(data);
        });
    }
}
