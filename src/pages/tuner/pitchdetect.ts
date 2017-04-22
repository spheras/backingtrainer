/**
 * pitch detect library from https://github.com/cwilso/PitchDetect
 */
/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { Observer, Observable } from 'rxjs/Rx';

export class PitchDetectData {
    constructor(pitch: number, note: string, detune: string, detuneAmount: number) {
        this.pitch = pitch;
        this.note = note;
        this.detune = detune;
        this.detuneAmount = detuneAmount;
    }

    public pitch: number = 0;
    public note: string = "";
    public detune: string = "";
    public detuneAmount: number = 0;
}
export class PitchDetect {
    private static MAX_SIZE = 0;
    private audioContext: AudioContext = null;
    private mediaStreamSource: MediaStreamAudioSourceNode = null;
    private analyser: AnalyserNode = null;
    private sourceNode: OscillatorNode = null;
    public isLiveInput: boolean = false;
    public isPlaying: boolean = false;

    private observable: Observable<PitchDetectData>;
    private observer: Observer<PitchDetectData>;


    /*    
    private theBuffer = null;
    private DEBUGCANVAS = null;
    private detectorElem;
    private canvasElem;
    private waveCanvas;
    private pitchElem;
    private noteElem;
    private detuneElem;
    private detuneAmount;
    */

    constructor() {
        this.audioContext = new AudioContext();
        PitchDetect.MAX_SIZE = Math.max(4, Math.floor(this.audioContext.sampleRate / 5000));	// corresponds to a 5kHz signal
        this.observable = new Observable(observer => this.observer = observer);
    }

    close() {
        this.audioContext.close();
    }

    private error() {
        console.error('Stream generation failed.');
    }

    private getUserMedia(dictionary, callback) {
        try {
            var n = <any>navigator;
            n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
            navigator.getUserMedia(dictionary, callback, this.error);
        } catch (e) {
            console.error('getUserMedia threw exception :' + e);
        }
    }

    private gotStream(stream) {
        // Create an AudioNode from the stream.
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

        // Connect it to the destination.
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.mediaStreamSource.connect(this.analyser);
        this.updatePitch();
    }

    public toggleOscillator() {
        if (this.isPlaying) {
            //stop playing and return
            this.sourceNode.stop(0);
            this.sourceNode = null;
            this.analyser = null;
            this.isPlaying = false;
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            window.cancelAnimationFrame(this.rafID);
            return "play oscillator";
        }
        this.sourceNode = this.audioContext.createOscillator();

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.sourceNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.sourceNode.start(0);
        this.isPlaying = true;
        this.updatePitch();

        return "stop";
    }


    private micStream = null;

    public toggleLiveInput(): Observable<PitchDetectData> {
        if (this.isPlaying) {
            //stop playing and return
            this.sourceNode.stop(0);
            this.sourceNode = null;
            this.analyser = null;
            this.isPlaying = false;
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            window.cancelAnimationFrame(this.rafID);
        }
        if (this.isLiveInput) {
            var tracks = this.micStream.getTracks();
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].stop();
            }
            return;
        }

        let self = this;
        this.isLiveInput = true;
        this.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, function (stream) {
                self.micStream = stream;
                self.gotStream(stream);
            });

        return this.observable;
    }


    private rafID = null;
    //private tracks = null;
    private buflen = 1024;
    private buf = new Float32Array(this.buflen);
    private noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    private noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    }

    private frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    private centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }

    private MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
    private GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

    // sensitivity to ignore signal
    public sensitivity: number = 0.06;

    private autoCorrelate(buf, sampleRate) {
        var SIZE = buf.length;
        var MAX_SAMPLES = Math.floor(SIZE / 2);
        var best_offset = -1;
        var best_correlation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;
        var correlations = new Array(MAX_SAMPLES);

        for (var i = 0; i < SIZE; i++) {
            var val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < this.sensitivity) // not enough signal
            return -1;

        var lastCorrelation = 1;
        for (var offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
            var correlation = 0;

            for (var i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation > this.GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            } else if (foundGoodCorrelation) {
                // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
                // (anti-aliased) offset.

                // we know best_offset >=1, 
                // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
                // we can't drop into this clause until the following pass (else if).
                var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
                return sampleRate / (best_offset + (8 * shift));
            }
            lastCorrelation = correlation;
        }
        if (best_correlation > 0.01) {
            // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            return sampleRate / best_offset;
        }
        return -1;
        //	var best_frequency = sampleRate/best_offset;
    }

    private updatePitch() {
        //var cycles = new Array();
        if (this.analyser == null) {
            return;
        }
        this.analyser.getFloatTimeDomainData(this.buf);
        var ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate);
        let self = this;
        if (ac == -1) {
            /*
            detectorElem.className = "vague";
            pitchElem.innerText = "--";
            noteElem.innerText = "-";
            detuneElem.className = "";
            detuneAmount.innerText = "--";
            */
        } else {
            //detectorElem.className = "confident";
            var pitch = ac;
            var pitchElem = Math.round(pitch);
            var note = this.noteFromPitch(pitch);
            var noteElem = this.noteStrings[note % 12];
            var detune = this.centsOffFromPitch(pitch, note);
            var detuneAmount = 0;
            var detuneElem = "";
            if (detune == 0) {
                //detuneElem.className = "";
                detuneAmount = 0;
            } else {
                if (detune < 0)
                    detuneElem = "flat";
                else
                    detuneElem = "sharp";
                detuneAmount = Math.abs(detune);
            }

            let pddata = new PitchDetectData(pitchElem, noteElem, detuneElem, detuneAmount);
            this.observer.next(pddata);
            //console.log("pitch:" + pitchElem + ", note:" + noteElem + ", detune:" + detuneElem + "(" + detuneAmount + ")");
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        this.rafID = window.requestAnimationFrame(function () {
            self.updatePitch();
        });
    }
}