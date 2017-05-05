
export type Instrument = {
    channel: number,
    key: number,
    sample: Uint8Array,
    basePlaybackRate: number,
    loopStart: number,
    loopEnd: number,
    volume: number,
    panpot: number,
    velocity: number,
    buffer: Int16Array,
    sampleRate: number,
    pitchBend: number,
    pitchBendSensitivity: number,
    modEnvToPitch: number,
    expression: number,
    cutOffFrequency: number,
    hermonicContent: number,
    volDelay: number,
    modDelay: number,
    volAttack: number,
    modAttack: number,
    volHold: number,
    modHold: number,
    volDecay: number,
    modDecay: number,
    start: number,
    initialFilterFc: number,
    modEnvToFilterFc: number,
    modRelease: number,
    sampleModes?: number,
    pan: number,
    harmonicContent: number,
    end: number,
    initialAttenuation: number,
    volSustain: number,
    modSustain: number,
    initialFilterQ: number,
    mute: boolean,
    releaseTime: number,
    volRelease: number,
    scaleTuning: number
}


export class SoundFontSynthesizerNote {
    public key: number;

    private ctx: AudioContext;
    private destination: AudioNode;
    private instrument: Instrument;
    private channel: number;
    private velocity: number;
    private buffer: Int16Array;
    private playbackRate: number;
    private loopStart: number;
    private loopEnd: number;
    private sampleRate: number;
    private volume: number;
    private panpot: number;
    private pitchBend: number;
    private pitchBendSensitivity: number;
    private modEnvToPitch: number;
    private expression: number;
    private cutOffFrequency: number;
    private hermonicContent: number;

    private startTime: number;
    private computedPlaybackRate: number;
    private noteOffState: boolean;
    private ROOT12: number = Math.pow(2, 1 / 12);

    private audioBuffer: AudioBuffer;
    private bufferSource: AudioBufferSourceNode;
    private panner: StereoPannerNode;
    private gainOutput: GainNode;
    private expressionGain: GainNode;
    private filter: BiquadFilterNode;
    private modulator: BiquadFilterNode;

    /**
     * @param {AudioContext} ctx
     * @param {AudioNode} destination
     * @param {Instrument} instrument
     * @constructor
     */
    constructor(ctx: AudioContext, destination, instrument) {
        this.ctx = ctx;
        this.destination = destination;
        this.instrument = instrument;
        this.channel = instrument.channel;
        this.key = instrument.key;
        this.velocity = instrument.velocity;
        this.buffer = instrument.sample;
        this.playbackRate = instrument.basePlaybackRate;
        this.loopStart = instrument.loopStart;
        this.loopEnd = instrument.loopEnd;
        this.sampleRate = instrument.sampleRate;
        this.volume = instrument.volume;
        this.panpot = instrument.panpot;
        this.pitchBend = instrument.pitchBend;
        this.pitchBendSensitivity = instrument.pitchBendSensitivity;
        this.modEnvToPitch = instrument.modEnvToPitch;
        this.expression = instrument.expression;
        this.cutOffFrequency = instrument.cutOffFrequency;
        this.hermonicContent = instrument.hermonicContent;

        // state
        this.startTime = ctx.currentTime;
        this.computedPlaybackRate = this.playbackRate | 0;
        this.noteOffState = false;

        //---------------------------------------------------------------------------
        // audio node
        //---------------------------------------------------------------------------
        this.audioBuffer;
        this.bufferSource;
        this.panner;
        this.gainOutput;
        this.expressionGain;
        this.filter;
        this.modulator;
    };

