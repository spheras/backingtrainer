/**
 * @name Collection
 * @description a collection of compositions
 */
export class Collection {
    /**
     * id of the set
     */
    public id: string
    /**
     * name of the set
     */
    public name: string;
    /**
     * author of the set
     */
    public author: string;
    /**
     * description of the set
     */
    public description: string;
    /**
     * the level needed to play them
     */
    public level: number;
    /**
     * The preferred instrument of this collection of compositions
     */
    public instrument: string;
    /**
     * The list of id compositions that compose the set
     */
    public compositionIds: string[];

    /**
     * The list of real compositions objects. This list is filled by code (you cannot expect this field from the server json)
     */
    public compositions: Composition[] = [];

    /**
     * Flag to indicate if it is expanded or not, it is just a visual flag
     */
    public flagExpanded: boolean = false;
}

/**
 * @name Composition
 * @description a composition to be played
 */
export class Composition {
    /**
     * id of the composition
     */
    public id: string
    /**
     * name of the composition
     */
    public name: string;
    /**
     * author of the composition
     */
    public author: string;
    /**
     * description of the composition
     */
    public description: string;
    /**
     * a wikipedia link (optional) for author, piece, or whatever
     */
    public wikipediaLink: string;
    /**
     * the level needed to play it
     */
    public level: number;


    /**
     * this is the url to obtain the midi file
     */
    public midiURL: string;
    public midiB64Data: string;
    /**
     * this is the url to obtain the soloist score file (mei format? musicxml format?)
     */
    public scoreURL: string;
    public scoreXMLData: string;


    /**
     * the soloist instrument
     */
    public frontInstrument: Instrument;
    /**
     * the list of back instruments
     */
    public backInstruments: Instrument[];

    /**
     * the version of this composition
     */
    public version: number;




    /**
     * flag to indicate if the composition is being played or not
     */
    public flagPlaying: boolean = false;
    /**
     * flag to indicate if the composition have been downloaded
     */
    public flagDownloaded: boolean = false;
}

export class Instrument {
    public name: string;
    public track: number;
    public help: number = -1;
}