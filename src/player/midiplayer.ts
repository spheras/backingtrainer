import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Player as InternalMidiPlayer } from './midiplayerjs/player';//midi-player-js';
import { Platform } from 'ionic-angular';
import { Composition } from './composition';
import * as Soundfont from 'soundfont-player';

/**
 * @interface
 * @name PlayerListener
 * @description a listener definition for certains events of the MidiPlayer
 */
export interface MidiPlayerListener {
    /**
     * @name midiUpdate
     * @description Midi event produced
     * @param <object> event the midi event produced
     */
    midiUpdate(event);

    /**
     * @name finished
     * @description the song was finished
     */
    endOfSong();
}

/**
 * @class
 * @name MidiPlayer
 * @description MidiPlayer based on midi-player-js and sounffont-player which is able to play and generate sounds. 
 */
@Injectable()
export class MidiPlayer {
    /** the event listener of this player */
    private listener: MidiPlayerListener
    private player: InternalMidiPlayer;

    /** we have static fields to avoid creating again these object, which have a huge cost */
    public static audioContext: AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();//new AudioContext();
    public static soundfonts: any = {};


    //the preferred tempo, -1 not set
    private bpm: number = -1;
    /** indicates the muted Track, if any (>-1) */
    private mutedTracks: number[] = [];
    /** the midi data arraybuffer chache */
    private midiDataArrayBuffer: ArrayBuffer = null;
    /** circular sound pool */
    private soundpool: CircularSoundPool;
    /** last metronome tick */
    private lastTick = -1;
    /** to activate or deactivate metronome */
    private metronome: boolean = false;


    constructor(private service: PlayerService, private platform: Platform) {
        this.soundpool = new CircularSoundPool();
        this.initMidiPlayer();
    }

    /**
     * @name setListener
     * @description set an event listener for this player
     */
    public setListener(listener: MidiPlayerListener) {
        this.listener = listener;
    }

    /**
     * @name getTempo
     * @description return the tempo of the midi loaded
     * @return {number} the tempo (bpm)
     */
    public getTempo(): number {
        return this.player.tempo;
    }

    /**
     * @name setMetronome
     * @description activate or deactivate the metronome
     * @param {boolean} activate true if you want to hear the metronome
     */
    public setMetronome(activate: boolean) {
        this.metronome = activate;
    }

    /**
     * @name load
     * @description load the midi data from the composition info
     * @param {Composition} comp the composition info to load the midi info
     * @return {Promise<void>} the promise to load the composition
     */
    public load(comp: Composition): Promise<void> {
        return new Promise<void>((resolve) => {
            this.loadSoundFonts(comp).then(() => {
                this.service.getMidi(comp).then((data) => {
                    this.loadMidiData(data);
                    resolve();
                });
            });
        });
    }

    /**
     * @name loadMidiData
     * @description load the midi data
     * @param {ArrayBuffer} data the midi data as an arraybuffer
     */
    public loadMidiData(data: ArrayBuffer) {
        this.midiDataArrayBuffer = data;
    }

    /**
     * @name findTempo
     * @description internal function to load the midi and find the tempo info
     */
    public findTempo(): Promise<number> {
        return new Promise<number>((resolve) => {
            let self = this;
            let player = new InternalMidiPlayer(function (event) {
                if (event.name == 'Set Tempo') {
                    self.player.tempo = event.data;
                    player.stop();
                    self.player.setForcedTempo(event.data);
                    resolve(event.data);
                }
            });
            player.stop();
            player.loadArrayBuffer(this.midiDataArrayBuffer);
            player.play();
        });
    }


    /**
     * @name setTempo
     * @description set the tempo of the midi loaded
     * @param {number} bpm beats per minute
     */
    public setTempo(bpm: number) {
        if (this.player.isPlaying()) {
            this.player.pause();
            this.player.tempo = bpm;
            this.player.setForcedTempo(bpm);
            this.player.play();
        } else {
            this.bpm = bpm;
            this.player.tempo = bpm;
        }
    }

