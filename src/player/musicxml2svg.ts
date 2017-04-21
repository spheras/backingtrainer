//vertaal function is the xml2abc library function
declare var vertaal: Function;
//Abc function is the abc2svg library function
declare class Abc {
    constructor(obj: any);
    tosvg(title: string, abc: string);
    sx(x: number);
    sy(y: number);
}


/**
 * @class
 * @name MusicXML2SVG
 * @description MusicXML converter to SVG using libraries:
 * - xml2abc.js from Wim Vree (http://wim.vree.org/js/)
 * - abc2svg.js from Jef Moine (http://moinejf.free.fr/js/)
 * and some minor stuff from my side to join both
 */
export class MusicXML2SVG {
    /**set of const used by abc2svg library */
    private static ABC2SVG_TYPE_BAR: number = 0;
    private static ABC2SVG_TYPE_GRACE: number = 4;
    /*
    private static ABC2SVG_TYPE_METER: number = 6;
    */
    private static ABC2SVG_TYPE_NOTE: number = 8;
    private static ABC2SVG_TYPE_REST: number = 10;
    /*
    private static ABC2SVG_TYPE_TEMPO: number = 14;
    private static ABC2SVG_TYPE_BASE_LEN: number = 1536;
    */

    /**
     * The generated svg
     */
    public svg: string = '';
    /**
     * Number of barlines at the score rendered
     */
    public barlines: number = 0;
    /**
     * List of error messages generated
     */
    public errorMessages: string[] = [];

    /**
     * List of bounding boxes of each figure at the svg
     */
    public figureBoxes: FigureBox[] = [];

    /**
     * Timeline Map which is able to say what figureboxes must be played in sequence
     */
    public timeLineMap: number[] = [];

    /**
     * numerator and denominator of the meter signature
     */
    public numerator:number;
    public denominator:number;

    /**
     * the abc2svg library with user config
     */
    private abc2svg: Abc = null;

    /** list of ligatos recovered, just for internal adjustements */
    private ligatos: boolean[] = [];

    /** list of abc graces found */
    private graces: string[] = [];
    private indexGrace: number = 0;

    /**
     * @constructor
     * @param {string} musicXML the musicxml string to be rendered
     * @param {RenderOptions} the options required by xml2abc library
     */
    constructor(private musicXML: string, private options: ConversionOptions) {
    }

    /**
     * @name reset
     * @description Reset all the parameters to start a new conversion and render
     */
    private reset() {
        this.svg = "";
        this.barlines = 0;
        this.errorMessages = [];
        this.figureBoxes = [];
        this.ligatos = [];
        this.graces = [];
        this.indexGrace = 0;
    }

    /**
     * @name analyseGraces
     * @description analyse the graces obtained by the abc code
     */
    private analyseGraces(abcCode: string) {
        let index: number = -1;
        index = abcCode.indexOf("{");
        while (index >= 0) {
            let indexTo: number = abcCode.indexOf("}", index + 1);
            let str: string = abcCode.substr(index + 1, indexTo - index - 1);
            this.graces.push(str);
            index = abcCode.indexOf("{", indexTo);
        }
    }

    /**
     * @name renderScore
     * @description render a musicxml score using SVG. This only generates the SVG. You must insert it into the DOM to show it.
     * @param {number} width width of the svg generated
     * @return {string} the svg created
     */
    public renderScore(width: number): string {
        this.reset();
        var inforesult = vertaal(this.musicXML, this.options);
        //console.log(inforesult[0]);
        this.analyseGraces(inforesult[0]);
        let self = this;

        /*See: http://moinejf.free.fr/js/interface-1.xhtml*/
        var user = {
            'img_out': function (str: string) {
                self.imgOut(str);
            },
            'errmsg': function (txt: string, line: number, col: number) {
                self.errMsg(txt, line, col);
            },
            'read_file': this.readFile,
            'anno_start': function (type: string, startOffset: number, stopOffset: number, x: number, y: number, w: number, h: number) {
                self.annoStart(type, startOffset, stopOffset, x, y, w, h);
            },
            'get_abcmodel': function (tsFirst: any, voice_tb: any[], music_types: string[], info: any) {
                self.timeLine(tsFirst, voice_tb, music_types, info);
            },
            'imagesize': 'width="' + width + '"',
            'page_format': true
        }

        //inforesult[0] = inforesult[0].replace(new RegExp("0.83", 'g'), "2.00");
        //console.log(inforesult[0]);
        this.abc2svg = new Abc(user);
        this.abc2svg.tosvg('abc2svg', inforesult[0]);
        return this.svg;

    }