    public noteOn() {
        let ctx: AudioContext = this.ctx;
        let instrument = this.instrument;
        let sample = this.buffer;
        let buffer: AudioBuffer;
        let channelData: Float32Array;
        let bufferSource: AudioBufferSourceNode;
        //unused - let filter: BiquadFilterNode;
        let modulator: BiquadFilterNode;
        let panner: StereoPannerNode;
        let output: GainNode;
        let outputGain: AudioParam;
        let now = this.ctx.currentTime;
        let volDelay: number = now + instrument.volDelay;
        let modDelay: number = now + instrument.modDelay;
        let volAttack: number = volDelay + instrument.volAttack;
        let modAttack: number = volDelay + instrument.modAttack;
        let volHold: number = volAttack + instrument.volHold;
        let modHold: number = modAttack + instrument.modHold;
        let volDecay: number = volHold + instrument.volDecay;
        let modDecay: number = modHold + instrument.modDecay;
        let loopStart: number = instrument.loopStart / this.sampleRate;
        let loopEnd: number = instrument.loopEnd / this.sampleRate;
        let startTime: number = instrument.start / this.sampleRate;
        let baseFreq: number;
        let peekFreq: number;
        let sustainFreq: number;
        let volume: number;

        // TODO: ドラムパートのPanが変化した場合、その計算をしなければならない
        // http://cpansearch.perl.org/src/PJB/MIDI-SoundFont-1.08/doc/sfspec21.html#8.4.6
        let pan: number = instrument.pan !== void 0 ? instrument.pan : this.panpot;
        //unused - let cutOffFrequency: number = instrument.cutOffFrequency; // (Brightness)
        //unused let harmonicContent: number = instrument.harmonicContent; // (Resonance)

        sample = sample.subarray(0, sample.length + instrument.end);
        buffer = this.audioBuffer = ctx.createBuffer(1, sample.length, this.sampleRate);
        channelData = buffer.getChannelData(0);
        channelData.set(sample);

        // buffer source
        bufferSource = this.bufferSource = ctx.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.loop = !(typeof instrument.sampleModes === 'undefined');
        bufferSource.loopStart = loopStart;
        bufferSource.loopEnd = loopEnd;
        this.updatePitchBend(this.pitchBend);

        // audio node
        panner = this.panner = ctx.createStereoPanner();
        output = this.gainOutput = ctx.createGain();
        outputGain = output.gain;
        this.expressionGain = ctx.createGain();
        this.expressionGain.gain.value = this.expression / 127;

        // panpot
        panner.pan.value = Math.sin(pan * Math.PI / 2);

        //---------------------------------------------------------------------------
        // Delay, Attack, Hold, Decay, Sustain
        //---------------------------------------------------------------------------

        volume = this.volume * (this.velocity / 127) * (1 - instrument.initialAttenuation / 1000);
        if (volume < 0) {
            volume = 0;
        }

        // volume envelope
        outputGain
            .setValueAtTime(0, now)
            .setValueAtTime(0, volDelay)
            .setTargetAtTime(volume, volDelay, instrument.volAttack)
            .setValueAtTime(volume, volHold)
            .linearRampToValueAtTime(volume * (1 - instrument.volSustain), volDecay);

        // modulation envelope
        baseFreq = this.amountToFreq(instrument.initialFilterFc);
        peekFreq = this.amountToFreq(instrument.initialFilterFc + instrument.modEnvToFilterFc);
        sustainFreq = baseFreq + (peekFreq - baseFreq) * (1 - instrument.modSustain);

        modulator = this.modulator = ctx.createBiquadFilter();
        modulator.Q.setValueAtTime(Math.pow(10, instrument.initialFilterQ / 200), now);
        modulator.frequency.value = baseFreq;
        modulator.type = 'lowpass';
        modulator.frequency
            .setValueAtTime(baseFreq, now)
            .setValueAtTime(baseFreq, modDelay)
            .setTargetAtTime(peekFreq, modDelay, parseFloat("" + (instrument.modAttack) + 1)) // For FireFox fix
            .setValueAtTime(peekFreq, modHold)
            .linearRampToValueAtTime(sustainFreq, modDecay);


        // filter
        //filter = this.filter = ctx.createBiquadFilter();
        //filter.type = 'lowpass';
        //filter.frequency.value = this.ctx.sampleRate / 2;
        //filter.gain.value = 0;
        //filter.Q.value = 0;
        //  goog.global.console.log(this.sampleRate, 'Hz');
        //  filter.frequency.value = (cutOffFrequency / this.sampleRate) * 100000;	// Brightness = 0 ~ 127  64 = 350 / LPF 100~20000
        //  goog.global.console.log('Brightness:', cutOffFrequency, ' = ', filter.frequency.value, 'Hz');
        //  filter.Q.value = harmonicContent < 0 ? 0 : harmonicContent - 64 ;	// Resonance 0 ~ 127 / Q = 0~50
        //  goog.global.console.log('Resonance:', harmonicContent, ' = ', filter.Q.value);

        // connect
        bufferSource.connect(modulator);
        modulator.connect(panner);
        panner.connect(this.expressionGain);

        //  this.expressionGain.connect(filter);
        //  filter.connect(output);
        this.expressionGain.connect(output);

        if (!instrument.mute) {
            this.connect();
        }

        // fire
        bufferSource.start(0, startTime);
    };

