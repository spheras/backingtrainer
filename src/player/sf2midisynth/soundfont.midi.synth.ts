import { SoundFontSynthesizer } from './soundfont.synth';

export class SoundFontMidiSynth {
    private NrpnMsb: number[];
    private NrpnLsb: number[];
    private RpnMsb: number[];
    private RpnLsb: number[];
    private synth: SoundFontSynthesizer;
    private rpnMode: boolean;
    private option: any;
    private cache: boolean;

    /**
     * @constructor
     */
    constructor(option?) {
        this.NrpnMsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.NrpnLsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.RpnMsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.RpnLsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.rpnMode = true;
        this.option = option || {};
        if (option && option.cache) {
            this.cache = option.cache !== void 0;
        }
    };

    public setReverb(reverb) {
        this.synth.setReverb(reverb);
    };

    /**
     * @param {Uint8Array} input
     */
    public loadSoundFont(input: Uint8Array) {
        var synth: SoundFontSynthesizer;

        if (!this.synth) {
            synth = this.synth = new SoundFontSynthesizer(input);
            synth.init();
            synth.start();
        } else {
            synth = this.synth;
            synth.refreshInstruments(input);
        }
    };

    /**
     * @param {Array.<number>} message
     */
    public processMidiMessage(message: any[]) {
        var channel: number = message[0] & 0x0f;
        var synth = this.synth;

        switch (message[0] & 0xf0) {
            case 0x80: // NoteOff: 8n kk vv
                synth.noteOff(channel, message[1], message[2]);
                break;
            case 0x90: // NoteOn: 9n kk vv
                if (message[2] > 0) {
                    synth.noteOn(channel, message[1], message[2]);
                } else {
                    synth.noteOff(channel, message[1], 0);
                }
                break;
            case 0xB0: // Control Change: Bn cc dd
                var value: number = message[2];
                switch (message[1]) {
                    case 0x00: // Bank Select MSB: Bn 00 dd
                        synth.bankSelectMsb(channel, value);
                        break;
                    case 0x01: // Modulation
                        break;
                    case 0x06: // Data Entry(MSB): Bn 06 dd
                        if (this.rpnMode) {
                            // RPN
                            switch (this.RpnMsb[channel]) {
                                case 0:
                                    switch (this.RpnLsb[channel]) {
                                        case 0: // Pitch Bend Sensitivity
                                            synth.pitchBendSensitivity(channel, value);
                                            break;
                                        case 1:
                                            //console.log("fine");
                                            break;
                                        case 2:
                                            //console.log("coarse");
                                            break;
                                        default:
                                            //console.log("default");
                                            break;
                                    }
                                    break;
                                default:
                                    //console.log("default:", this.RpnMsb[channel], this.RpnLsb[channel]);
                                    break;
                            }
                        } else {
                            // NRPN
                            switch (this.NrpnMsb[channel]) {
                                case 26: // Drum Instrument Level
                                    synth.drumInstrumentLevel(this.NrpnLsb[channel], value);
                                    break;
                                default:
                                    //console.log("default:", this.RpnMsb[channel], this.RpnLsb[channel]);
                                    break;
                            }
                        }
                        break;
                    case 0x26: // Data Entry(LSB): Bn 26 dd
                        if (this.rpnMode) {
                            // RPN
                            switch (this.RpnMsb[channel]) {
                                case 0:
                                    switch (this.RpnLsb[channel]) {
                                        case 0: // Pitch Bend Sensitivity
                                            synth.pitchBendSensitivity(
                                                channel,
                                                synth.getPitchBendSensitivity(channel) + value / 100
                                            );
                                            break;
                                        case 1:
                                            //console.log("fine");
                                            break;
                                        case 2:
                                            //console.log("coarse");
                                            break;
                                    }
                                    break;
                            }
                        }
                        // NRPN で LSB が必要なものは今のところない
                        break;
                    case 0x07: // Volume Change: Bn 07 dd
                        synth.volumeChange(channel, value);
                        break;
                    case 0x0A: // Panpot Change: Bn 0A dd
                        synth.panpotChange(channel, value);
                        break;
                    case 0x78: // All Sound Off: Bn 78 00
                        synth.allSoundOff(channel);
                        break;
                    case 0x79: // Reset All Control: Bn 79 00
                        synth.resetAllControl(channel);
                        break;
                    case 0x20: // BankSelect LSB: Bn 00 dd
                        synth.bankSelectLsb(channel, value);
                        break;
                    case 0x60: //
                        //console.log(60);
                        break;
                    case 0x61: //
                        //console.log(61);
                        break;
                    case 0x62: // NRPN LSB
                        this.rpnMode = false;
                        this.NrpnLsb[channel] = value;
                        break;
                    case 0x63: // NRPN MSB
                        this.rpnMode = false;
                        this.NrpnMsb[channel] = value;
                        break;
                    case 0x64: // RPN LSB
                        this.rpnMode = true;
                        this.RpnLsb[channel] = value;
                        break;
                    case 0x65: // RPN MSB
                        this.rpnMode = true;
                        this.RpnMsb[channel] = value;
                        break;
                    case 0x40: // Hold
                        synth.hold(channel, value);
                        break;
                    case 0x0b: // Expression
                        synth.expression(channel, value);
                        break;
                    case 0x47: // Cutoff Fequency (Brightness)
                        synth.cutOffFrequency[channel] = value;
                        break;
                    case 0x48: // DecayTyme
                        //          synth.decayTime[channel] = value;
                        break;
                    case 0x49: // ReleaseTime
                        synth.releaseTime(channel, value);
                        break;
                    case 0x4A: // Hermonic Content (Resonance)
                        synth.harmonicContent[channel] = value;
                        break;
                    default:
                        // not supported
                        break;
                }
                break;
            case 0xC0: // Program Change: Cn pp
                synth.programChange(channel, message[1]);
                break;
            case 0xE0: // Pitch Bend
                synth.pitchBend(channel, message[1], message[2]);
                break;
            case 0xf0: // System Exclusive Message
                // ID number
                switch (message[1]) {
                    case 0x7e: // non-realtime
                        // TODO
                        // GM Reset: F0 7E 7F 09 01 F7
                        if (message[2] === 0x7f && message[3] === 0x09 && message[4] === 0x01) {
                            synth.isXG = false;
                            synth.isGS = false;
                            synth.init();
                        }
                        break;
                    case 0x7f: // realtime
                        //unused - var device = message[2];
                        // sub ID 1
                        switch (message[3]) {
                            case 0x04: // device control
                                // sub ID 2
                                switch (message[4]) {
                                    case 0x01: // master volume: F0 7F 7F 04 01 [value] [value] F7
                                        synth.setMasterVolume(message[5] + (message[6] << 7));
                                        break;
                                }
                                break;
                        }
                        break;
                }

                // Vendor
                switch (message[2]) {
                    case 0x43: // Yamaha XG
                        if (message[5] === 0x08) {
                            // XG Dram Part: F0 43 [dev] 4C 08 [partNum] 07 [map] F7
                            // but there is no file to use much this parameter...
                            if (message[7] !== 0x00) { // [map]
                                synth.setPercussionPart(message[6], true);
                            } else {
                                synth.setPercussionPart(message[6], false);
                            }
                            //goog.global.console.log(message);
                        }
                        switch (message[7]) {
                            case 0x04:
                                // XG Master Volume: F0 43 [dev] 4C 00 00 04 [value] F7
                                synth.setMasterVolume((message[8] << 7) * 2);
                                //console.log(message[8] << 7);
                                break;
                            case 0x7E:
                                // XG Reset: F0 43 [dev] 4C 00 00 7E 00 F7
                                synth.init();
                                synth.isXG = true;
                                break;
                        }
                        break;
                    case 0x41: // Roland GS / TG300B Mode
                        // TODO
                        switch (message[8]) {
                            case 0x04:
                                // GS Master Volume: F0 41 [dev] 42 12 40 00 04 [value] 58 F7
                                synth.setMasterVolume(message[9] << 7);
                                break;
                            case 0x7F:
                                // GS Reset: F0 41 [dev] 42 12 40 00 7F 00 41 F7
                                synth.init();
                                synth.isGS = true;
                                break;
                            case 0x15:
                                // GS Dram part: F0 41 [dev] 42 12 40 1[part no] [Map] [sum] F7
                                // Notice: [sum] is ignroe in this program.
                                // http://www.ssw.co.jp/dtm/drums/drsetup.htm
                                // http://www.roland.co.jp/support/by_product/sd-20/knowledge_base/1826700/

                                var part = message[7] - 0x0F;
                                var map = message[8];
                                if (part === 0) {
                                    // 10 Ch.
                                    if (map !== 0x00) {
                                        synth.setPercussionPart(9, true);
                                    } else {
                                        synth.setPercussionPart(9, false);
                                    }
                                } else if (part >= 10) {
                                    // 1~9 Ch.
                                    if (map !== 0x00) {
                                        synth.setPercussionPart(part - 1, true);
                                    } else {
                                        synth.setPercussionPart(part - 1, false);
                                    }
                                } else {
                                    // 11~16 Ch.
                                    if (map !== 0x00) {
                                        synth.setPercussionPart(part, true);
                                    } else {
                                        synth.setPercussionPart(part, false);
                                    }
                                }
                                break;
                        }
                        break;
                }
                break;
            default: // not supported
                synth.setPercussionPart(9, true);
                break;
        }
    };

}