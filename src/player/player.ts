import { Injectable } from '@angular/core';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { Player as MidiPlayer } from 'midi-player-js';
import { decode, inArray } from '../util/Util';
import { Composition } from './composition';
import * as Soundfont from 'soundfont-player';
declare var verovio: any;


export interface PlayerListener {
    /**
     * @name svgLoaded
     * @description event produced when the svg has been loaded
     * @param {string} svg a svg has been loaded, need to be rendered
     */
    svgLoaded(svg: string): void;

    /**
     * @name initialized
     * @description the player has been initialized
     */
    playerInitialized(): void;
}

@Injectable()
export class Player {
    private vrvToolkit: any = null;
    private options: Options = new Options();
    private ids = [];
    private player;
    private ac = new AudioContext;
    private piano: any = null;
    private startTime: number = 0;

    constructor(private service: PlayerService) {
        ///we create the verovio toolkit
        this.vrvToolkit = new verovio.toolkit();
    }


    /**
     * @name init
     * @description initialize the player
     * @param <Options> options the options of the player
     */
    public init(options) {
        //we merge the options into this.options
        this.options = extend(options, this.options);


        let self = this;
        return new Promise<string>(resolve => {
            //we load the front sheet with verovio
            let promise = this.loadAndRenderScore();
            promise.then((frontsvg: string) => {
                if (self.options.listener != null) {
                    self.options.listener.svgLoaded(frontsvg);
                }
                self.listenResizeEvents();
                self.initMidiPlayer();
                let pmidi = self.loadMidiData();
                pmidi.then((midi => {
                    let pSoundFont = self.loadSoundFont();
                    pSoundFont.then((sdata => {
                        if (self.options.listener != null) {
                            self.options.listener.playerInitialized();
                        }
                    }));
                }));
            });
        });


    }

    /**
     * @name initMidiPlayer
     * @description initialize the midi player
     */
    private initMidiPlayer() {
        // Initialize player and register event handler 
        let self = this;
        this.player = new MidiPlayer(function (event) {
            self.midiUpdate(event);
        });
    }

    /**
     * @name listenResizeEvents
     * @description we listen the resize events to render again
     */
    private listenResizeEvents() {

        const $resizeEvent = Observable.fromEvent(window, 'resize')
            .map(() => {
                return document.documentElement.clientWidth;
            })
            .debounceTime(200)

        let self = this;
        $resizeEvent.subscribe(data => {
            let svg = self.renderScore();
            if (self.options.listener != null) {
                self.options.listener.svgLoaded(svg);
            }
        });
    }

    /**
     * @name loadSoundFont
     * @description load the soundfont to play midi files
     * @return the promise to load the soundfont
     */
    private loadSoundFont(): Promise<void> {
        let self = this;
        return new Promise<string>(resolve => {
            Soundfont.instrument(this.ac, 'acoustic_grand_piano').then(function (piano) {
                self.piano = piano;
                //piano.play('C4');
                resolve();
            });

        });
    }

    /**
     * @name loadFrontSheet
     * @description load and render the front sheet with verovio
     * @return <Promise<string>> a promise to be returned a svg
     */
    private loadAndRenderScore(): Promise<string> {
        if (this.options.scoreData == null) {

            let obs = this.service.downloadBackingTrack();

            let self = this;
            return new Promise<string>(resolve => {
                obs.subscribe((data: string) => {
                    self.options.scoreData = data;
                    let svg = self.renderScore();
                    resolve(svg);
                });
            });

        } else {
            let svg = this.renderScore();
            return new Promise<string>(resolve => {
                resolve(svg);
            });
        }
    }

    /**
     * @name renderScore
     * @description render the frontsheet page with the data loaded previously and return the svg created
     * @return <sring> the svg created
     */
    private renderScore(): string {
        this.setVerovioOptions();
        this.vrvToolkit.loadData(this.options.scoreData);
        let svg = this.vrvToolkit.renderPage(this.options.page, {});
        return svg;
    }

