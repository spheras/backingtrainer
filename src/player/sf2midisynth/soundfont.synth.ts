import { SoundFontParser } from './sf2.parser';
import { SoundFontSynthesizerNote } from './soundfont.synth.note';

export class SoundFontSynthesizer {
    public static DEFAULT_IR =
    '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eLkMRk9C2G8VIIBq4G4LYqRgjL1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS7/+yBE+AEQuBjFyEAcChmACKkAAAFB7F8SwIBJKECNIqQQCVw1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRPyFcJIXRLAgMloRgDiGDAAAAbQDECAAACAygCJgAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE8Y9QdQDEsAAACA+C+LkEA01AAAH+AAAAICcAIhQAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EETojfAyAMMAAAAACCAIgAAAAYDcARAgAAAAAoAiwAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRN2P8AAAf4AAAAgAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EETdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRN2P8AAAf4AAAAgAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EETdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRN2P8AAAf4AAAAgAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EETdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRN2P8AAAf4AAAAgAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EETdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQRN2P8AAAf4AAAAgAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';


    private input: Uint8Array;
    private parser: SoundFontParser;
    private bank: number;
    private bankSet: any[];
    private bufferSize: number;
    private ctx: AudioContext;
    private gainMaster: GainNode;
    private bufSrc: AudioBufferSourceNode;
    private channelInstrument: number[];
    private channelVolume: number[];
    private channelPanpot: number[];
    private channelPitchBend: number[];
    private channelPitchBendSensitivity: number[];
    private channelExpression: number[];
    private channelRelease: number[];
    private channelHold: boolean[];
    private channelBankMsb: number[];
    private channelBankLsb: number[];
    public harmonicContent: number[];
    public cutOffFrequency: number[];
    public isGS: boolean;
    public isXG: boolean;
    private channelMute: boolean[];
    private currentNoteOn: [SoundFontSynthesizerNote[]];
    private baseVolume: number;
    private masterVolume: number;
    private percussionPart: boolean[];
    private percussionVolume: number[];
    private reverb: boolean;
    private reverbNode: ConvolverNode;
    private reverbLevel: GainNode;
    private ir: AudioBuffer;


    /**
     * @constructor
     */
    constructor(input: Uint8Array) {
        let i: number;
        let il: number;
        this.input = input;
        this.bank = 0;
        this.bufferSize = 1024;
        this.ctx = this.getAudioContext(44100);
        this.gainMaster = this.ctx.createGain();
        this.bufSrc = this.ctx.createBufferSource();
        this.channelInstrument = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.channelVolume = [127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127];
        this.channelPanpot = [64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64];
        this.channelPitchBend = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.channelPitchBendSensitivity = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        this.channelExpression = [127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127];
        this.channelRelease = [64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64];
        this.channelHold = [
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false
        ];
        this.channelBankMsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0];
        this.channelBankLsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.harmonicContent = [64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64];
        this.cutOffFrequency = [64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64];

        this.isGS = false;
        this.isXG = false;

        this.channelMute = [
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false
        ];
        this.currentNoteOn = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        /** @type {number} @const */
        this.baseVolume = 1 / 0xffff;
        /** @type {number} */
        this.masterVolume = 16384;

        /** @type {Array.<boolean>} */
        this.percussionPart = [
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false
        ];

        this.percussionVolume = new Array(128);
        for (i = 0, il = this.percussionVolume.length; i < il; ++i) {
            this.percussionVolume[i] = 127;
        }

        this.reverb = false;
        this.reverbNode = this.ctx.createConvolver();
        this.reverbLevel = this.ctx.createGain();