    /**
     * @param {number} val
     * @returns {number}
     */
    private amountToFreq(val: number): number {
        return Math.pow(2, (val - 6900) / 1200) * 440;
    };

    public noteOff() {
        this.noteOffState = true;
    };

    public isNoteOff(): boolean {
        return this.noteOffState;
    };

    public release() {
        let instrument = this.instrument;
        let bufferSource = this.bufferSource;
        let output = this.gainOutput;
        let now = this.ctx.currentTime;
        let release = instrument.releaseTime - 64;

        //---------------------------------------------------------------------------
        // volume release time
        //---------------------------------------------------------------------------
        let volEndTimeTmp = instrument.volRelease * output.gain.value;
        let volEndTime = now + (volEndTimeTmp * (1 + release / (release < 0 ? 64 : 63)));
        //let volEndTime = now + instrument.volRelease * (1 - instrument.volSustain);

        //---------------------------------------------------------------------------
        // modulation release time
        //---------------------------------------------------------------------------
        //let filter = this.filter;
        let modulator = this.modulator;
        let baseFreq = this.amountToFreq(instrument.initialFilterFc);
        /** @type {number} */
        let peekFreq = this.amountToFreq(instrument.initialFilterFc + instrument.modEnvToFilterFc);
        /** @type {number} */
        let modEndTime = now + instrument.modRelease *
            (
                baseFreq === peekFreq ?
                    1 :
                    (modulator.frequency.value - baseFreq) / (peekFreq - baseFreq)
            );
        //let modEndTime = now + instrument.modRelease * (1 - instrument.modSustain);

        if (!this.audioBuffer) {
            return;
        }

        //---------------------------------------------------------------------------
        // Release
        //---------------------------------------------------------------------------

        switch (instrument.sampleModes) {
            case 0:
                break;
            case 1:
                output.gain.cancelScheduledValues(0);
                output.gain.setValueAtTime(output.gain.value, now);
                output.gain.linearRampToValueAtTime(0, volEndTime);

                modulator.frequency.cancelScheduledValues(0);
                modulator.frequency.setValueAtTime(modulator.frequency.value, now);
                modulator.frequency.linearRampToValueAtTime(baseFreq, modEndTime);

                bufferSource.playbackRate.cancelScheduledValues(0);
                bufferSource.playbackRate.setValueAtTime(bufferSource.playbackRate.value, now);
                bufferSource.playbackRate.linearRampToValueAtTime(this.computedPlaybackRate, modEndTime);

                bufferSource.stop(volEndTime);
                break;
            case 2:
                console.log('detect unused sampleModes');
                break;
            case 3:
                bufferSource.loop = false;
                break;
        }
    };

    public connect() {
        this.gainOutput.connect(this.destination);
    };

    public disconnect() {
        this.gainOutput.disconnect(0);
    };

    public schedulePlaybackRate() {
        let playbackRate = this.bufferSource.playbackRate;
        let computed = this.computedPlaybackRate;
        let start = this.startTime;
        let instrument = this.instrument;
        let modAttack = start + instrument.modAttack;
        let modDecay = modAttack + instrument.modDecay;
        let peekPitch = computed * Math.pow(
            this.ROOT12,
            this.modEnvToPitch * this.instrument.scaleTuning
        );

        //console.log(computed, start);

        playbackRate.cancelScheduledValues(0);
        playbackRate.setValueAtTime(computed, start);
        playbackRate.linearRampToValueAtTime(peekPitch, modAttack);
        playbackRate.linearRampToValueAtTime(computed + (peekPitch - computed) * (1 - instrument.modSustain), modDecay);
    };

    public updateExpression(expression) {
        this.expressionGain.gain.value = (this.expression = expression) / 127;
    };

    /**
     * @param {number} pitchBend
     */
    public updatePitchBend(pitchBend) {
        this.computedPlaybackRate = this.playbackRate * Math.pow(
            this.ROOT12,
            (pitchBend / (pitchBend < 0 ? 8192 : 8191)) *
            this.pitchBendSensitivity *
            this.instrument.scaleTuning
        );
        this.schedulePlaybackRate();
    }
}