import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Composition } from '../player/composition';

@Injectable()
export class DAO {

    constructor(private storage: Storage) {
    }

    /** cached compositions */
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
                        if (compositions == null) {
                            compositions = [];
                            this.compositions = compositions;
                        }
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
     * @param {Composition} composition the composition to save
     * @return {Promise<void>} the promise to save the composition
     */
    public saveComposition(composition: Composition): Promise<void> {
        return new Promise<Composition[]>(resolve => {
            this.getCompositions().then((comps) => {
                comps.push(composition);
                this.setCompositions(comps).then(() => {
                    resolve();
                });
            });
        });
    }

    /**
     * @name setCompositions
     * @description set the compositions to the db (this method doesn't add, only set)
     * @param {Composition[]} comps the compositions to set
     * @return the promise to set the compositions
     */
    public setCompositions(comps: Composition[]): Promise<void> {
        return new Promise<Composition[]>(resolve => {
            this.storage.ready().then(() => {
                this.storage.set('compositions', comps).then((result: any) => {
                    this.compositions = comps;
                    resolve();
                })
            });
        });
    }

    /**
     * @name removeComposition
     * @description remove a certain composition from the database
     * @param {string} the id of the composition to be removed
     * @return the promise to remove the composition
     */
    public removeComposition(id: string): Promise<void> {
        return new Promise<Composition[]>(resolve => {
            this.getCompositions().then((comps) => {
                for (let i = 0; i < comps.length; i++) {
                    if (comps[i].id == id) {
                        comps.splice(i, 1);
                        break;
                    }
                }
                this.setCompositions(comps).then(() => {
                    resolve();
                });
            });
        });
    }
}