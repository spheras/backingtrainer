import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { Composition } from '../../../player/composition';
import { encode } from '../../../util/Util';

@Injectable()
export class SearchService {

    private dataUrl1 = 'https://raw.githubusercontent.com/spheras/backingtrainer/master/data';

    constructor(private http: Http) { }


    /**
     * @name getServerIndex
     * @description get the list of compositions available at the github server
     * @return {Composition[]} the list of compositions
     */
    public getServerIndex(): Observable<Composition[]> {
        return this.http
            .get(this.dataUrl1 + '/index.json')
            .map((r: Response) => {
                return <Composition[]>r.json();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    public downloadMidiB64(comp: Composition): Observable<string> {
        let url = this.dataUrl1 + '/[' + comp.id + ']-' + comp.midiURL ;
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

    public downloadScore(comp: Composition): Observable<string> {
        let url = this.dataUrl1 + '/[' + comp.id + ']-' + comp.scoreURL;
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