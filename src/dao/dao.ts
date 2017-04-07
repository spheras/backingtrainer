import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Composition } from '../player/composition';

@Injectable()
export class DAO {

    constructor(private storage: Storage) {
    }

    /**
     * @name getCompositions
     * @description return all the stored compositions
     * @return <Promise<Composition[]>> the promise to return all the compositions saved
     */
    public getCompositions(): Promise<Composition[]> {
        return new Promise<Composition[]>(resolve => {
            this.storage.ready().then(() => {
                this.storage.get('compositions').then((compositions: Composition[]) => {
                    resolve(compositions);
                })
            });
        });
    }

}