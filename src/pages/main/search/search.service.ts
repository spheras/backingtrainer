import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { Composition } from '../../../player/composition';

@Injectable()
export class SearchService {

    constructor(private http: Http) { }


    /**
     * @name getServerIndex
     * @description get the list of compositions available at the github server
     * @return {Composition[]} the list of compositions
     */
    public getServerIndex(): Observable<Composition[]> {
        return this.http
            .get('https://raw.githubusercontent.com/spheras/backingtrainer/master/data/index.json')
            .map((r: Response) => {
                return <Composition[]>r.json();
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

}