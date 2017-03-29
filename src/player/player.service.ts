import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Resource } from '../../../../template/resource';
import { getBaseUrl } from '../../../../util/util';
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
            .get('assets/data/Haydn_StringQuartet_Op1_No1-p1.mei')
            .map((r: Response) => {
                return r.text();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

}