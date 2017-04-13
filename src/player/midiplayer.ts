import { Injectable } from '@angular/core';
import { extend } from '../util/Util';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { Player as InternalMidiPlayer } from 'midi-player-js';
import { decode, inArray } from '../util/Util';
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
    private ac = new AudioContext;
    private piano: any = null;

    constructor(private service: PlayerService) {
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
            if (self.piano == null) {
                Soundfont.instrument(this.ac, 'acoustic_grand_piano').then(function (piano) {
                    piano.play(3, 0, 0);
                    self.piano = piano;
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
     * @param {Composition} comp the composition info to load the midi info
     */
    public play(comp: Composition) {
        this.loadSoundFont().then(() => {
            this.service.getMidi(comp).then((data) => {
                this.playMidiData(120, data);
            });
        });
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
     * @name midiUpdate
     * @description a new midi event has been produced
     * @param event the event produced
     */
    midiUpdate(event) {
        if (event.name == 'Note on') {
            this.piano.play(event.noteName, this.ac.currentTime, { gain: event.velocity / 100 });
        }
        if (this.listener && this.listener != null) {
            this.listener.midiUpdate(event);
        }
    }
}
