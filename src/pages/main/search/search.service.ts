import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { Composition, Collection } from '../../../player/composition';
import { encode } from '../../../util/Util';
import { PlayerService } from '../../../player/player.service';

@Injectable()
export class SearchService {

    constructor(private http: Http) { }

    /**
     * @name getServerCompositionIndex
     * @description get the list of compositions available at the github server
     * @return {Composition[]} the list of compositions
     */
    public getServerCompositionIndex(): Observable<Composition[]> {
        return this.http
            .get(PlayerService.dataUrl1 + '/index-compositions.json')
            .map((r: Response) => {
                return <Composition[]>r.json();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    /**
     * @name getServerCollectionIndex
     * @description get the list of collections available at the github server
     * @return {Collection[]} the list of collection
     */
    public getServerCollectionIndex(): Observable<Collection[]> {
        return this.http
            .get(PlayerService.dataUrl1 + '/index-collections.json')
            .map((r: Response) => {
                return <Collection[]>r.json();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    /**
     * @name downloadMidiB64
     * @description download the midi binary and encode to b64
     * @param {Composition} comp the composition info to download
     * @return {Observable<string>} the observable to get the b64 string
     */
    public downloadMidiB64(comp: Composition): Observable<string> {
        let url = PlayerService.dataUrl1 + '/[' + comp.id + ']-' + comp.midiURL;
        var basicOptions: RequestOptionsArgs = {
            url: url,
            method: RequestMethod.Get,
            search: null,
            headers: null,
            body: null,
            withCredentials: false,
            responseType: ResponseContentType.ArrayBuffer
        };

        var reqOptions = new RequestOptions(basicOptions);
        var req = new Request(reqOptions);
        return this.http.request(req)
            .map((r: Response) => {
                let ab: ArrayBuffer = r.arrayBuffer();
                return encode(ab);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    /**
     * @name downloadScore
     * @description download the score of the composition
     * @param {Composition} comp the composition info to download
     * @return {Observable<string>} the observable to get the XML score string
     */
    public downloadScore(comp: Composition): Observable<string> {
        let url = PlayerService.dataUrl1 + '/[' + comp.id + ']-' + comp.scoreURL;
        return this.http
            .get(url)
            .map((r: Response) => {
                return r.text();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

}