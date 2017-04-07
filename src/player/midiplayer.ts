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
}

@Injectable()
export class Player {
    private vrvToolkit: any = null;
    private player;
    private ac = new AudioContext;
    private piano: any = null;

    constructor(private service: PlayerService) {
        this.initMidiPlayer();
    }

    /**
     * @name initMidiPlayer
     * @description initialize the midi player
     */
    private initMidiPlayer() {
        let self = this;
        this.player = new MidiPlayer(function (event) {
            self.midiUpdate(event);
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
            if (self.piano == null) {
                Soundfont.instrument(this.ac, 'acoustic_grand_piano').then(function (piano) {
                    self.piano = piano;
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * @name loadMidiData
     * @description load the backingtrack midi file
     * @param <string> url the url to obtain the midi file
     * @return <Promise<string>> the promise of the midi data in b64 format
     */
    private loadMidiData(url: string): Promise<ArrayBuffer> {
        let obs = this.service.downloadBackingTrackMidi();
        return new Promise<ArrayBuffer>(resolve => {
            obs.subscribe((data: ArrayBuffer) => {
                resolve(data);
            });
        });
    }

    /**
     * @name play
     * @description play the music, start the show!
     */
    public play(url: string) {
        this.loadSoundFont().then(() => {
            this.loadMidiData(url).then((data) => {
                this.player.loadArrayBuffer(data);
                this.player.play();
            });
        });
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
    private midiUpdate(event) {
        if (event.name == 'Note on') {
            this.piano.play(event.noteName, this.ac.currentTime, { gain: event.velocity / 100 });
        }
    }
}
