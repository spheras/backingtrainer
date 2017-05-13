import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { PlayerService } from './player.service';
import { MidiPlayer, MidiPlayerListener, MidiInfo } from './midiplayer';
import { MP3Player } from './mp3player';
import { Composition } from './composition';
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
    /** the midi player */
    private midiPlayer: MidiPlayer = null;
    /** the mp3 player */
    private mp3Player: MP3Player = null;
    /** the musicxml to svg converter */
    private converter: MusicXML2SVG = null;
    /** the composition to play */
    private composition: Composition = null;
    /** the listener to notify */
    private listener: PlayerListener = null;
    /** the current settings */
    private settings: Settings = null;
    /** the current midi info */
    private midiInfo: MidiInfo = null;

    constructor(private service: PlayerService, private platform: Platform,
        private loadingCtrl: LoadingController, private translate: TranslateService) {
        this.midiPlayer = new MidiPlayer(service, platform);
        this.mp3Player = new MP3Player(service, platform);
        this.midiPlayer.setListener(this);
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
    public updateSettings(settings: Settings) {
        this.settings = settings;
        //checking if we have changed the play soloist paremeter
        this.muteSoloist(!this.settings.playerSettings.playSoloist);
        //checking if we have changed the play back paremeter
        this.muteBack(!this.settings.playerSettings.playBack);
        //setting metronome
        this.midiPlayer.setMetronome(this.settings.playerSettings.metronome);
    }

    /**
     * @name prepare
     * @description prepare the midi player to start playing
     */
    public prepare() {
        this.midiPlayer.prepare();
    }

    /**
     * @name muteSoloist
     * @description mute or unmute the soloist track
     * @param {boolean} mute if we want to mute or unmute
     */
    private muteSoloist(mute: boolean) {
        if (mute) {
            this.midiPlayer.muteTrack(this.composition.frontInstrument.track);
            if (this.composition.frontInstrument.help >= 0) {
                this.midiPlayer.muteTrack(this.composition.frontInstrument.help);
            }
        } else {
            this.midiPlayer.unmuteTrack(this.composition.frontInstrument.track);
            if (this.composition.frontInstrument.help >= 0) {
                this.midiPlayer.unmuteTrack(this.composition.frontInstrument.help);
            }
        }
    }

    /**
     * @name isMP3BackingTrack
     * @description check if the composition has an mp3 backing track
     * @return {boolean} true if the composition backing track is mp3 based
     */
    private isMP3BackingTrack(): boolean {
        return this.composition.mp3URL && this.composition.mp3URL.length > 0;
    }

    /**
     * @name muteBack
     * @description mute or unmute the backing track
     * @param {boolean} mute if we want to mute or unmute
     */
    private muteBack(mute: boolean) {
        if (mute) {
            if (this.isMP3BackingTrack()) {
                this.mp3Player.mute(mute);
            } else {
                for (let i = 0; i < this.composition.backInstruments.length; i++) {
                    this.midiPlayer.muteTrack(this.composition.backInstruments[i].track);
                }
            }
        } else {
            if (this.isMP3BackingTrack()) {
                this.mp3Player.mute(mute);
            } else {
                for (let i = 0; i < this.composition.backInstruments.length; i++) {
                    this.midiPlayer.unmuteTrack(this.composition.backInstruments[i].track);
                }
            }
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
     */
    public init(composition: Composition, listener: PlayerListener, settings: Settings) {
        this.composition = composition;
        this.listener = listener;
        this.updateSettings(settings);

        return new Promise<string>(resolve => {

            //we load the front sheet and generate the SVG code
            this.loadAndRenderScore(this.composition).then((frontsvg: string) => {
                //we got the svg
                if (this.listener != null) {
                    this.listener.svgLoaded(frontsvg);
                }
                //loading mp3, midi data, soundfonts and tempo
                Promise.all([this.loadMP3Data(this.composition),
                this.loadMidiData(this.composition)]).then(() => {
                    //we need to load midi before creating a map
                    Promise.all([
                        this.midiPlayer.loadSoundFonts(this.composition),
                        this.createMap()]).then(() => {
                            if (this.listener != null) {
                                this.listener.playerInitialized();
                            }
                        });
                })
            });
        });


    }

    /**
     * @name loadMP3Data
     * @description load the mp3 data backing track
     * @param {Composition} composition the composition to load
     */
    private loadMP3Data(composition: Composition): Promise<void> {
        if (this.isMP3BackingTrack()) {
            let url = PlayerService.dataUrl1 + '/[' + composition.id + ']-' + composition.mp3URL;
            /*
            return new Promise<void>((resolve) => {
                this.service.getMP3(url).then((data: string) => {
                    this.mp3Player.reset();
                    return this.mp3Player.init('data:audio/mp3;base64,' + data).then(() => {
                        resolve();
                    });
                });
            });*/
            return this.mp3Player.init(url);
        } else {
            return Promise.resolve();
        }
    }

    /**
     * @name crateMap
     * @description internal function to load the midi and create a map of the music
     * @return {Promise<void>} the promise to create a map
     */
    private createMap(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.midiPlayer.createMap(this.composition.frontInstrument.track).then((midiInfo: MidiInfo) => {
                this.midiInfo = midiInfo;
                resolve();
            });
        });
    }

    /**
     * @name svgPoint
     * @description translate page to SVG coordinates
     * @param {any} svgGraphicElement the g element inside the SVG to transform the coordinates
     * @param {number} x the x position relative to the svg
     * @param {number} y the y position relative to the svg
     */
    private svgPoint(svgGraphicElement: any, x: number, y: number) {
        /*
        if (!svgGraphicElement.parent()[0].createSVGPoint) {
            console.log("why");
        }
        */
        var pt = svgGraphicElement.parent()[0].createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(svgGraphicElement[0].getScreenCTM().inverse());
    }

    /**
     * @name preloadMP3
     * @description preload the mp3 backing track
     * @return {Promise<void>} the promise to preload the mp3
     */
    public preloadMP3(): Promise<void> {
        if (this.isMP3BackingTrack()) {
            return new Promise<void>((resolve) => {
                let url = PlayerService.dataUrl1 + '/[' + this.composition.id + ']-' + this.composition.mp3URL;
                this.service.getMP3(url).then((data: string) => {
                    this.mp3Player.reset();
                    this.mp3Player.init('data:audio/mp3;base64,' + data).then(() => {
                        resolve();
                    });
                });
            });
        } else {
            return Promise.resolve();
        }
    }

    /**
     * @name select
     * @description select a certain note or rest
     * @param {any} svgGraphicElement the g element inside the SVG to transform the coordinates
     * @param {number} index the svg element index where is contained the note
     * @param {number} x the x position relative to the svg
     * @param {number} y the y position relative to the svg
     * @return {boolean} true if it was seeked, false if it was not seeked because the mp3 backing track need to be buffered
     */
    public select(svgGraphicElement: any, index: number, x: number, y: number) {
        //first we need to transform the x,y page position to an SVG scaled position
        let point = this.svgPoint(svgGraphicElement, x, y);
        x = point.x;
        y = point.y;
        //console.log("x:" + x + ",y:" + y);

        //we try to select the figure selected        
        let iFigure: number = 0;
        let iFigureNote: number = -1;
        let selectedFigure: FigureBox = null;
        for (; iFigure < this.converter.figureBoxes.length; iFigure++) {
            let figure: FigureBox = this.converter.figureBoxes[iFigure];
            if (figure.type == 1 && !figure.ligato) {
                iFigureNote++;
            }
            if (figure.barline > index) {
                //we haven't found the figure
                break;
            }
            if (figure.barline == index && x > figure.x && x < figure.x + figure.w) {
                if (y > figure.y && y < figure.y + figure.h) {
                    selectedFigure = figure;
                    break;
                }
            }
        }

        if (selectedFigure && selectedFigure != null) {
            //we can only select notes, not rest
            while (selectedFigure && (selectedFigure.type != 1 || selectedFigure.ligato) &&
                this.converter.figureBoxes.length > iFigure) {
                iFigure++;
                selectedFigure = this.converter.figureBoxes[iFigure];
                if (selectedFigure && selectedFigure.type == 1 && !selectedFigure.ligato) {
                    iFigureNote++;
                }
            }
            if (selectedFigure && selectedFigure.type == 1 && !selectedFigure.ligato) {
                //lets put the cursor over the figure
                this.currentBarline = index;
                if (this.$wijzer != null) {
                    this.$wijzer.remove();
                }
                this.$wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
                this.$wijzer.attr({ "fill": "#387ef5", "fill-opacity": (this.settings.playerSettings.cursor ? "0.5" : "0") });
                $("svg > g").eq(this.currentBarline).prepend(this.$wijzer);
                //this.scrollToCursor(selectedFigure);
                //we position correctly the focus rectangle
                this.$wijzer.attr({
                    "x": "" + (selectedFigure.x),
                    "y": "" + (selectedFigure.y),
                    "width": "" + selectedFigure.w,
                    "height": "" + selectedFigure.h
                });

                //oh, wait, we need to search the figure in the timeline map of figures
                let indexTimeLineOnlyNotes: number = -1;
                let indexTimeLine = 0;
                for (; indexTimeLine < this.converter.timeLineMap.length; indexTimeLine++) {
                    let iFigureTimeLine = this.converter.timeLineMap[indexTimeLine];
                    let figureTimeLine = this.converter.figureBoxes[iFigureTimeLine];
                    if (figureTimeLine.type == FigureBox.TYPE_NOTE && !figureTimeLine.ligato) {
                        indexTimeLineOnlyNotes++;
                    }
                    if (iFigureTimeLine == iFigure) {
                        break;
                    }
                }
                this.midiPlayer.seek(this.midiInfo.notes[indexTimeLineOnlyNotes].tick, this.midiInfo.notes[indexTimeLineOnlyNotes].tracks);
                if (this.isMP3BackingTrack()) {
                    let ms = this.midiPlayer.getCurrentTime();
                    let resp = this.mp3Player.seek(ms);
                    if (!resp) {
                        //oh oh, not enough buffered info
                        return false;
                    }
                }

                //finally seek the midi player
                this.currentNote = indexTimeLine;
                this.currentBarline = index;
                return true;
            }
        }
        return true;
    }

    /**
     * @name loadAndRenderScore
     * @description load and render the front sheet
     * @param {Composition} comp the composition info to render
     * @return <Promise<string>> a promise to be returned a svg
     */
    public loadAndRenderScore(comp: Composition): Promise<string> {
        if (this.composition.scoreXMLData == null) {

            let obs = this.service.getScore(comp);

            let self = this;
            return new Promise<string>(resolve => {
                obs.then((data: string) => {
                    this.composition.scoreXMLData = data;
                    let svg = self.renderScore();
                    resolve(svg);
                });
            });

        } else {
            let svg = this.renderScore();
            return Promise.resolve(svg);
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
        if (document.documentElement.clientWidth > 1024) {
            coptions.p = 'f';
        }
        this.converter = new MusicXML2SVG($.parseXML(this.composition.scoreXMLData), coptions);
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
     */
    public play() {
        this.midiPlayer.resume();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.play();
        }
    }

    /**
     * @name playMetronome
     * @description play the metronome
     * @param {boolean} high indicates if we want to hear a high tick metronome pulse or low 
     */
    public playMetronome(high: boolean) {
        this.midiPlayer.playMetronome(high);
    }

    /**
     * @name pause
     * @description pause the music
     */
    public pause() {
        this.midiPlayer.pause();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.pause();
        }
    }

    /**
     * @name stop
     * @description stop the music
     */
    public stop(dontScroll?: boolean) {
        this.currentBarline = 0;
        this.currentNote = 0;
        if (this.$wijzer != null) {
            this.$wijzer.remove();
            this.$wijzer = null;
        }
        this.midiPlayer.stop();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.stop();
        }
        if (!dontScroll) {
            $('.scroll-content').animate({ scrollTop: 0 }, 1000);
        }
    }

    /**
     * @name resume
     * @description resume the music
     */
    public resume() {
        this.midiPlayer.resume();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.resume();
        }
    }

    private currentBarline = 0;
    private currentNote = 0;
    private $wijzer: any = null;

    /**
     * @name endOfSong
     * @description the player notify that the midi has ended
     */
    endOfSong() {
        if (this.listener != null) {
            this.listener.endOfSong();
        }
    }


    /**
     * @override
     */
    midiUpdate(event) {
        if (event.name == 'Note on') {
            if (event.track == this.composition.frontInstrument.track) {
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
                    this.$wijzer.attr({ "fill": "#387ef5", "fill-opacity": (this.settings.playerSettings.cursor ? "0.5" : "0") });
                    $("svg > g").eq(this.currentBarline).prepend(this.$wijzer);
                    this.scrollToCursor(figure);
                }

                //lets prepare next cursor
                let nextFigure: FigureBox = this.getNextFigure(this.currentNote, 1);
                if (nextFigure != null && this.currentBarline != nextFigure.barline) {
                    this.scrollToCursor(figure, nextFigure);
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
     * @name scrollToCursor
     * @description scroll the score to the cursor position (or the future cursor defined by the nextFigure)
     * @param {FigureBox} currentFigure the current figure which have the cursor
     * @param {FigureBox} nextFigure the next figure which have the cursor
     */
    private scrollToCursor(currentFigure: FigureBox, nextFigure?: FigureBox) {
        var y = 0;
        var svgs = $("svg > g");
        let toFigure: FigureBox = currentFigure;
        if (nextFigure) {
            toFigure = nextFigure;
        }

        //FIXME, calculate the absolute position not working, why!?
        for (var isvg = 0; isvg < toFigure.barline; isvg++) {
            y = y + svgs[isvg].getBoundingClientRect().height;
        }
        let svgHeight = svgs[currentFigure.barline].getBoundingClientRect().height;
        if (this.settings.playerSettings.cursorAnimation) {
            $('.scroll-content').animate({ scrollTop: y - (nextFigure ? svgHeight : 0) - 50 }, 200);
        } else {
            $('.scroll-content').scrollTop(y - (nextFigure ? svgHeight : 0) - 50);
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

