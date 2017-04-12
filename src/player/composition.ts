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
    public frontInstrument: string;
    /**
     * the list of back instruments
     */
    public backInstruments: string[];

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