    /**
     * @name initMidiPlayer
     * @description initialize the midi player
     */
    private initMidiPlayer() {
        let self = this;
        this.player = new InternalMidiPlayer(function (event) {
            self.midiUpdate(event);
        });
        this.player.on('endOfFile', function () {
            self.stop();
            if (self.listener && self.listener != null) {
                self.listener.endOfSong();
            }
        });
        this.player.on('playing', function (event) {
            if (self.player.isPlaying()) {
                let division = self.player.division;//parts (ticks) per quarter (is quarter the beat reference?)
                let tempo = self.player.tempo; //qpm quarter per minute
                //let tempoBySec = tempo / 60; //qps quarter per second

                let tick = event.tick;
                let diff = tick - self.lastTick;

                //console.log("tick:" + tick + ";division:" + division + ";diff:" + diff);

                if (self.lastTick < 0 || diff >= division) {
                    //console.log(">>>>>>>>>>>tick:" + tick + ";division:" + division);
                    if (self.lastTick < 0) {
                        self.lastTick = 0;
                    } else {
                        self.lastTick = self.lastTick + division;
                    }
                    //console.log("diff:" + (diff - division));
                    self.playMetronome(true);
                }
            }
        })
    }

    /**
     * @name loadSoundFont
     * @description load a soundfont from binary js descriptor
     * @param {string} name the name of the instrument to load
     * @return {Promise<void>} the promise to load the instrument
     */
    private loadSoundFont(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            if (name != null && (!MidiPlayer.soundfonts[name] || MidiPlayer.soundfonts[name] == null)) {
                MidiPlayer.soundfonts[name] = "loading";
                let url: string = this.getInsrumentUrl(name);
                Soundfont.instrument(MidiPlayer.audioContext, url).then(function (instrument) {
                    MidiPlayer.soundfonts[name] = instrument;
                    resolve(instrument);
                })
            } else {
                resolve();
            }
        });
    }

    /**
     * @name getInstrumentsByTrack
     * @description get the instruments by track needed for this composition
     * @param {Composition} composition
     * @return {string[]} the list of instruments needed by track (index of the array)
     */
    private getInstrumentsByTrack(composition: Composition): string[] {
        //ensuring space in the array
        let safe = function (object, index: number) {
            while (object.length <= index) {
                object.push(null);
            }
        }
        let result = [];
        let frontName = composition.frontInstrument.name.toLowerCase().trim();
        safe(result, composition.frontInstrument.track);
        result[composition.frontInstrument.track] = frontName;
        for (let i = 0; i < composition.backInstruments.length; i++) {
            let backName = composition.backInstruments[i].name.toLowerCase().trim();
            let track = composition.backInstruments[i].track;
            safe(result, track);
            result[track] = backName;
        }
        result[0] = "metronome";
        return result;
    }

    /**
     * @name loadSoundFont
     * @description load the soundfont to play midi files
     * @return the promise to load the soundfont
     */
    public loadSoundFonts(composition: Composition): Promise<void> {
        return new Promise<void>(resolve => {
            let instrumentsByTrack: string[] = this.getInstrumentsByTrack(composition);

            let promises: Promise<void>[] = [];
            for (let i = 0; i < instrumentsByTrack.length; i++) {
                promises.push(this.loadSoundFont(instrumentsByTrack[i]));
            }
            Promise.all(promises).then(() => {
                this.soundpool.init(instrumentsByTrack);
                resolve();
            })
        });
    }

    /**
     * @name play
     * @description play the music, start the show!
     */
    public play() {
        this.playMidiData(this.midiDataArrayBuffer);
    }

    /**
     * @name playMidiData
     * @description play the music, start the show!
     * @param {ArrayBuffer} data the binary data of the midi to be played
     */
    public playMidiData(data: ArrayBuffer) {
        this.player.loadArrayBuffer(data);
        this.player.play();
    }

    /**
     * @name playMetronome
     * @description play the metronome
     * @param {boolean} high indicates if we want to hear a high tick metronome pulse or low 
     */
    public playMetronome(high: boolean) {
        if (this.metronome) {
            this.soundpool.play({ noteName: (high ? "A0" : "Bb0"), track: 0, velocity: 100 });
        }
    }

    /**
     * @name stop
     * @description stop the current playing
     */
    public stop() {
        this.lastTick = -1;
        this.player.stop();
        this.soundpool.stop();
    }

    /**
     * @name pause
     * @description pause the current playing
     */
    public pause() {
        this.player.pause();
    }

    /**
     * @name resume
     * @description resume the current playing
     */
    public resume() {
        this.player.play();
    }

    /**
     * @name muteTrack
     * @description mute a Track
     * @param {number} track the Track to mute
     */
    public muteTrack(track: number) {
        this.mutedTracks.push(track);
    }

    /**
     * @name unmuteTrack
     * @description unmute a certain track
     * @param {number} the track to unmute
     */
    public unmuteTrack(track: number) {
        let result: number[] = [];
        for (let i = 0; i < this.mutedTracks.length; i++) {
            if (this.mutedTracks[i] != track) {
                result.push(this.mutedTracks[i]);
            }
        }
        this.mutedTracks = result;
    }

    /**
     * @name unmuteTracks
     * @description unmute all Tracks
     */
    public unmuteTracks() {
        this.mutedTracks = [];
    }

    /**
     * @name isMuted
     * @description check if a certain track is muted or not
     * @param {number} track the track to chec
     * @return {boolean} if the track is muted or not
     */
    private isMuted(track: number): boolean {
        for (let i = 0; i < this.mutedTracks.length; i++) {
            if (this.mutedTracks[i] == track) {
                return true;
            }
        }
        return false;
    }


    /**
     * @name midiUpdate
     * @description a new midi event has been produced
     * @param event the event produced
     */
    midiUpdate(event) {
        if (event.name == 'Note on') {
            if (!this.isMuted(event.track)) {
                this.soundpool.play(event);
            }
        }

        if (this.listener && this.listener != null) {
            this.listener.midiUpdate(event);
        }

    }

    /**
     * @name getInstrumentUrl
     * @description obtain the soundfont url for the instrument we desire
     * @param {string} instrument the instrument we're trying to get
     * @return {string} the url to get the js soundfont
     */
    private getInsrumentUrl(instrument: string): string {
        let android: boolean = this.platform.is("android");
        let codec: string = "mp3";
        if (android) {
            //unfortunately android mp3 decodification is veeryyyyy slow! (do the same in IOS?)
            codec = "wav";
        }
        //remember to avoid using mp3 files as the decode in android is very slow
        if (instrument.toLowerCase().trim().indexOf("flute") >= 0) {
            return 'assets/soundfonts/flute-' + codec + '.js'
        }
        else if (instrument.toLowerCase().trim().indexOf("metronome") >= 0) {
            return 'assets/soundfonts/metronome-wav.js'
        } else {
            return 'assets/soundfonts/acoustic_grand_piano-' + codec + '.js';
        }
    }
}

