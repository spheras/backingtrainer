import { RiffParser, RiffChunk } from './riff.parser';


export class SoundFontParser {

    private input: ArrayBuffer;
    private parserOption;
    private sampleRate: number;
    private presetHeader: any[];
    private presetZone: any[];
    private presetZoneModulator: any[];
    private presetZoneGenerator: any[];
    private instrument: any[];
    private instrumentZone: any[];
    private instrumentZoneModulator: any[];
    private instrumentZoneGenerator: any[];
    private sampleHeader: any[];
    private samplingData: RiffChunk;
    private samples: any[];

    private static GeneratorEnumeratorTable = [
        'startAddrsOffset',
        'endAddrsOffset',
        'startloopAddrsOffset',
        'endloopAddrsOffset',
        'startAddrsCoarseOffset',
        'modLfoToPitch',
        'vibLfoToPitch',
        'modEnvToPitch',
        'initialFilterFc',
        'initialFilterQ',
        'modLfoToFilterFc',
        'modEnvToFilterFc',
        'endAddrsCoarseOffset',
        'modLfoToVolume', , // 14
        'chorusEffectsSend',
        'reverbEffectsSend',
        'pan', , , , // 18,19,20
        'delayModLFO',
        'freqModLFO',
        'delayVibLFO',
        'freqVibLFO',
        'delayModEnv',
        'attackModEnv',
        'holdModEnv',
        'decayModEnv',
        'sustainModEnv',
        'releaseModEnv',
        'keynumToModEnvHold',
        'keynumToModEnvDecay',
        'delayVolEnv',
        'attackVolEnv',
        'holdVolEnv',
        'decayVolEnv',
        'sustainVolEnv',
        'releaseVolEnv',
        'keynumToVolEnvHold',
        'keynumToVolEnvDecay',
        'instrument', , // 42
        'keyRange',
        'velRange',
        'startloopAddrsCoarseOffset',
        'keynum',
        'velocity',
        'initialAttenuation', , // 49
        'endloopAddrsCoarseOffset',
        'coarseTune',
        'fineTune',
        'sampleID',
        'sampleModes', , // 55
        'scaleTuning',
        'exclusiveClass',
        'overridingRootKey', // 59
        'endOper'
    ];

    /**
     * @param {ByteArray} input
     * @param {Object=} opt_params
     * @constructor
     */
    constructor(input, opt_params?) {
        opt_params = opt_params || {};
        this.input = input;
        this.parserOption = opt_params['parserOption'];
        this.sampleRate = opt_params['sampleRate'] || 22050; // よくわからんが、OSで指定されているサンプルレートを入れないと音が切れ切れになる。
    };

