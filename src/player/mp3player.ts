import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Platform } from 'ionic-angular';
import { SoundManager } from 'soundmanager2';


/**
 * @class
 * @name MP3Player
 * @description MP3Player to play mp3 backing tracks
 */
@Injectable()
export class MP3Player {
    /** the sound manager */
    public static soundManager: any = null;
    private soundTrack: any = null;
    private muted: boolean = false;

    constructor(private service: PlayerService, private platform: Platform) {
        if (MP3Player.soundManager == null) {
            MP3Player.soundManager = new SoundManager();
        } else {
            MP3Player.soundManager.reset();
        }
    }

    public reset() {
        MP3Player.soundManager.reset();
    }

    /**
     * @name init
     * @description Initialize the mp3 player and start loading the mp3 backing track
     * @param {string} url the url to get the mp3
     * @return {Promise<void>} the promise to init and load the mp3
     */
    public init(url: string): Promise<void> {
        return new Promise<void>((resolve) => {
            MP3Player.soundManager.setup({
                preferFlash: false, // prefer 100% HTML5 mode, where both supported
                onready: function () {
                    // console.log('SM2 ready!');
                    this.soundTrack = MP3Player.soundManager.createSound({
                        id: 'backingtrack',
                        url: url,
                        html5Only: true,
                        autoLoad: true,
                        autoPlay: false,
                        onload: function () {
                            // console.log('backingtrack loaded!');
                            resolve();
                        },
                        volume: 100
                    });
                    this.mute(this.muted);
                }.bind(this),
                ontimeout: function () {
                    resolve();
                    console.log('SM2 init failed!');
                },
                defaultOptions: {
                    // set global default volume for all sound objects
                    volume: 100
                }
            });
            MP3Player.soundManager.beginDelayedInit();
        });
    }

    /**
     * @name seek
     * @description seek the mp3 player
     * @param {number} ms the milliseconds to seek
     * @return {boolean} indicates if it was possible to seek or not depending in the bufered data
     */
    public seek(ms: number): boolean {
        if (this.soundTrack.duration > ms) {
            this.stop();
            this.play();
            this.pause();
            this.soundTrack.setPosition(ms);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @name pause
     * @description pause the current sound track
     */
    public pause() {
        this.soundTrack.pause();
    }

    /**
     * @name stop
     * @description stop the current sound track
     */
    public stop() {
        if (this.soundTrack != null) {
            this.soundTrack.stop();
        }
    }

    /**
     * @name play
     * @description play the current sound track
     */
    public play() {
        this.soundTrack.play();
    }

    /**
     * @name resume
     * @description resume the current sound track
     */
    public resume() {
        this.soundTrack.resume();
    }

    /**
     * @name mute
     * @description to mute or unmute the player
     * @param {boolean} mute the new muted state
     */
    public mute(mute: boolean) {
        this.muted = mute;
        if (this.soundTrack != null) {
            if (mute) {
                this.soundTrack.mute();
            } else {
                this.soundTrack.unmute();
            }
        }
    }

}