import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { encode } from '../util/Util';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayerService {

    constructor(private http: Http) { }


    /**
     * @name downloadBackingTrack
     * @description download from the server a backing track
     * @return {Resource[]} the list
     */
    public downloadBackingTrack(): Observable<string> {
        return this.http
            .get('assets/data/mozart-andante-in-c-major-flutesolo.xml')
            .map((r: Response) => {
                return r.text();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    /**
     * @name downloadBackingTrackMidi
     * @description download from the server a backing track
     * @return {Resource[]} the list
     */
    public downloadBackingTrackMidi(): Observable<ArrayBuffer> {
        var basicOptions: RequestOptionsArgs = {
            url: 'assets/data/mozart-andante-in-c-major-1.mid',
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
                return r.arrayBuffer();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }


}