    public parse() {
        let parser = new RiffParser(this.input, this.parserOption);
        let chunk: RiffChunk;

        // parse RIFF chunk
        parser.parse();
        if (parser.chunkList.length !== 1) {
            throw new Error('wrong chunk length');
        }

        chunk = parser.getChunk(0);
        if (chunk === null) {
            throw new Error('chunk not found');
        }

        this.parseRiffChunk(chunk);
        //console.log(this.sampleHeader);
        this.input = null;
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseRiffChunk(chunk: RiffChunk) {
        let parser: RiffParser;
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let signature: string;

        // check parse target
        if (chunk.type !== 'RIFF') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        // check signature
        signature = String.fromCharCode(data[ip++], data[ip++], data[ip++], data[ip++]);
        if (signature !== 'sfbk') {
            throw new Error('invalid signature:' + signature);
        }

        // read structure
        parser = new RiffParser(data, { 'index': ip, 'length': chunk.size - 4 });
        parser.parse();
        if (parser.getNumberOfChunks() !== 3) {
            throw new Error('invalid sfbk structure');
        }

        // INFO-list
        this.parseInfoList( /** @type {!RiffChunk} */(parser.getChunk(0)));

        // sdta-list
        this.parseSdtaList( /** @type {!RiffChunk} */(parser.getChunk(1)));

        // pdta-list
        this.parsePdtaList( /** @type {!RiffChunk} */(parser.getChunk(2)));
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseInfoList(chunk: RiffChunk) {
        let parser: RiffParser;
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let signature: string;

        // check parse target
        if (chunk.type !== 'LIST') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        // check signature
        signature = String.fromCharCode(data[ip++], data[ip++], data[ip++], data[ip++]);
        if (signature !== 'INFO') {
            throw new Error('invalid signature:' + signature);
        }

        // read structure
        parser = new RiffParser(data, { 'index': ip, 'length': chunk.size - 4 });
        parser.parse();
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseSdtaList(chunk: RiffChunk) {
        let parser: RiffParser;
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let signature: string;
        // check parse target
        if (chunk.type !== 'LIST') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        // check signature
        signature = String.fromCharCode(data[ip++], data[ip++], data[ip++], data[ip++]);
        if (signature !== 'sdta') {
            throw new Error('invalid signature:' + signature);
        }

        // read structure
        parser = new RiffParser(data, { 'index': ip, 'length': chunk.size - 4 });
        parser.parse();
        if (parser.chunkList.length !== 1) {
            throw new Error('TODO');
        }
        this.samplingData = parser.getChunk(0);
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parsePdtaList(chunk: RiffChunk) {
        let parser: RiffParser;
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let signature: string;
        // check parse target
        if (chunk.type !== 'LIST') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        // check signature
        signature = String.fromCharCode(data[ip++], data[ip++], data[ip++], data[ip++]);
        if (signature !== 'pdta') {
            throw new Error('invalid signature:' + signature);
        }

        // read structure
        parser = new RiffParser(data, { 'index': ip, 'length': chunk.size - 4 });
        parser.parse();

        // check number of chunks
        if (parser.getNumberOfChunks() !== 9) {
            throw new Error('invalid pdta chunk');
        }

        this.parsePhdr( /** @type {RiffChunk} */(parser.getChunk(0)));
        this.parsePbag( /** @type {RiffChunk} */(parser.getChunk(1)));
        this.parsePmod( /** @type {RiffChunk} */(parser.getChunk(2)));
        this.parsePgen( /** @type {RiffChunk} */(parser.getChunk(3)));
        this.parseInst( /** @type {RiffChunk} */(parser.getChunk(4)));
        this.parseIbag( /** @type {RiffChunk} */(parser.getChunk(5)));
        this.parseImod( /** @type {RiffChunk} */(parser.getChunk(6)));
        this.parseIgen( /** @type {RiffChunk} */(parser.getChunk(7)));
        this.parseShdr( /** @type {RiffChunk} */(parser.getChunk(8)));
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parsePhdr(chunk: RiffChunk) {
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let presetHeader = this.presetHeader = [];
        let size: number = chunk.offset + chunk.size;

        // check parse target
        if (chunk.type !== 'phdr') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        while (ip < size) {
            presetHeader.push({
                presetName: String.fromCharCode.apply(null, data.slice(ip, ip += 20)),
                preset: data[ip++] | (data[ip++] << 8),
                bank: data[ip++] | (data[ip++] << 8),
                presetBagIndex: data[ip++] | (data[ip++] << 8),
                library: (data[ip++] | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)) >>> 0,
                genre: (data[ip++] | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)) >>> 0,
                morphology: (data[ip++] | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)) >>> 0
            });
        }
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parsePbag(chunk: RiffChunk) {
        let data: ArrayBuffer = this.input;
        let ip: number = chunk.offset;
        let presetZone = this.presetZone = [];
        let size: number = chunk.offset + chunk.size;

        // check parse target
        if (chunk.type !== 'pbag') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        while (ip < size) {
            presetZone.push({
                presetGeneratorIndex: data[ip++] | (data[ip++] << 8),
                presetModulatorIndex: data[ip++] | (data[ip++] << 8)
            });
        }
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parsePmod(chunk: RiffChunk) {
        // check parse target
        if (chunk.type !== 'pmod') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        this.presetZoneModulator = this.parseModulator(chunk);
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parsePgen(chunk: RiffChunk) {
        // check parse target
        if (chunk.type !== 'pgen') {
            throw new Error('invalid chunk type:' + chunk.type);
        }
        this.presetZoneGenerator = this.parseGenerator(chunk);
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseInst(chunk: RiffChunk) {
        let data = this.input;
        let ip = chunk.offset;
        let instrument = this.instrument = [];
        let size = chunk.offset + chunk.size;

        // check parse target
        if (chunk.type !== 'inst') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        while (ip < size) {
            instrument.push({
                instrumentName: String.fromCharCode.apply(null, data.slice(ip, ip += 20)),
                instrumentBagIndex: data[ip++] | (data[ip++] << 8)
            });
        }
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseIbag(chunk: RiffChunk) {
        let data = this.input;
        let ip = chunk.offset;
        let instrumentZone = this.instrumentZone = [];
        let size = chunk.offset + chunk.size;

        // check parse target
        if (chunk.type !== 'ibag') {
            throw new Error('invalid chunk type:' + chunk.type);
        }


        while (ip < size) {
            instrumentZone.push({
                instrumentGeneratorIndex: data[ip++] | (data[ip++] << 8),
                instrumentModulatorIndex: data[ip++] | (data[ip++] << 8)
            });
        }
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseImod(chunk: RiffChunk) {
        // check parse target
        if (chunk.type !== 'imod') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        this.instrumentZoneModulator = this.parseModulator(chunk);
    };


    /**
     * @param {RiffChunk} chunk
     */
    private parseIgen(chunk: RiffChunk) {
        // check parse target
        if (chunk.type !== 'igen') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        this.instrumentZoneGenerator = this.parseGenerator(chunk);
    };

    /**
     * @param {RiffChunk} chunk
     */
    private parseShdr(chunk: RiffChunk) {
        let data = this.input;
        let ip = chunk.offset;
        let samples = this.samples = [];
        let sampleHeader = this.sampleHeader = [];
        let size = chunk.offset + chunk.size;
        let sampleName;
        let start;
        let end;
        let startLoop;
        let endLoop;
        let sampleRate;
        let originalPitch;
        let pitchCorrection;
        let sampleLink;
        let sampleType;

        // check parse target
        if (chunk.type !== 'shdr') {
            throw new Error('invalid chunk type:' + chunk.type);
        }

        while (ip < size) {
            sampleName = String.fromCharCode.apply(null, data.slice(ip, ip += 20));
            start = (
                (data[ip++] << 0) | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)
            ) >>> 0;
            end = (
                (data[ip++] << 0) | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)
            ) >>> 0;
            startLoop = (
                (data[ip++] << 0) | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)
            ) >>> 0;
            endLoop = (
                (data[ip++] << 0) | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)
            ) >>> 0;
            sampleRate = (
                (data[ip++] << 0) | (data[ip++] << 8) | (data[ip++] << 16) | (data[ip++] << 24)
            ) >>> 0;
            originalPitch = data[ip++];
            pitchCorrection = (data[ip++] << 24) >> 24;
            sampleLink = data[ip++] | (data[ip++] << 8);
            sampleType = data[ip++] | (data[ip++] << 8);

            let sample = new Int16Array(new Uint8Array(data.slice(
                this.samplingData.offset + start * 2,
                this.samplingData.offset + end * 2
            )).buffer);

            startLoop -= start;
            endLoop -= start;

            if (sampleRate > 0) {
                let adjust = this.adjustSampleData(sample, sampleRate);
                sample = adjust.sample;
                sampleRate *= adjust.multiply;
                startLoop *= adjust.multiply;
                endLoop *= adjust.multiply;
            }

            samples.push(sample);

            sampleHeader.push({
                sampleName: sampleName,
                start: start,
                end: end,
                startLoop: startLoop,
                endLoop: endLoop,
                sampleRate: sampleRate,
                originalPitch: originalPitch,
                pitchCorrection: pitchCorrection,
                sampleLink: sampleLink,
                sampleType: sampleType
            });
        }
    };

    private adjustSampleData(sample, sampleRate) {
        let newSample: Int16Array;
        let i: number;
        let il: number;
        let j: number;
        let multiply: number = 1;

        // buffer
        while (sampleRate < (this.sampleRate)) { // AudioContextのサンプルレートに変更
            newSample = new Int16Array(sample.length * 2);
            for (i = j = 0, il = sample.length; i < il; ++i) {
                newSample[j++] = sample[i];
                newSample[j++] = sample[i];
            }
            sample = newSample;
            multiply *= 2;
            sampleRate *= 2;
        }

        return {
            sample: sample,
            multiply: multiply
        };
    };

    /**
     * @param {RiffChunk} chunk
     * @return {any[]}
     */
    private parseModulator(chunk: RiffChunk) {
        let data = this.input;
        let ip = chunk.offset;
        let size = chunk.offset + chunk.size;
        let code: number;
        let key: string;
        let output: any[] = [];

        while (ip < size) {
            // Src  Oper
            // TODO
            ip += 2;

            // Dest Oper
            code = data[ip++] | (data[ip++] << 8);
            key = SoundFontParser.GeneratorEnumeratorTable[code];
            if (key === void 0) {
                // Amount
                output.push({
                    type: key,
                    value: {
                        code: code,
                        amount: data[ip] | (data[ip + 1] << 8) << 16 >> 16,
                        lo: data[ip++],
                        hi: data[ip++]
                    }
                });
            } else {
                // Amount
                switch (key) {
                    case 'keyRange':
                    /* FALLTHROUGH */
                    case 'velRange':
                    /* FALLTHROUGH */
                    case 'keynum':
                    /* FALLTHROUGH */
                    case 'velocity':
                        output.push({
                            type: key,
                            value: {
                                lo: data[ip++],
                                hi: data[ip++]
                            }
                        });
                        break;
                    default:
                        output.push({
                            type: key,
                            value: {
                                amount: data[ip++] | (data[ip++] << 8) << 16 >> 16
                            }
                        });
                        break;
                }
            }

            // AmtSrcOper
            // TODO
            ip += 2;

            // Trans Oper
            // TODO
            ip += 2;
        }

        return output;
    };

    /**
     * @param {RiffChunk} chunk
     * @return {Array.<Object>}
     */
    private parseGenerator(chunk: RiffChunk) {
        /** @type {ByteArray} */
        let data = this.input;
        /** @type {number} */
        let ip = chunk.offset;
        /** @type {number} */
        let size = chunk.offset + chunk.size;
        /** @type {number} */
        let code;
        /** @type {string} */
        let key;
        /** @type {Array.<Object>} */
        let output = [];

        while (ip < size) {
            code = data[ip++] | (data[ip++] << 8);
            key = SoundFontParser.GeneratorEnumeratorTable[code];
            if (key === void 0) {
                output.push({
                    type: key,
                    value: {
                        code: code,
                        amount: data[ip] | (data[ip + 1] << 8) << 16 >> 16,
                        lo: data[ip++],
                        hi: data[ip++]
                    }
                });
                continue;
            }

            switch (key) {
                case 'keynum':
                /* FALLTHROUGH */
                case 'keyRange':
                /* FALLTHROUGH */
                case 'velRange':
                /* FALLTHROUGH */
                case 'velocity':
                    output.push({
                        type: key,
                        value: {
                            lo: data[ip++],
                            hi: data[ip++]
                        }
                    });
                    break;
                default:
                    output.push({
                        type: key,
                        value: {
                            amount: data[ip++] | (data[ip++] << 8) << 16 >> 16
                        }
                    });
                    break;
            }
        }

        return output;
    };

    public createInstrument(): any[] {
        let instrument = this.instrument;
        let zone = this.instrumentZone;
        let output = [];
        let bagIndex: number;
        let bagIndexEnd: number;
        let zoneInfo: any[];
        /** @type {{generator: Object, generatorInfo: Array.<Object>}} */
        let instrumentGenerator;
        /** @type {{modulator: Object, modulatorInfo: Array.<Object>}} */
        let instrumentModulator;
        let i: number;
        let il: number;
        let j: number;
        let jl: number;

        // instrument -> instrument bag -> generator / modulator
        for (i = 0, il = instrument.length; i < il; ++i) {
            bagIndex = instrument[i].instrumentBagIndex;
            bagIndexEnd = instrument[i + 1] ? instrument[i + 1].instrumentBagIndex : zone.length;
            zoneInfo = [];

            // instrument bag
            for (j = bagIndex, jl = bagIndexEnd; j < jl; ++j) {
                instrumentGenerator = this.createInstrumentGenerator_(zone, j);
                instrumentModulator = this.createInstrumentModulator_(zone, j);

                zoneInfo.push({
                    generator: instrumentGenerator.generator,
                    generatorSequence: instrumentGenerator.generatorInfo,
                    modulator: instrumentModulator.modulator,
                    modulatorSequence: instrumentModulator.modulatorInfo
                });
            }

            output.push({
                name: instrument[i].instrumentName,
                info: zoneInfo
            });
        }

        return output;
    };

    public createPreset(): any[] {
        let preset = this.presetHeader;
        let zone = this.presetZone;
        let output: any[] = [];
        let bagIndex: number;
        let bagIndexEnd: number;
        let zoneInfo: any[];
        let instrument: number;
        /** @type {{generator: Object, generatorInfo: Array.<Object>}} */
        let presetGenerator;
        /** @type {{modulator: Object, modulatorInfo: Array.<Object>}} */
        let presetModulator;
        let i: number;
        let il: number;
        let j: number;
        let jl: number;

        // preset -> preset bag -> generator / modulator
        for (i = 0, il = preset.length; i < il; ++i) {
            bagIndex = preset[i].presetBagIndex;
            bagIndexEnd = preset[i + 1] ? preset[i + 1].presetBagIndex : zone.length;
            zoneInfo = [];

            // preset bag
            for (j = bagIndex, jl = bagIndexEnd; j < jl; ++j) {
                presetGenerator = this.createPresetGenerator_(zone, j);
                presetModulator = this.createPresetModulator_(zone, j);

                zoneInfo.push({
                    generator: presetGenerator.generator,
                    generatorSequence: presetGenerator.generatorInfo,
                    modulator: presetModulator.modulator,
                    modulatorSequence: presetModulator.modulatorInfo
                });

                instrument =
                    presetGenerator.generator['instrument'] !== void 0 ?
                        presetGenerator.generator['instrument'].amount :
                        presetModulator.modulator['instrument'] !== void 0 ?
                            presetModulator.modulator['instrument'].amount :
                            null;
            }

            output.push({
                name: preset[i].presetName,
                info: zoneInfo,
                header: preset[i],
                instrument: instrument
            });
        }

        return output;
    };

    /**
     * @param {Array.<Object>} zone
     * @param {number} index
     * @returns {{generator: Object, generatorInfo: Array.<Object>}}
     * @private
     */
    private createInstrumentGenerator_(zone, index) {
        let modgen = this.createBagModGen_(
            zone,
            zone[index].instrumentGeneratorIndex,
            zone[index + 1] ? zone[index + 1].instrumentGeneratorIndex : this.instrumentZoneGenerator.length,
            this.instrumentZoneGenerator
        );

        return {
            generator: modgen.modgen,
            generatorInfo: modgen.modgenInfo
        };
    };

    /**
     * @param {Array.<Object>} zone
     * @param {number} index
     * @returns {{modulator: Object, modulatorInfo: Array.<Object>}}
     * @private
     */
    private createInstrumentModulator_(zone, index) {
        let modgen = this.createBagModGen_(
            zone,
            zone[index].presetModulatorIndex,
            zone[index + 1] ? zone[index + 1].instrumentModulatorIndex : this.instrumentZoneModulator.length,
            this.instrumentZoneModulator
        );

        return {
            modulator: modgen.modgen,
            modulatorInfo: modgen.modgenInfo
        };
    };

    /**
     * @param {Array.<Object>} zone
     * @param {number} index
     * @returns {{generator: Object, generatorInfo: Array.<Object>}}
     * @private
     */
    private createPresetGenerator_(zone, index) {
        let modgen = this.createBagModGen_(
            zone,
            zone[index].presetGeneratorIndex,
            zone[index + 1] ? zone[index + 1].presetGeneratorIndex : this.presetZoneGenerator.length,
            this.presetZoneGenerator
        );

        return {
            generator: modgen.modgen,
            generatorInfo: modgen.modgenInfo
        };
    };

    /**
     * @param {Array.<Object>} zone
     * @param {number} index
     * @returns {{modulator: Object, modulatorInfo: Array.<Object>}}
     * @private
     */
    private createPresetModulator_(zone, index) {
        /** @type {{modgen: Object, modgenInfo: Array.<Object>}} */
        let modgen = this.createBagModGen_(
            zone,
            zone[index].presetModulatorIndex,
            zone[index + 1] ? zone[index + 1].presetModulatorIndex : this.presetZoneModulator.length,
            this.presetZoneModulator
        );

        return {
            modulator: modgen.modgen,
            modulatorInfo: modgen.modgenInfo
        };
    };

    /**
     * @param {Array.<Object>} zone
     * @param {number} indexStart
     * @param {number} indexEnd
     * @param zoneModGen
     * @returns {{modgen: Object, modgenInfo: Array.<Object>}}
     * @private
     */
    private createBagModGen_(zone, indexStart, indexEnd, zoneModGen): any {
        let modgenInfo: any[] = [];
        let modgen = {
            unknown: [],
            'keyRange': {
                hi: 127,
                lo: 0
            }
        }; // TODO
        let info: any;
        let i: number;
        let il: number;

        for (i = indexStart, il = indexEnd; i < il; ++i) {
            info = zoneModGen[i];
            modgenInfo.push(info);

            if (info.type === 'unknown') {
                modgen.unknown.push(info.value);
            } else {
                modgen[info.type] = info.value;
            }
        }

        return {
            modgen: modgen,
            modgenInfo: modgenInfo
        };
    };


}