import { Injectable } from '@angular/core';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { Player as InternalMidiPlayer } from 'midi-player-js';
import { decode, inArray } from '../util/Util';
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
    private player;

    /** we have static fields to avoid creating again these object, which have a huge cost */
    public static audioContext: AudioContext = new AudioContext;
    public static piano: any = null;

    //the preferred tempo, -1 not set
    private bpm: number = -1;
    /** indicates the muted Track, if any (>-1) */
    private mutedTrack: number = -1;
    /** the midi data arraybuffer chache */
    private midiDataArrayBuffer: ArrayBuffer = null;

    constructor(private service: PlayerService, private platform: Platform) {
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
     * @name load
     * @description load the midi data from the composition info
     * @param {Composition} comp the composition info to load the midi info
     * @return {Promise<void>} the promise to load the composition
     */
    public load(comp: Composition): Promise<void> {
        return new Promise<void>((resolve) => {
            this.loadSoundFont().then(() => {
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
            this.player.play(bpm);
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
    }

    /**
     * @name loadSoundFont
     * @description load the soundfont to play midi files
     * @return the promise to load the soundfont
     */
    public loadSoundFont(): Promise<void> {
        let self = this;
        return new Promise<void>(resolve => {
            if (MidiPlayer.piano == null) {
                Soundfont.instrument(MidiPlayer.audioContext, '../'
                    + (this.platform.is("android") ? 'www/' : '') //TODO need to investigate more 
                    + 'assets/soundfonts/low/acoustic_grand_piano-mp3.js').then(function (piano) {
                        piano.play(3, 0, 0);
                        MidiPlayer.piano = piano;
                        resolve();
                    });
            } else {
                resolve();
            }
        });
    }

    /**
     * @name play
     * @description play the music, start the show!
     */
    public play(bpm: number) {
        this.playMidiData(bpm, this.midiDataArrayBuffer);
    }

    /**
     * @name playMidiData
     * @description play the music, start the show!
     * @param {number} bpm the bpm to start playing
     * @param {ArrayBuffer} data the binary data of the midi to be played
     */
    public playMidiData(bpm: number, data: ArrayBuffer) {
        this.player.loadArrayBuffer(data);
        this.player.play();
    }

    /**
     * @name stop
     * @description stop the current playing
     */
    public stop() {
        this.player.stop();
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
     * @param {number} Track the Track to mute
     */
    public muteTrack(Track: number) {
        this.mutedTrack = Track;
    }

    /**
     * @name unmuteTracks
     * @description unmute all Tracks
     */
    public unmuteTracks() {
        this.mutedTrack = -1;
    }

    /**
     * @name midiUpdate
     * @description a new midi event has been produced
     * @param event the event produced
     */
    midiUpdate(event) {
        if (event.name == 'Set Tempo') {
            if (this.bpm > 0) {
                this.setTempo(this.bpm);
            }
        }
        if (event.name == 'Note on') {
            if (event.track != this.mutedTrack) {
                MidiPlayer.piano.play(event.noteName, MidiPlayer.audioContext.currentTime, { gain: event.velocity / 100 });
            }
        }
        if (this.listener && this.listener != null) {
            this.listener.midiUpdate(event);
        }
    }
}
