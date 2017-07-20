import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Player as InternalMidiPlayer } from './midiplayerjs/player';//midi-player-js';
import { Platform } from 'ionic-angular';
import { Composition } from './composition';
import * as Soundfont from 'soundfont-player';
//TODO, sf2 for orchestras?
//import { SoundFontMidiSynth } from './sf2midisynth/soundfont.midi.synth';

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

export type TrackInfo = {
    pointer: number,
    lastStatus: number,
    delta: number,
    runningDelta: number,
    lastTick: number
}

export type MidiInfo = {
    tempo: number,
    notes: { tick: number, tracks: TrackInfo[] }[]
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
    //TODO, sf2 for orchestras?
    //public static sf2MidiSynth:SoundFontMidiSynth;


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
     * @name prepare
     * @description prepare the midi player to start playing
     */
    public prepare() {
        this.player.prepare();
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
     * @name getCurrentTime
     * @description return the current time in milliseconds
     * @return {number} the current time in milliseconds
     */
    public getCurrentTime(): number {
        let currentTick = this.player.startTick;
        return currentTick / this.player.division / this.player.tempo * 60000;
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
        this.player.loadArrayBuffer(data);
    }

    public play() {
        this.resume();
    }

    /**
     * @name createMap
     * @description internal function to load the midi and create a map of ticks, find the tempo info, ...
     * @param {number} itrack the index of the track in which the map will be based on
     * @return {Promise<MidiInfo>} the promise to return the midi info
     */
    public createMap(itrack: number): Promise<MidiInfo> {
        return new Promise<MidiInfo>((resolve) => {
            //preparing some variables
            let result: MidiInfo = { tempo: 0, notes: [] };
            let foundTempo: boolean = false;
            let oldEventHandlers = this.player.eventListeners;
            this.player.eventListeners = {};
            let player = this.player;
            player.resetTracks();
            let currentTick: number = 0;
            //we need to store delta time to wait ticks
            let deltaTracks: number[] = [];
            for (let i = 0; i < player.tracks.length; i++) {
                deltaTracks.push(0);
            }
            let tickDelta = 0;

            //lets start reading
            while (!player.endOfFile()) {

                let tracks: TrackInfo[] = [];
                //we get info from each track
                for (let i = 0; i < player.tracks.length; i++) {
                    let track = player.tracks[i];
                    let trackInfo: TrackInfo = {
                        pointer: track.pointer,
                        lastStatus: track.lastStatus,
                        delta: track.delta,
                        runningDelta: track.runningDelta,
                        lastTick: track.lastTick,
                    };
                    let event = track.handleEvent(currentTick, false);
                    tracks.push(trackInfo)

                    //lets capture the tempo
                    if (event != null && event.name == 'Set Tempo' && !foundTempo) {
                        foundTempo = true;
                        this.player.tempo = event.data;
                        this.player.setForcedTempo(event.data);
                    }

                    //if we are dealing with the front track
                    if (i == (itrack - 1)) {
                        if (event != null) {
                            if (event.name == 'Note on' && event.velocity > 0) {
                                //a new note, lets save the track infos
                                result.notes.push({ tick: currentTick, tracks });
                            }
                        }
                    }

                    if (event != null) {
                        deltaTracks[i] = track.getDelta();
                    } else {
                        deltaTracks[i] = deltaTracks[i] - tickDelta;
                    }
                }

                //lets calculate the next tick delta
                tickDelta = Math.min.apply(null, deltaTracks);
                if (tickDelta <= 0) {
                    tickDelta = 5;
                }
                currentTick = currentTick + tickDelta;
            }

            //restoring the player
            player.resetTracks();
            this.player.eventListeners = oldEventHandlers;

            resolve(result);

        });
    }

    /**
     * @name seek
     * @description seek the midi player
     * @param {number} tick the tick number to seek
	 * @param {trackInfos[]} list of track info to restore the status
     */
    public seek(tick: number, trackInfos: TrackInfo[]) {
        this.player.seek(tick, trackInfos);
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
            this.player.setForcedTempo(bpm);
        }
    }

    /**
     * @name initMidiPlayer
     * @description initialize the midi player
     */
    private initMidiPlayer() {
        this.player = new InternalMidiPlayer(this.midiUpdate.bind(this));
        this.player.on('endOfFile', function () {
            this.stop();
            if (this.listener && this.listener != null) {
                this.listener.endOfSong();
            }
        }.bind(this));
        this.player.on('playing', function (event) {
            if (this.player.isPlaying()) {
                let division = this.player.division;//parts (ticks) per quarter (is quarter the beat reference?)
                //let tempo = this.player.tempo; //qpm quarter per minute
                //let tempoBySec = tempo / 60; //qps quarter per second

                let tick = event.tick;
                let diff = tick - this.lastTick;

                //console.log("tick:" + tick + ";division:" + division + ";diff:" + diff);

                if (this.lastTick < 0 || diff >= division) {
                    //console.log(">>>>>>>>>>>tick:" + tick + ";division:" + division);
                    if (this.lastTick < 0) {
                        this.lastTick = 0;
                    } else {
                        this.lastTick = this.lastTick + division;
                    }
                    //console.log("diff:" + (diff - division));
                    this.playMetronome(true);
                }
            }
        }.bind(this))
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

        //front could have a help track
        if (composition.frontInstrument.help >= 0) {
            safe(result, composition.frontInstrument.help);
            result[composition.frontInstrument.help] = frontName;
        }

        if (composition.backInstruments) {
            for (let i = 0; i < composition.backInstruments.length; i++) {
                let backName = composition.backInstruments[i].name.toLowerCase().trim();
                let track = composition.backInstruments[i].track;
                safe(result, track);
                result[track] = backName;
            }
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
                /*
                TODO, sf2 for orchestras?
                this.service.getSoundfont().then((response: ArrayBuffer) => {
                    let input: Uint8Array = new Uint8Array(response);
                    MidiPlayer.sf2MidiSynth = new SoundFontMidiSynth();
                    MidiPlayer.sf2MidiSynth.loadSoundFont(input);
                    resolve();
                });
                */
            })
        });
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
    public isMuted(track: number): boolean {
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
        //TODO, sf2 for orchestras?
        /*
                console.log("EVENT:" + event.name + ";velocity:" + event.velocity);
                if (event.name == 'Note on') {
                    console.log("note");
                    if (event.velocity == 0) {
                        console.log("cero");
                    }
                }
                MidiPlayer.sf2MidiSynth.processMidiMessage(event.message);
        */

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
        if (instrument.toLowerCase().trim().indexOf("metronome") >= 0) {
            return 'assets/soundfonts/metronome-wav.js'
        } else if(instrument.toLowerCase().trim().indexOf("piano")>=0){
            instrument="acoustic_grand_piano";
        } else if(instrument.toLowerCase().trim().indexOf("harp")>=0){
            instrument="orchestral_harp";
        }

        return 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/'+instrument.toLowerCase().trim()+'-mp3.js';

        /*
        let android: boolean = this.platform.is("android");
        let codec: string = "wav"; //TODO, always wav? or try mp3 and then wav? increasing size of the app?
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
        } else if (instrument.toLowerCase().trim().indexOf("harp") >= 0) {
            return 'assets/soundfonts/harp-wav.js'
        } else {
            return 'assets/soundfonts/acoustic_grand_piano-' + codec + '.js';
        }
        */
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

        let max = (strInstrument == "piano" || strInstrument == "harp" ? this.pianoThreshold : 1);
        let index = (strInstrument == "piano" || strInstrument == "harp" ? this.pianoIndex : 0);

        if (this.trackList[track][index] && strInstrument != "metronome") {
            this.trackList[track][index].stop();
        }

        this.trackList[track][index] = instrument.play(event.noteName, MidiPlayer.audioContext.currentTime, { gain: event.velocity / 100 });

        index++;
        if (index == max) {
            index = 0;
        }

        if (strInstrument == "piano" || strInstrument == "harp") {
            this.pianoIndex = index;
        }
    }
}