        this.loadIR(this.IR());
    };

    /**
     * @param {number|null} desiredSampleRate
     * @returns {AudioContext}
     */
    private getAudioContext(desiredSampleRate) {
        let context: AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext || (<any>window).mozAudioContext)();

        desiredSampleRate = typeof desiredSampleRate === 'number' ?
            desiredSampleRate :
            44100;

        // Check if hack is necessary. Only occurs in iOS6+ devices
        // and only when you first boot the iPhone, or play a audio/video
        // with a different sample rate
        if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
            context.sampleRate !== desiredSampleRate) {

            let buffer = context.createBuffer(1, 1, desiredSampleRate);
            let dummy = context.createBufferSource();
            dummy.buffer = buffer;
            dummy.connect(context.destination);
            dummy.start(0);
            dummy.disconnect();

            context.close(); // dispose old context
            context = new ((<any>window).AudioContext || (<any>window).webkitAudioContext || (<any>window).mozAudioContext)();
        }

        if ((<any>context).createGainNode === void 0) {
            (<any>context).createGainNode = context.createGain;
        }

        return context;
    };

    /**
     * GM Synth set
     * http://amei.or.jp/specifications/GM2_japanese.pdf
     * @type {Array.<string>}
     * @const
     */
    public static programNames: string[] = [
        "Acoustic Piano",
        "Bright Acoustic Piano",
        "Electric Grand Piano",
        "Honky-tonk Piano",
        "Electric Piano",
        "Electric Piano 2",
        "Harpsichord",
        "Clavi",
        "Celesta",
        "Glockenspiel",
        "Musical box",
        "Vibraphone",
        "Marimba",
        "Xylophone",
        "Tubular Bell",
        "Dulcimer",
        "Drawbar Organ",
        "Percussive Organ",
        "Rock Organ",
        "Church organ",
        "Reed organ",
        "Accordion",
        "Harmonica",
        "Tango Accordion",
        "Acoustic Guitar (nylon)",
        "Acoustic Guitar (steel)",
        "Electric Guitar (jazz)",
        "Electric Guitar (clean)",
        "Electric Guitar (muted)",
        "Overdriven Guitar",
        "Distortion Guitar",
        "Guitar Harmonics",
        "Acoustic Bass",
        "Electric Bass (finger)",
        "Electric Bass (pick)",
        "Fretless Bass",
        "Slap Bass 1",
        "Slap Bass 2",
        "Synth Bass 1",
        "Synth Bass 2",
        "Violin",
        "Viola",
        "Cello",
        "Double bass",
        "Tremolo Strings",
        "Pizzicato Strings",
        "Orchestral Harp",
        "Timpani",
        "String Ensemble 1",
        "String Ensemble 2",
        "Synth Strings 1",
        "Synth Strings 2",
        "Voice Aahs",
        "Voice Oohs",
        "Synth Voice",
        "Orchestra Hit",
        "Trumpet",
        "Trombone",
        "Tuba",
        "Muted Trumpet",
        "French horn",
        "Brass Section",
        "Synth Brass 1",
        "Synth Brass 2",
        "Soprano Sax",
        "Alto Sax",
        "Tenor Sax",
        "Baritone Sax",
        "Oboe",
        "English Horn",
        "Bassoon",
        "Clarinet",
        "Piccolo",
        "Flute",
        "Recorder",
        "Pan Flute",
        "Blown Bottle",
        "Shakuhachi",
        "Whistle",
        "Ocarina",
        "Lead 1 (square)",
        "Lead 2 (sawtooth)",
        "Lead 3 (calliope)",
        "Lead 4 (chiff)",
        "Lead 5 (charang)",
        "Lead 6 (voice)",
        "Lead 7 (fifths)",
        "Lead 8 (bass + lead)",
        "Pad 1 (new age)",
        "Pad 2 (warm)",
        "Pad 3 (polysynth)",
        "Pad 4 (choir)",
        "Pad 5 (bowed)",
        "Pad 6 (metallic)",
        "Pad 7 (halo)",
        "Pad 8 (sweep)",
        "FX 1 (rain)",
        "FX 2 (soundtrack)",
        "FX 3 (crystal)",
        "FX 4 (atmosphere)",
        "FX 5 (brightness)",
        "FX 6 (goblins)",
        "FX 7 (echoes)",
        "FX 8 (sci-fi)",
        "Sitar",
        "Banjo",
        "Shamisen",
        "Koto",
        "Kalimba",
        "Bagpipe",
        "Fiddle",
        "Shanai",
        "Tinkle Bell",
        "Agogo",
        "Steel Drums",
        "Woodblock",
        "Taiko Drum",
        "Melodic Tom",
        "Synth Drum",
        "Reverse Cymbal",
        "Guitar Fret Noise",
        "Breath Noise",
        "Seashore",
        "Bird Tweet",
        "Telephone Ring",
        "Helicopter",
        "Applause",
        "Gunshot"
    ];

    /**
     * GM2 Drum Set List
     * @type {Array.<string>}
     * @const
     */
    public static percussionProgramNames: string[] = [
        "Standard Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Room Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Power Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Electronic Set",
        "Analog Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "Jazz Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Brush Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Orchestra Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "SFX Set",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "" //CM-64/CM-32L
    ];

    public init() {
        let i: number;

        this.parser = new SoundFontParser(this.input, { sampleRate: this.ctx.sampleRate });
        this.bankSet = this.createAllInstruments();

        // reverbNode
        if (this.ir !== void 0) {
            this.reverbNode.buffer = this.ir;
        }
        this.reverbLevel.gain.value = 1;

        this.isXG = false;
        this.isGS = false;

        for (i = 0; i < 16; ++i) {
            this.programChange(i, 0x00);
            this.volumeChange(i, 0x64);
            this.panpotChange(i, 0x40);
            this.pitchBend(i, 0x00, 0x40); // 8192
            this.pitchBendSensitivity(i, 2);
            this.channelHold[i] = false;
            this.channelExpression[i] = 127;
            this.bankSelectMsb(i, i === 9 ? 128 : 0x00);
            this.bankSelectLsb(i, 0x00);
            this.setPercussionPart(i, false);
        }

        for (i = 0; i < 128; ++i) {
            this.percussionVolume[i] = 127;
        }
    };

    /**
     * @param {Uint8Array} input
     */
    public refreshInstruments(input: Uint8Array) {
        this.input = input;
        this.parser = new SoundFontParser(input);
        this.bankSet = this.createAllInstruments();
    };

    private createAllInstruments(): any[] {
        let parser = this.parser;
        parser.parse();
        let presets: any[] = parser.createPreset();
        let instruments = parser.createInstrument();
        let banks = [];
        let bank: [any];
        /** @type {Object} TODO */
        let preset;
        /** @type {Object} */
        let instrument;
        let presetNumber: number;
        let i: number;
        let il: number;
        let j: number;
        let jl: number;

        for (i = 0, il = presets.length; i < il; ++i) {
            preset = presets[i];
            presetNumber = preset.header.preset;

            if (typeof preset.instrument !== 'number') {
                continue;
            }

            instrument = instruments[preset.instrument];
            if (instrument.name.replace(/\0*$/, '') === 'EOI') {
                continue;
            }

            // select bank
            if (banks[preset.header.bank] === void 0) {
                banks[preset.header.bank] = [];
            }
            bank = banks[preset.header.bank];
            bank[presetNumber] = {};
            bank[presetNumber].name = preset.name;

            for (j = 0, jl = instrument.info.length; j < jl; ++j) {
                this.createNoteInfo(parser, instrument.info[j], bank[presetNumber]);
            }
        }

        return banks;
    };

    private createNoteInfo(parser, info, preset) {
        let generator = info.generator;
        let sampleId: number;
        let sampleHeader: any;
        let volDelay: number;
        let volAttack: number;
        let volHold: number;
        let volDecay: number;
        let volSustain: number;
        let volRelease: number;
        let modDelay: number;
        let modAttack: number;
        let modHold: number;
        let modDecay: number;
        let modSustain: number;
        let modRelease: number;
        let tune: number;
        let scale: number;
        let freqVibLFO: number;
        let i: number;
        let il: number;
        let pan: number;

        if (generator['keyRange'] === void 0 || generator['sampleID'] === void 0) {
            return;
        }

        volDelay = this.getModGenAmount(generator, 'delayVolEnv', -12000);
        volAttack = this.getModGenAmount(generator, 'attackVolEnv', -12000);
        volHold = this.getModGenAmount(generator, 'holdVolEnv', -12000);
        volDecay = this.getModGenAmount(generator, 'decayVolEnv', -12000);
        volSustain = this.getModGenAmount(generator, 'sustainVolEnv');
        volRelease = this.getModGenAmount(generator, 'releaseVolEnv', -12000);
        modDelay = this.getModGenAmount(generator, 'delayModEnv', -12000);
        modAttack = this.getModGenAmount(generator, 'attackModEnv', -12000);
        modHold = this.getModGenAmount(generator, 'holdModEnv', -12000);
        modDecay = this.getModGenAmount(generator, 'decayModEnv', -12000);
        modSustain = this.getModGenAmount(generator, 'sustainModEnv');
        modRelease = this.getModGenAmount(generator, 'releaseModEnv', -12000);

        tune = (
            this.getModGenAmount(generator, 'coarseTune') +
            this.getModGenAmount(generator, 'fineTune') / 100
        );
        scale = this.getModGenAmount(generator, 'scaleTuning', 100) / 100;
        freqVibLFO = this.getModGenAmount(generator, 'freqVibLFO');
        pan = this.getModGenAmount(generator, 'pan');

        for (i = generator['keyRange'].lo, il = generator['keyRange'].hi; i <= il; ++i) {
            if (preset[i]) {
                continue;
            }

            sampleId = this.getModGenAmount(generator, 'sampleID');


            sampleHeader = parser.sampleHeader[sampleId];
            preset[i] = {
                'sample': parser.samples[sampleId],
                'sampleRate': sampleHeader.sampleRate,
                'sampleModes': this.getModGenAmount(generator, 'sampleModes'),
                'basePlaybackRate': Math.pow(
                    Math.pow(2, 1 / 12),
                    (
                        i -
                        this.getModGenAmount(generator, 'overridingRootKey', sampleHeader.originalPitch) +
                        tune + (sampleHeader.pitchCorrection / 100)
                    ) * scale
                ),
                'modEnvToPitch': this.getModGenAmount(generator, 'modEnvToPitch') / 100,
                'scaleTuning': scale,
                'start': this.getModGenAmount(generator, 'startAddrsCoarseOffset') * 32768 +
                this.getModGenAmount(generator, 'startAddrsOffset'),
                'end': this.getModGenAmount(generator, 'endAddrsCoarseOffset') * 32768 +
                this.getModGenAmount(generator, 'endAddrsOffset'),
                'loopStart': (
                    //(sampleHeader.startLoop - sampleHeader.start) +
                    (sampleHeader.startLoop) +
                    this.getModGenAmount(generator, 'startloopAddrsCoarseOffset') * 32768 +
                    this.getModGenAmount(generator, 'startloopAddrsOffset')
                ),
                'loopEnd': (
                    //(sampleHeader.endLoop - sampleHeader.start) +
                    (sampleHeader.endLoop) +
                    this.getModGenAmount(generator, 'endloopAddrsCoarseOffset') * 32768 +
                    this.getModGenAmount(generator, 'endloopAddrsOffset')
                ),
                'volDelay': Math.pow(2, volDelay / 1200),
                'volAttack': Math.pow(2, volAttack / 1200),
                'volHold': Math.pow(2, volHold / 1200) *
                Math.pow(2, (60 - i) * this.getModGenAmount(generator, 'keynumToVolEnvHold') / 1200),
                'volDecay': Math.pow(2, volDecay / 1200) *
                Math.pow(2, (60 - i) * this.getModGenAmount(generator, 'keynumToVolEnvDecay') / 1200),
                'volSustain': volSustain / 1000,
                'volRelease': Math.pow(2, volRelease / 1200),
                'modDelay': Math.pow(2, modDelay / 1200),
                'modAttack': Math.pow(2, modAttack / 1200),
                'modHold': Math.pow(2, modHold / 1200) *
                Math.pow(2, (60 - i) * this.getModGenAmount(generator, 'keynumToModEnvHold') / 1200),
                'modDecay': Math.pow(2, modDecay / 1200) *
                Math.pow(2, (60 - i) * this.getModGenAmount(generator, 'keynumToModEnvDecay') / 1200),
                'modSustain': modSustain / 1000,
                'modRelease': Math.pow(2, modRelease / 1200),
                'initialFilterFc': this.getModGenAmount(generator, 'initialFilterFc', 13500),
                'modEnvToFilterFc': this.getModGenAmount(generator, 'modEnvToFilterFc'),
                'initialFilterQ': this.getModGenAmount(generator, 'initialFilterQ'),
                'reverbEffectSend': this.getModGenAmount(generator, 'reverbEffectSend'),
                'initialAttenuation': this.getModGenAmount(generator, 'initialAttenuation'),
                'freqVibLFO': freqVibLFO ? Math.pow(2, freqVibLFO / 1200) * 8.176 : void 0,
                'pan': pan ? pan / 1200 : void 0
            };
        }
    };

    /**
     * @param {Object} generator
     * @param {string} enumeratorType
     * @param {number=} opt_default
     * @returns {number}
     */
    private getModGenAmount(generator, enumeratorType, opt_default?) {
        if (opt_default === void 0) {
            opt_default = 0;
        }

        return generator[enumeratorType] ? generator[enumeratorType].amount : opt_default;
    };

    /**
     * @param {string} string
     * @returns {ArrayBuffer|null}
     */
    private base64ToArrayBuffer(string) {
        let binary_string: string = atob(string);
        let len: number = binary_string.length;
        let bytes: Uint8Array = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };

    /**
     * @returns {ArrayBuffer}
     */
    private IR() {
        return (<any>this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate)).buffer =
            this.base64ToArrayBuffer(SoundFontSynthesizer.DEFAULT_IR);
    }

    private connect() {
        this.bufSrc.connect(this.gainMaster);
        this.gainMaster.connect(this.ctx.destination);

        if (this.reverb) {
            this.connectReverb();
        }
    }

    private connectReverb() {
        this.gainMaster.connect(this.reverbNode);
        this.reverbNode.connect(this.reverbLevel);
        this.reverbLevel.connect(this.ctx.destination);
    }

    public start() {
        this.connect();
        this.bufSrc.start(0);
        this.setMasterVolume(16383);
    }

    public setMasterVolume(volume) {
        this.masterVolume = volume;
        this.gainMaster.gain.value = this.baseVolume * (volume / 16384);
    }

    /**
     * @param {AudioBuffer|ArrayBuffer} ir
     */
    private loadIR(ir: AudioBuffer | ArrayBuffer) {
        let t = this;
        if (ir instanceof ArrayBuffer) {
            this.ctx.decodeAudioData(ir, function (buffer) {
                t.ir = buffer;
                t.reverbNode.buffer = buffer;
            });
        }
    };

    public stop() {
        this.disconnect();
    }

    public disconnect() {
        this.bufSrc.disconnect(0);
        this.gainMaster.disconnect(0);
        this.disconnectReverb();
    };

    private disconnectReverb() {
        this.reverbNode.disconnect(0);
        this.reverbLevel.disconnect(0);
    };

    public setReverb(reverb) {
        if (this.reverb === reverb) {
            return;
        }

        this.disconnectReverb();
        this.reverb = reverb;
        if (reverb) {
            this.connectReverb();
        }
    };

    /**
     * @param {number} channel NoteOn するチャンネル.
     * @param {number} key NoteOn するキー.
     * @param {number} velocity 強さ.
     */
    public noteOn = function (channel, key, velocity) {
        let bankIndex: number = this.getBank(channel);
        let bank = this.bankSet[bankIndex];
        let instrument = bank[this.channelInstrument[channel]];
        let instrumentKey;
        let note: SoundFontSynthesizerNote;

        if (instrument === void 0) {

            instrument = this.bankSet[0][this.channelInstrument[channel]];
            // TODO
            console.warn(
                "instrument not found: bank=%s instrument=%s channel=%s",
                bankIndex,
                this.channelInstrument[channel],
                channel
            );
        }

        if (instrument[key] === void 0) {
            // TODO
            console.warn(
                "instrument not found: bank=%s instrument=%s channel=%s key=%s",
                bankIndex,
                this.channelInstrument[channel],
                channel,
                key
            );
            return;
        }
        instrumentKey = instrument[key];

        let panpot = this.channelPanpot[channel] - 64;
        panpot /= panpot < 0 ? 64 : 63;

        // create note information
        instrumentKey['channel'] = channel;
        instrumentKey['key'] = key;
        instrumentKey['velocity'] = velocity;
        instrumentKey['panpot'] = panpot;
        instrumentKey['volume'] = this.channelVolume[channel] / 127;
        instrumentKey['pitchBend'] = this.channelPitchBend[channel] - 8192;
        instrumentKey['expression'] = this.channelExpression[channel];
        instrumentKey['pitchBendSensitivity'] = Math.round(this.channelPitchBendSensitivity[channel]);
        instrumentKey['mute'] = this.channelMute[channel];
        instrumentKey['releaseTime'] = this.channelRelease[channel];
        instrumentKey['cutOffFrequency'] = this.cutOffFrequency[channel];
        instrumentKey['harmonicContent'] = this.harmonicContent[channel];

        // percussion
        if (this.percussionPart[channel]) {
            /*
                if (key === 42 || key === 44){
                  // 42: Closed Hi-Hat
                  // 44: Pedal Hi-Hat
                  // 46: Open Hi-Hat
                  this.noteOff(channel, 46, 0);
                }
                if (key === 80) {
                  // 80: Mute Triangle
                  // 81: Open Triangle
                  this.noteOff(channel, 81, 0);
                }
            */
            instrument['volume'] *= this.percussionVolume[key] / 127;
        }

        // note on
        note = new SoundFontSynthesizerNote(this.ctx, this.gainMaster, instrumentKey);
        note.noteOn();
        this.currentNoteOn[channel].push(note);
    };

    /**
     * @param {number} channel NoteOff するチャンネル.
     * @param {number} key NoteOff するキー.
     * @param {number} velocity 強さ.
     */
    public noteOff(channel, key, velocity) {
        //unused let bankIndex: number = this.getBank(channel);
        //unused let bank = this.bankSet[bankIndex];
        let i: number;
        let il: number;
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];
        let note: SoundFontSynthesizerNote;
        let hold: boolean = this.channelHold[channel];

        for (i = 0, il = currentNoteOn.length; i < il; ++i) {
            note = currentNoteOn[i];
            if (note.key === key) {
                note.noteOff();

                // hold している時は NoteOff にはするがリリースはしない
                if (!hold) {
                    note.release();
                    currentNoteOn.splice(i, 1);
                    --i;
                    --il;
                }
            }
        }
    };

    public hold(channel, value) {
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];
        let hold: boolean = this.channelHold[channel] = !(value < 64);
        let note: SoundFontSynthesizerNote;
        let i: number;
        let il: number;

        if (!hold) {
            for (i = 0, il = currentNoteOn.length; i < il; ++i) {
                note = currentNoteOn[i];
                if (note.isNoteOff()) {
                    note.release();
                    currentNoteOn.splice(i, 1);
                    --i;
                    --il;
                }
            }
        }
    };

    /**
     * @param {number} channel チャンネルのバンクセレクトMSB
     * @param {number} value 値
     */
    public bankSelectMsb(channel, value) {
        this.channelBankMsb[channel] = value;
    };

    /**
     * @param {number} channel チャンネルのバンクセレクトLSB
     * @param {number} value 値
     */
    public bankSelectLsb = function (channel, value) {
        this.channelBankLsb[channel] = value;
    };

    /**
     * @param {number} channel 音色を変更するチャンネル.
     * @param {number} instrument 音色番号.
     */
    public programChange(channel, instrument) {
        this.channelInstrument[channel] = instrument;
    };

    /**
     * @param {number} channel 音量を変更するチャンネル.
     * @param {number} volume 音量(0-127).
     */
    public volumeChange(channel, volume) {
        this.channelVolume[channel] = volume;
    };

    public expression(channel, expression) {
        let i: number;
        let il: number;
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];

        for (i = 0, il = currentNoteOn.length; i < il; ++i) {
            currentNoteOn[i].updateExpression(expression);
        }

        this.channelExpression[channel] = expression;
    };

    /**
     * @param {number} channel panpot を変更するチャンネル.
     * @param {number} panpot panpot(0-127).
     */
    public panpotChange(channel, panpot) {
        this.channelPanpot[channel] = panpot;
    };

    /**
     * @param {number} channel panpot を変更するチャンネル.
     * @param {number} lowerByte
     * @param {number} higherByte
     */
    public pitchBend(channel, lowerByte, higherByte) {
        let bend: number = (lowerByte & 0x7f) | ((higherByte & 0x7f) << 7);
        let i: number;
        let il: number;
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];
        let calculated: number = bend - 8192;

        for (i = 0, il = currentNoteOn.length; i < il; ++i) {
            currentNoteOn[i].updatePitchBend(calculated);
        }

        this.channelPitchBend[channel] = bend;
    };

    /**
     * @param {number} channel pitch bend sensitivity を変更するチャンネル.
     * @param {number} sensitivity
     */
    public pitchBendSensitivity(channel, sensitivity) {
        this.channelPitchBendSensitivity[channel] = sensitivity;
    }

    public releaseTime(channel, releaseTime) {
        this.channelRelease[channel] = releaseTime;
    }

    /**
     * @param {number} channel pitch bend sensitivity を取得するチャンネル.
     */
    public getPitchBendSensitivity(channel) {
        return this.channelPitchBendSensitivity[channel];
    }

    public drumInstrumentLevel(key, volume) {
        this.percussionVolume[key] = volume;
    }

    /**
     * @param {number} channel NoteOff するチャンネル.
     */
    public allNoteOff(channel) {
        /** @type {Array.<SoundFont.SynthesizerNote>} */
        let currentNoteOn = this.currentNoteOn[channel];

        while (currentNoteOn.length > 0) {
            this.noteOff(channel, currentNoteOn[0].key, 0);
        }
    };

    /**
     * @param {number} channel 音を消すチャンネル.
     */
    public allSoundOff(channel) {
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];
        let note: SoundFontSynthesizerNote;

        while (currentNoteOn.length > 0) {
            note = currentNoteOn.shift();
            this.noteOff(channel, note.key, 0);
            note.release();
            note.disconnect();
        }
    };

    /**
     * @param {number} channel リセットするチャンネル
     */
    public resetAllControl(channel) {
        this.expression(channel, 127);
        this.pitchBend(channel, 0x00, 0x40);
        this.hold(channel, 0);
    };

    /**
     * @param {number} channel ミュートの設定を変更するチャンネル.
     * @param {boolean} mute ミュートにするなら true.
     */
    public mute(channel, mute) {
        let currentNoteOn: SoundFontSynthesizerNote[] = this.currentNoteOn[channel];
        let i: number;
        let il: number;

        this.channelMute[channel] = mute;

        if (mute) {
            for (i = 0, il = currentNoteOn.length; i < il; ++i) {
                currentNoteOn[i].disconnect();
            }
        } else {
            for (i = 0, il = currentNoteOn.length; i < il; ++i) {
                currentNoteOn[i].connect();
            }
        }
    };

    /**
     * @param {number} channel バンクを変更するチャンネル.
     */
    public getBank(channel) {
        /** @type {number} */
        let bankIndex = 0;

        if (channel === 9) {
            this.setPercussionPart(9, true);
            return this.isXG ? 127 : 128;
        }

        if (this.isXG) {
            // XG音源は、MSB→LSBの優先順でバンクセレクトをする。
            if (this.channelBankMsb[channel] === 64) {
                // Bank Select MSB #64 (Voice Type: SFX)
                bankIndex = 125;
            } else if (this.channelBankMsb[channel] === 126 || this.channelBankMsb[channel] === 127) {
                // Bank Select MSB #126 (Voice Type: Drum)
                // Bank Select MSB #127 (Voice Type: Drum)
                bankIndex = this.channelBankMsb[channel];
            } else {
                // Bank Select MSB #0 (Voice Type: Normal)
                //bankIndex = this.channelBankLsb[channel];  // 本来こちらが正しいが、バンクの存在しない楽器の処理ができていないためコメントアウト
                bankIndex = 0;
            }
        } else if (this.isGS) {
            // GS音源
            bankIndex = 0;

            if (this.percussionPart[channel]) {
                // http://www.roland.co.jp/support/by_product/sd-20/knowledge_base/1826700/
                bankIndex = 128;
            } else {
                //bankIndex = this.channelBankMsb[channel];
            }
        } else {
            // GM音源の場合バンクセレクト無効化
            bankIndex = 0;
        }
        /*
          if (this.percussionPart[channel] && SoundFont.Synthesizer.PercussionProgramNames[this.channelInstrument[channel]] === ''){
            // パーカッションチャンネルで、GM 2に存在しないドラムセットが呼び出された時は、Standard Setを呼び出す。
            this.channelInstrument[channel] = 0;
          }
        */
        return bankIndex;
    }

    /**
     * @param {number} channel TODO:ドラムパートとしてセットするチャンネル
     * @param {boolean} sw ドラムか通常かのスイッチ
     */
    public setPercussionPart(channel, sw) {
        this.percussionPart[channel] = sw;
    }
}