import { Injectable } from '@angular/core';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { MidiPlayer, MidiPlayerListener } from './midiplayer';
import { decode, inArray } from '../util/Util';
import { Composition } from './composition';
import { MusicXML2SVG, FigureBox, ConversionOptions } from './musicxml2svg';
import * as Soundfont from 'soundfont-player';
//vertaal function is the xml2abc library function
declare var vertaal: Function;
declare var $: any;
declare var Abc: any;

/**
 * @interface
 * @name PlayerListener
 * @description listener interface of certains events of the MusicXML2ABCPlayer
 */
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

/**
 * @class
 * @name MusicXMLPlayer
 * @description ABC player wich is able to load musicxml/abc and play it
 */
@Injectable()
export class MusicXMLPlayer implements MidiPlayerListener {
    /**
     * Options of the player
     */
    private options: Options = new Options();
    private midiPlayer: MidiPlayer = null;
    private converter: MusicXML2SVG = null;

    constructor(private service: PlayerService) {
        this.midiPlayer = new MidiPlayer(service);
        this.midiPlayer.setListener(this);
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

            //we load the front sheet and generate the SVG code
            let promiseRender = this.loadAndRenderScore();
            promiseRender.then((frontsvg: string) => {
                //we got the svg
                if (self.options.listener != null) {
                    self.options.listener.svgLoaded(frontsvg);
                }

                //start listening resize events
                self.listenResizeEvents();

                //we load the midi data
                let promiseMidi = self.loadMidiData();
                promiseMidi.then((midi => {

                    //finally, we load the soundfont(s?)
                    let promiseSoundFont = self.midiPlayer.loadSoundFont();
                    promiseSoundFont.then(() => {
                        if (self.options.listener != null) {
                            self.options.listener.playerInitialized();
                        }
                    });
                }));
            });
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
     * @name loadFrontSheet
     * @description load and render the front sheet with verovio
     * @return <Promise<string>> a promise to be returned a svg
     */
    private loadAndRenderScore(): Promise<string> {
        if (this.options.scoreData == null) {

            let obs = this.service.downloadScore();

            let self = this;
            return new Promise<string>(resolve => {
                obs.subscribe((data: string) => {
                    self.options.scoreData = $.parseXML(data);
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
     * @description render the musicxml score into svg
     * @return {string} the svg generated
     */
    private renderScore(): string {
        // options by default
        let coptions = new ConversionOptions();
        this.converter = new MusicXML2SVG(this.options.scoreData, coptions);
        let svg = this.converter.renderScore(document.documentElement.clientWidth);
        return svg;
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
        this.midiPlayer.playMidiData(bpm, this.options.midiData);
    }


    private currentBarline = 0;
    private currentNote = 0;
    private $wijzer: any = null;

    /**
     * @override
     */
    midiUpdate(event) {
        if (event.name == 'Note on') {
            if (event.track > 1) {
                //this.piano.play(event.noteName, this.ac.currentTime, { gain: event.velocity / 100 });
            } else {
                if (event.velocity <= 0) {
                    return;
                }

                let indexBox: number = this.converter.timeLineMap[this.currentNote];
                let figure: FigureBox = this.converter.figureBoxes[indexBox];
                while (figure.type != FigureBox.TYPE_NOTE) {
                    this.currentNote++;
                    indexBox = this.converter.timeLineMap[this.currentNote];
                    figure = this.converter.figureBoxes[indexBox];
                }

                if (this.$wijzer == null || this.currentBarline != figure.barline) {
                    this.currentBarline = figure.barline;
                    if (this.$wijzer != null) {
                        this.$wijzer.remove();
                    }
                    this.$wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
                    $("svg > g").eq(this.currentBarline).prepend(this.$wijzer);
                }

                this.$wijzer.attr("x", "" + (figure.x)); //+ (info.x - info.w + 75.87));
                this.$wijzer.attr("y", "" + (figure.y));//(info.y + info.h));// + 112.7));
                this.$wijzer.attr("width", "" + figure.w);
                this.$wijzer.attr("height", "" + figure.h);
                this.$wijzer.attr("fill", "red");
                this.$wijzer.attr("fill-opacity", "0.5");

                this.currentNote++;
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