/**
 * @name CircularSoundPool
 * @description a circular sound pool to avoid playing infinite sounds. The threshold determine how many sounds can be played simultaneously
 */
class CircularSoundPool {
    private trackList = [[]];
    private pianoIndex: number = 0;
    private pianoThreshold: number = 8;
    private instrumentsMap: string[];

    /**
     * @name init
     * @description initialize the circular sound pool with a set of instruments by track
     * @param {string[]} instrumentMap a set of instruments by track (null or not defined means piano)
     */
    public init(instrumentMap: string[]) {
        this.instrumentsMap = instrumentMap;
        this.trackList = [[]];
        for (let i = 0; i < this.instrumentsMap.length; i++) {
            this.trackList.push([]);
        }
    }

    /**
     * @name stop
     * @description stop all the instruments mapped
     */
    public stop() {
        for (let i = 0; i < this.trackList.length; i++) {
            if (this.trackList[i] && this.trackList[i] != null) {
                for (let j = 0; j < this.trackList[i].length; j++) {
                    let instrument = this.trackList[i][j];
                    if (instrument && instrument != null) {
                        instrument.stop();
                    }
                }
            }
        }
    }

    /**
     * @name play
     * @description play a midi event
     * @param {any} event a midi event
     */
    public play(event) {
        let track: number = event.track;
        let strInstrument: string = this.instrumentsMap[track];
        if (!strInstrument || strInstrument == null) {
            strInstrument = "piano";
        }
        let instrument = MidiPlayer.soundfonts[strInstrument];
        if (!instrument || instrument == null) {
            strInstrument = "piano";
            instrument = MidiPlayer.soundfonts["piano"];
        }

        let max = (strInstrument == "piano" ? this.pianoThreshold : 1);
        let index = (strInstrument == "piano" ? this.pianoIndex : 0);

        if (this.trackList[track][index] && strInstrument != "metronome") {
            this.trackList[track][index].stop();
        }

        this.trackList[track][index] = instrument.play(event.noteName, MidiPlayer.audioContext.currentTime, { gain: event.velocity / 100 });

        index++;
        if (index == max) {
            index = 0;
        }

        if (strInstrument == "piano") {
            this.pianoIndex = index;
        }
    }
}