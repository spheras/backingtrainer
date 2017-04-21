import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { MidiPlayer, MidiPlayerListener } from './midiplayer';
import { Composition } from './composition';
import { DAO } from '../dao/dao';
import { Settings } from '../dao/settings';
import { MusicXML2SVG, FigureBox, ConversionOptions } from './musicxml2svg';
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

    /**
     * @name endOfSong
     * @description the player has ended the song
     */
    endOfSong(): void;
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
    /** the midi player */
    private midiPlayer: MidiPlayer = null;
    /** the musicxml to svg converter */
    private converter: MusicXML2SVG = null;

    constructor(private service: PlayerService, private dao: DAO, private platform: Platform,
        private loadingCtrl: LoadingController, private translate: TranslateService) {
        this.midiPlayer = new MidiPlayer(service, platform);
        this.midiPlayer.setListener(this);
        this.dao.getSettings().then((settings) => {
            this.updateSettings(settings);
        });
        this.dao.observeSettings().subscribe((settings) => {
            this.updateSettings(settings);
        });
    }

    /**
     * @name getMeterSignatureNumerator
     * @description return the meter signature numerator of the score
     * @return {number} the numerator (num/dem)
     */
    public getMeterSignatureNumerator(): number {
        return this.converter.numerator;
    }

    /**
     * @name updateSettings
     * @description  Updating the settings that affect to the player
     * @param {Settings} settings the new settings
     */
    private updateSettings(settings: Settings) {
        //checking if we have changed the play soloist paremeter
        if (settings.playerSettings.playSoloist) {
            this.midiPlayer.unmuteTracks();
        } else {
            this.midiPlayer.muteTrack(1);
        }

        //checking if we have changed the sound quality config
        if (MidiPlayer.isLowQuality() == settings.playerSettings.highQualitySound) {
            let loader = this.loadingCtrl.create({
                content: this.translate.instant("TRAINER-WAIT-AUDIO")
            });
            this.midiPlayer.setQuality(!settings.playerSettings.highQualitySound).then(() => {
                loader.dismiss();
            });
        }
    }

    /**
     * @name getTempo
     * @description return the tempo of the midi loaded
     * @return {number} the tempo (bpm)
     */
    public getTempo(): number {
        return this.midiPlayer.getTempo();
    }

    /**
      * @name setTempo
      * @description set the tempo of the midi loaded
      * @param {number} bpm beats per minute
      */
    public setTempo(bpm: number) {
        this.midiPlayer.setTempo(bpm);
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
            this.loadAndRenderScore(this.options.composition).then((frontsvg: string) => {
                //we got the svg
                if (self.options.listener != null) {
                    self.options.listener.svgLoaded(frontsvg);
                }

                //start listening resize events
                self.listenResizeEvents();

                //we load the midi data
                self.loadMidiData(this.options.composition).then((midi => {
                    //finally, we load the soundfont(s?)
                    self.midiPlayer.loadSoundFont().then(() => {
                        this.findTempo().then((bpm) => {
                            if (self.options.listener != null) {
                                self.options.listener.playerInitialized();
                            }
                        });
                    });
                }));
            });
        });


    }

    /**
     * @name findTempo
     * @description internal function to load the midi and find the tempo info
     */
    private findTempo(): Promise<number> {
        return this.midiPlayer.findTempo();
    }


    /**
     * @name listenResizeEvents
     * @description we listen the resize events to render again
     */
    private listenResizeEvents() {
/*
        const $resizeEvent = Observable.fromEvent(window, 'resize')
            .map(() => {
                return document.documentElement.clientWidth - 20;
            })
            .debounceTime(200)

        let self = this;
        $resizeEvent.subscribe(data => {
            let svg = self.renderScore();
            if (self.options.listener != null) {
                self.options.listener.svgLoaded(svg);
                self.options.listener.playerInitialized();
            }
        });
        */
    }

    /**
     * @name loadAndRenderScore
     * @description load and render the front sheet
     * @param {Composition} comp the composition info to render
     * @return <Promise<string>> a promise to be returned a svg
     */
    private loadAndRenderScore(comp: Composition): Promise<string> {
        if (this.options.scoreData == null) {

            let obs = this.service.getScore(comp);

            let self = this;
            return new Promise<string>(resolve => {
                obs.then((data: string) => {
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
        let svg = this.converter.renderScore(document.documentElement.clientWidth - 40);
        return svg;
    }

    /**
     * @name loadMidiData
     * @description load the backingtrack midi file
     * @return <Promise<void>> the promise of the midi data
     */
    private loadMidiData(comp: Composition): Promise<void> {
        let obs = this.service.getMidi(comp);
        return new Promise<void>(resolve => {
            obs.then((data: ArrayBuffer) => {
                this.midiPlayer.loadMidiData(data);
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
        this.midiPlayer.play(bpm);
    }

    /**
     * @name pause
     * @description pause the music
     */
    public pause() {
        this.midiPlayer.pause();
    }

    /**
     * @name stop
     * @description stop the music
     */
    public stop() {
        this.currentBarline = 0;
        this.currentNote = 0;
        if (this.$wijzer != null) {
            this.$wijzer.remove();
            this.$wijzer = null;
        }
        this.midiPlayer.stop();
        $('.scroll-content').animate({ scrollTop: 0 }, 1000);
    }

    /**
     * @name resume
     * @description resume the music
     */
    public resume() {
        this.midiPlayer.resume();
    }

    private currentBarline = 0;
    private currentNote = 0;
    private $wijzer: any = null;

    /**
     * @override
     */
    midiUpdate(event) {
        if (event.name == 'End of Track') {
            //finish?
            if (this.options.listener != null) {
                this.options.listener.endOfSong();
            }
            return;
        } else if (event.name == 'Note on') {
            if (event.track == 1) {
                if (event.velocity <= 0) {
                    return;
                }

                //first we get the figurebox to be highlighted
                let indexBox: number = this.converter.timeLineMap[this.currentNote];
                let figure: FigureBox = this.converter.figureBoxes[indexBox];
                while (figure.type != FigureBox.TYPE_NOTE || figure.ligato) {
                    this.currentNote++;
                    indexBox = this.converter.timeLineMap[this.currentNote];
                    figure = this.converter.figureBoxes[indexBox];
                }

                //next we create the focus rectangle 
                if (this.$wijzer == null || this.currentBarline != figure.barline) {
                    this.currentBarline = figure.barline;
                    if (this.$wijzer != null) {
                        this.$wijzer.remove();
                    }
                    this.$wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
                    this.$wijzer.attr({ "fill": "#387ef5", "fill-opacity": (this.dao.settingsCache.playerSettings.cursor ? "0.5" : "0") });
                    $("svg > g").eq(this.currentBarline).prepend(this.$wijzer);
                }

                //lets prepare next cursor
                let nextFigure: FigureBox = this.getNextFigure(this.currentNote, 1);
                if (nextFigure != null && this.currentBarline != nextFigure.barline) {
                    var y = 0;
                    var svgs = $("svg > g");
                    //FIXME, calculate the absolute position not working, why!?
                    for (var isvg = 0; isvg <= nextFigure.barline; isvg++) {
                        y = y + svgs[isvg].getBoundingClientRect().height;
                    }
                    let svgHeight = svgs[figure.barline].getBoundingClientRect().height;
                    if (this.dao.settingsCache.playerSettings.cursorAnimation) {
                        $('.scroll-content').animate({ scrollTop: y - svgHeight - 50 }, 200);
                    } else {
                        $('.scroll-content').scrollTop(y - svgHeight - 50);
                    }
                }

                //we position correctly the focus rectangle
                this.$wijzer.attr({
                    "x": "" + (figure.x),
                    "y": "" + (figure.y),
                    "width": "" + figure.w,
                    "height": "" + figure.h
                });


                this.currentNote++;
            }
        }

    }

    /**
     * @name getNextFigure
     * @description return the next figure to play
     * @param {number} indexBox the indexBox to start searching
     * @param {number} count the count to define 'next' figure
     * @return {FigureBox} the figurebox found or null
     */
    private getNextFigure(currentNote: number, count: number): FigureBox {
        let icount: number = 0;
        currentNote++;
        while (icount < count) {
            if (currentNote >= this.converter.timeLineMap.length) {
                return null;
            }
            let indexBox: number = this.converter.timeLineMap[currentNote];
            let nextFigure: FigureBox = this.converter.figureBoxes[indexBox];
            if (nextFigure.type == FigureBox.TYPE_NOTE && !nextFigure.ligato) {
                icount++;
            }
            currentNote++;
        }
        if (count == icount) {
            let indexBox: number = this.converter.timeLineMap[currentNote];
            let nextFigure: FigureBox = this.converter.figureBoxes[indexBox];
            return nextFigure;
        } else {
            return null;
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
    /* zoom aplied */
    public zoom: number = 50;
    /* page we want to see initially */
    public page: number = 1;
    /** the player listener */
    public listener: PlayerListener = null;

}