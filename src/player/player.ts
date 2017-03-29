import { Injectable } from '@angular/core';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
declare var verovio: any;


@Injectable()
export class Player {
    private vrvToolkit: any = null;
    private options: Options = new Options();

    constructor(private service: PlayerService) {
        ///we create the verovio toolkit
        this.vrvToolkit = new verovio.toolkit();
    }


    /**
     * @name init
     * @description initialize the player
     * @param options TODO
     * @param onSuccess  TODO
     */
    public init(options: Options, onSuccess) {
        //we merge the options into this.options
        extend(options, this.options);
    }

    /**
     * Return a demo svg TODO
     */
    public getBackingTrackSVG(): Promise<string> {
        let obs = this.service.downloadBackingTrack();
        return new Promise<string>(resolve => {
            obs.subscribe((data: string) => {
                var svg = this.vrvToolkit.renderData(data, {});
                resolve(svg);
            });
        });
    }

}

//TODO
export class Options {
    /* indicates if the backtrack should be played or not */
    public flagPlayBack: boolean = true;
    /* indicates if the fronttrack should be played or not */
    public flagPlayFront: boolean = true;
    /* div where the front staves will be engraved*/
    public frontDiv: any = null;
    /* url where can be found the .musicxml for the fronttrack */
    public frontSheetURL: string = "";
    /* the front sheet data once loaded */
    public frontSheetData: any = null;
    /* url where can be found the .midi file for the backtrack */
    public backMidiURL: string = "";
    /* the back midi data once loaded */
    public backMidiData: any = null;
    /* zoom aplied */
    public zoom: number = 100;
    /* page we want to see initially */
    public page: number = 1;
}