    /**
     * @name imgOut
     * @description Callback function which called when a new part of the SVG image has been generated.
     * @param {string} str the string svg rendered
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    private imgOut(str: string) {
        /*
        console.log(str);
        */
        if (str.indexOf('<svg') != -1) {
            this.barlines++;
            /*
            str = str.replace(/width="(\d*)px"\s*height="(\d*)px"/, 'width="$1px" height="$2px" viewbox="0 0 $1 $2"');
            bxs = self.keySort(bxs), bys = self.keySort(bys);
            if (bxs.length > 1 &&   // the first barline is at bxs[1] because bxs[0] == left side staff
                bxs[1] < Math.min.apply(null, nxs)) {  // first barline < min x-coor of all notes in this line
                bxs.splice(0, 1);  // remove left side staff because there already is a left barline
            }
            bars.push({ 'xs': bxs, 'ys': bys });
            bxs = {}, bys = {}, nxs = [];
            */
        }
        this.svg = this.svg + str;
    }

    /**
     * @name errMsg
     * @description Callback function which is called when some error has been found during the ABC parsing or the SVG generation
     * @param {string} txt text of the error
     * @param {number} line line number (Position of the error in the ABC source, same as the corresponding argument in errbld())
     * @param {number} col column number (Position of the error in the ABC source, same as the corresponding argument in errbld())
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    private errMsg(txt: string, line: number, col: number) {
        this.errorMessages.push(txt);
    }


    /**
     * @name readFile
     * @description Callback function which is called to read a file. It is called when a %%abc-include command has been found in the ABC source.
     * @param {string} filename the name of the file
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    private readFile(filename) {
        // %%abc-include, unused 
        return '';
    }

    /**
     * @name annoStart
     * @description Callback function for setting ABC references in the SVG images. This function is called just before the generation of a music element
     * @param {string} type It is one of annot, bar, clef, gchord, grace, key, meter, note, part, rest, tempo.
     * @param {number} startOffset offset of the music element in the ABC source 
     * @param {number} stopOffset offset of the end of music element in the ABC source
     * @param {number} x x Coordinates of a rectangle which covers the music element 
     * @param {number} y y Coordinates of a rectangle which covers the music element
     * @param {number} w width Coordinates of a rectangle which covers the music element
     * @param {number} x height Coordinates of a rectangle which covers the music element
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    private annoStart(type: string, startOffset: number, stopOffset: number, x: number, y: number, w: number, h: number) {
        //console.log(type)
        if (type == 'note' || type == 'rest' || type == 'grace') {

            let bbox = new FigureBox();
            bbox.barline = this.barlines;
            bbox.type = (type == 'note' || type == 'grace' ? FigureBox.TYPE_NOTE : FigureBox.TYPE_REST);
            bbox.x = this.abc2svg.sx(x).toFixed(2);
            bbox.y = this.abc2svg.sy(y).toFixed(2);
            bbox.w = w;
            bbox.h = h;
            bbox.offsetStart = startOffset;
            bbox.offsetStop = stopOffset;
            bbox.ligato = this.ligatos[this.figureBoxes.length];

            this.figureBoxes.push(bbox);
        } else {
            //console.log(type);
        }
    }


    /**
     * @name timeLine
     * @description Callback function to get the internal representation of the music just before SVG generation.
     * @param {any} tsFirst First musical symbol in the time sequence. The symbols are double-linked by time by ts_next / ts_prev. The start of a new sequence is marked by seqst.
     * @param {any[]} voice_tb  Voice table. The first symbol of a voice is sym. The symbols are double-linked in a voice by next / prev.
     * @param {string[]} music_types Array giving the symbol type from integer value of the symbol attribute type. 
     * @param {any} info Text of the information fields (T:, M:, Q:, P:...).  A newline ('\n') separates the appended values.
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    private timeLine(tsFirst: any, voice_tb: any[], music_types: string[], info: any) {
        //let's do a timeline
        let map: number[] = [];
        let startReps = [];
        let index: number = 0;
        let indexFirstEndings = [];
        let indexSecondEndings = [];
        let indexSegno = -1;
        let indexFine = -1;
        let indexToCoda = -1;
        let flagLastLigato = false;
        
        //getting the meter signature (numerator/denominator)
        let meterSignature:string[]=info.M.split("/");
        this.numerator=parseInt(meterSignature[0]);
        this.denominator=parseInt(meterSignature[1]);

        for (var ts = tsFirst; ts; ts = ts.ts_next) {
            switch (ts.type) {
                case MusicXML2SVG.ABC2SVG_TYPE_GRACE:
                case MusicXML2SVG.ABC2SVG_TYPE_NOTE:
                case MusicXML2SVG.ABC2SVG_TYPE_REST:
                    map.push(index);

                    if (ts.type == MusicXML2SVG.ABC2SVG_TYPE_GRACE) {
                        this.ligatos.push(flagLastLigato);
                        let gracestr = this.graces[this.indexGrace];
                        this.indexGrace++;
                        let notes = gracestr.length - gracestr.replace(/[A-G]/g, '').length;
                        notes = notes + gracestr.length - gracestr.replace(/[a-g]/g, '').length;
                        for (var igrace = 0; igrace < notes - 1; igrace++) {
                            index++;
                            map.push(index);
                            this.ligatos.push(flagLastLigato);
                        }
                    }

                    //we need to save the ligato info to link after with the svg figure boxes generated
                    if (ts.notes) {
                        this.ligatos.push(flagLastLigato);
                        var ti1 = ts.notes[0].ti1;
                        if (ti1 == 3) {
                            //ligato!
                            flagLastLigato = true;
                        } else {
                            flagLastLigato = false;
                        }
                    }


                    //lets see if we found a segno annotation
                    if (ts.a_dd && ts.a_dd.length > 0) {
                        for (var idd = 0; idd < ts.a_dd.length; idd++) {
                            var dd = ts.a_dd[idd];
                            if (dd.glyph === 'sgno') {
                                //segno
                                indexSegno = index;
                            } else {
                                //console.log(dd.glyph);
                            }
                        }
                    }

                    index++;
                    break;
                case MusicXML2SVG.ABC2SVG_TYPE_BAR:
                    if (ts.text) {
                        if (ts.text.trim() === '1') {
                            //first ending
                            indexFirstEndings.push(index);
                        } else if (ts.text.trim() === '2') {
                            //second ending
                            indexSecondEndings.push(index);
                        }
                    }

                    if (ts.a_gch && ts.a_gch.length > 0) {
                        for (var ig = 0; ig < ts.a_gch.length; ig++) {
                            var gch = ts.a_gch[ig];
                            let text = gch.text.toLowerCase();

                            if (text === "fine") {
                                //we found a fine annotation
                                indexFine = index;
                                continue;
                            }
                            if (text === "to coda") {
                                //we found a go to coda annotation
                                indexToCoda = index;
                                continue;
                            }


                            let start = 0;
                            let end = index;
                            let repeat = false;
                            if (text.startsWith("d.s.") || text.startsWith("d.c.")) {
                                //da segno or da capo, al fine or al coda

                                //we have a segno (da segno to...)?
                                if (indexSegno > -1 && text.startsWith("d.s.")) {
                                    start = indexSegno;
                                }
                                //we have a fine (...to fine)
                                if (indexFine > -1) {
                                    end = indexFine;
                                } else if (indexToCoda > -1) {
                                    //to coda!
                                    end = indexToCoda;
                                }

                                repeat = true;
                            }

                            //lets create the repeat timeline                            
                            if (repeat) {
                                for (var irep = start; irep < end; irep++) {
                                    //we need to check first endings.. after a repetition we should pass again through first endings
                                    for (var ifirst = 0; ifirst < indexFirstEndings.length; ifirst++) {
                                        var firstEnd = indexFirstEndings[ifirst];
                                        if (firstEnd == irep) {
                                            irep = indexSecondEndings[ifirst];
                                            break;
                                        } else if (firstEnd > irep) {
                                            break;
                                        }
                                    }
                                    map.push(irep);
                                }
                            }
                        }
                    }


                    if (ts.bar_type === '|:') {
                        //start a repetition
                        startReps.push(index);
                    } else if (ts.bar_type === '::' || ts.bar_type === ':|') {
                        //now we repeat from the start to the end
                        let indexStartRep = startReps[startReps.length - 1];
                        let toIndex = index;
                        if (indexFirstEndings.length == indexSecondEndings.length && ts.text && ts.text.trim() === '2') {
                            toIndex = indexFirstEndings[indexFirstEndings.length - 1];
                        }
                        for (var i = indexStartRep; i < toIndex; i++) {
                            map.push(i);
                        }
                        startReps = startReps.slice(0, startReps.length - 1);

                        if (ts.bar_type === '::') {
                            //start a repetition
                            startReps.push(index);
                        }
                    }
                    break;
            }
        }
        this.timeLineMap = map;
    }


}

/**
 * @name ConversionOptions
 * @description set of conversion options required by xml2abc.js library.
 */