    ///////////////////////////////////////////////////
    /* A function for setting options to the toolkit */
    ///////////////////////////////////////////////////
    private setVerovioOptions() {
        var border = 20;
        var zoom = this.options.zoom;
        var pageHeight = 60000; //SETTED TO THE MAXIMUM//$(self.options.frontDiv).height() - border;
        var pageWidth = document.documentElement.clientWidth * 2 - border;
        //////////////////////////////////////////////////////////////
        /* Adjust the height and width according to the window size */
        //////////////////////////////////////////////////////////////
        //pageHeight = pageHeight * 100 / zoom;
        //pageWidth = pageWidth * 100 / zoom;

        //var page = this.options.page;
        var spacingSystem = 2;
        var format = 'musicxml';//'mei';

        var options = {
            inputFormat: format,
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            border: border,
            scale: zoom,
            font: 'Gootville',
            spacingSystem: spacingSystem,
            adjustPageHeight: 1,
            ignoreLayout: 1
        };
        this.vrvToolkit.setOptions(options);
    }

    /**
     * @name loadMidiData
     * @description load the backingtrack midi file
     * @return <Promise<string>> the promise of the midi data in b64 format
     */
    private loadMidiData(): Promise<void> {
        let obs = this.service.downloadBackingTrackMidi();
        return new Promise<string>(resolve => {
            obs.subscribe((data: ArrayBuffer) => {
                //var b64 = "data:audio/midi;base64," + data;
                this.options.midiData = data;
                resolve();
            });
        });
    }

    /**
     * @name play
     * @description play the music, start the show!
     * @param <number> bpm TODO the bpm to play
     */
    public play(bpm: number) {
        //it is necessary to render to midi in order to get elements at time (.getElementsAtTime)
        var base64midi = this.vrvToolkit.renderToMidi();

        //var abmidi = decode(base64midi);
        //this.player.loadArrayBuffer(abmidi);
        this.player.loadArrayBuffer(this.options.midiData);
        this.player.play();
        this.startTime = new Date().getTime();
    }


    private midiUpdate(event) {

        if (event.name == 'Note on') {
            if (event.track > 2) {
                this.piano.play(event.noteName, this.ac.currentTime, { gain: event.velocity / 100 });
            } else {

                //we calculate the time of this tick
                let tick = event.tick;
                let division = this.player.division;
                let tempo = this.player.tempo;
                let time = tick / division / tempo * 60000;
                time = time + 400; //why is this needed??
                //console.log(time);
                //let time = this.ac.currentTime * 1000;

                //we make a little correction because of bug? of verovio ()
                let bmp: number = 76;
                let verovioDefaultBpm = 120;
                let correction = (bmp / verovioDefaultBpm);
                let newTime = correction * time;
                newTime = newTime - (355 * correction);
                var vrvTime = Math.max(0, newTime);

                //var vrvTime = Math.max(0, 2 * duration - 800);
                var elementsattime = this.vrvToolkit.getElementsAtTime(vrvTime);

                if (elementsattime.page > 0) {
                    if (elementsattime.page != this.options.page) {
                        //let page = elementsattime.page;
                        //load_page();
                    }
                    if ((elementsattime.notes.length > 0) && (this.ids != elementsattime.notes)) {
                        this.ids.forEach(function (noteid) {
                            if (inArray(noteid, elementsattime.notes) == -1) {
                                let element: HTMLElement = document.getElementById(noteid);
                                element.setAttribute("fill", "#000");
                                element.setAttribute("stroke", "#000");
                            }
                        });
                        this.ids = elementsattime.notes;
                        this.ids.forEach(function (noteid) {
                            if (inArray(noteid, elementsattime.notes) != -1) {
                                let element: HTMLElement = document.getElementById(noteid);
                                element.setAttribute("fill", "#c00");
                                element.setAttribute("stroke", "#c00");
                            }
                        });
                    }
                }
            }
        }

    }
}

export class Options {
    /** the composition to be played */
    public composition: Composition = null;
    /* indicates if the backtrack should be played or not */
    public flagPlayBack: boolean = true;
    /* indicates if the fronttrack should be played or not */
    public flagPlayFront: boolean = true;
    /* the front sheet data once loaded */
    public scoreData: string = null;
    /* the back midi data once loaded */
    public midiData: ArrayBuffer = null;
    /* zoom aplied */
    public zoom: number = 50;
    /* page we want to see initially */
    public page: number = 1;
    /** the player listener */
    public listener: PlayerListener = null;

}