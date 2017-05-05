export class RiffChunk {
    public type: string;
    public size: number;
    public offset: number;

    /**
     * @param {string} type
     * @param {number} size
     * @param {number} offset
     * @constructor
     */
    constructor(type, size, offset) {
        this.type = type;
        this.size = size;
        this.offset = offset;
    }
}


export class RiffParser {
    public chunkList: RiffChunk[];

    /** input array buffer */
    private input: ArrayBuffer;

    //opts params
    private ip: number;
    private length: number;
    private offset: number;
    private padding: boolean;
    private bigEndian: boolean;

    /**
     * @param {ByteArray} input input buffer.
     * @param {Object=} opt_params option parameters.
     * @constructor
     */
    constructor(input, opt_params) {
        opt_params = opt_params || {};
        this.input = input;
        this.ip = opt_params['index'] || 0;
        this.length = opt_params['length'] || input.length - this.ip;
        this.offset = this.ip;
        this.padding =
            opt_params['padding'] !== void 0 ? opt_params['padding'] : true;
        this.bigEndian =
            opt_params['bigEndian'] !== void 0 ? opt_params['bigEndian'] : false;
    };


    public parse(): void {
        let length: number = this.length + this.offset;

        this.chunkList = [];

        while (this.ip < length) {
            this.parseChunk();
        }
    };

    private parseChunk() {
        let input = this.input;
        let ip = this.ip;
        let size: number;

        this.chunkList.push(new RiffChunk(
            String.fromCharCode(input[ip++], input[ip++], input[ip++], input[ip++]),
            (size = this.bigEndian ?
                ((input[ip++] << 24) | (input[ip++] << 16) |
                    (input[ip++] << 8) | (input[ip++])) >>> 0 :
                ((input[ip++]) | (input[ip++] << 8) |
                    (input[ip++] << 16) | (input[ip++] << 24)) >>> 0
            ),
            ip
        ));

        ip += size;

        // padding
        if (this.padding && ((ip - this.offset) & 1) === 1) {
            ip++;
        }

        this.ip = ip;
    }

    /**
     * @param {number} index chunk index.
     * @return {RiffChunk}
     */
    public getChunk(index: number): RiffChunk {
        var chunk = this.chunkList[index];

        if (chunk === void 0) {
            return null;
        }

        return chunk;
    };

    /**
     * @return {number}
     */
    public getNumberOfChunks() {
        return this.chunkList.length;
    }

}