export class ConversionOptions {
    public u: number = 0;  //unfold repeats (1)
    public b: number = 0;  //bars per line
    public n: number = 0;  //chars per line
    public c: number = 0;  //credit text filter level (0-6)
    public v: number = 3;  //no volta on higher voice numbers (1)
    public d: number = 0;  //denominator unit length (L:)
    public m: number = 2;  //no midi, minimal midi, all midi output (0,1,2)
    public x: number = 0;  //no line breaks (1)
    public t: number = 1;  //clef dependent step value (1)
    public p: string = '1.0,'+ Math.round((document.documentElement.clientWidth * 20)/640) +',0,0';   // page format: scale (1.0), width, left and right margin in cm
}

/**
 * @name FigureBox
 * @description represent the bounding box of a Note or a Rest inside the svg result
 */
export class FigureBox {
    public static TYPE_NOTE: number = 1;
    public static TYPE_REST: number = 2;

    /** the x position */
    public x: number = 0;
    /** the y position */
    public y: number = 0;
    /** the width of the rectangle */
    public w: number = 0;
    /** the height of the rectangle */
    public h: number = 0;
    /** type of the figure, note or rest */
    public type: number = FigureBox.TYPE_NOTE;
    /** the bar line where it is being rendered */
    public barline: number = 0;

    /** indicates if its a ligato */
    public ligato: boolean = false;

    /** startOffset offset of the music element in the ABC source */
    public offsetStart: number = 0;
    /** stopOffset offset of the end of music element in the ABC source */
    public offsetStop: number = 0;
}
