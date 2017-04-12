import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Composition } from '../player/composition';

@Injectable()
export class DAO {

    constructor(private storage: Storage) {
    }

    private compositions: Composition[] = null;

    /**
     * @name getCompositions
     * @description return all the stored compositions
     * @return {Promise<Composition[]>} the promise to return all the compositions saved
     */
    public getCompositions(): Promise<Composition[]> {
        return new Promise<Composition[]>(resolve => {
            if (this.compositions == null) {
                this.storage.ready().then(() => {
                    this.storage.get('compositions').then((compositions: Composition[]) => {
                        resolve(compositions);
                    })
                });
            } else {
                resolve(this.compositions);
            }
        });
    }

    /**
     * @name saveComposition
     * @description save a new composition to the storage
     * @return {Promise<void>} the promise to save the composition
     */
    public saveComposition(composition: Composition): Promise<void> {
        return new Promise<Composition[]>(resolve => {
            this.getCompositions().then((comps) => {
                comps.push(composition);
                this.storage.ready().then(() => {
                    this.storage.set('compositions', comps).then((result: any) => {
                        resolve();
                    })
                });
            });
        });
    }
}