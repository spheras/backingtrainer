import { Component, ApplicationRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Navbar } from 'ionic-angular';
import { PitchDetect, PitchDetectData } from './pitchdetect';

@Component({
    templateUrl: './tuner.component.html',
    providers: [Navbar]
})
export class TunerPage {

    private data: PitchDetectData = new PitchDetectData(0, "", "", 0);
    private difference: SafeStyle;
    private sensitivity: number = 0;
    private pd: PitchDetect = null;

    constructor(private _sanitizer: DomSanitizer, private appref: ApplicationRef) {
        this.init();
    }

    init() {
        this.pd = new PitchDetect();
        this.sensitivity = 10 - (this.pd.sensitivity * 100);
        this.pd.toggleLiveInput().subscribe(
            value => {
                //console.log(value.detune + ":" + value.detuneAmount);
                let diff = value.detuneAmount;
                if (diff < 10) {
                    diff = 0;
                }
                if (value.detune == "flat") {
                    diff = -diff;
                }
                this.difference = this._sanitizer.bypassSecurityTrustStyle("rotate(" + diff + "deg )");
                this.data = value
                this.appref.tick();
            }, error => console.error(error),
            () => console.log("fin"));
    }

    ionViewWillLeave() {
        if (this.pd.isLiveInput) {
            this.pd.toggleLiveInput();
        }
        if (this.pd.isPlaying) {
            this.pd.toggleOscillator();
        }
        this.pd.close();
    }

    /**
     * @name listen
     * @description start/stop playing the oscillator
     */
    listen() {
        if (this.pd.isPlaying) {
            this.pd.toggleOscillator();
            this.pd.toggleLiveInput();
            this.pd.close();
            this.init();
        } else {
            this.pd.toggleOscillator();
        }
    }

    /**
     * @name change
     * @description the range component has changed the value
     * @param {Range} the event produced by the component with the new value
     */
    change(event) {
        this.pd.sensitivity = (10 - event.value) / 100;
    }

}