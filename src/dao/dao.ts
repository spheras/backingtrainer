import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Composition } from '../player/composition';
import { Settings } from './settings';
import { Subject } from 'rxjs';

@Injectable()
export class DAO {

    /** cached compositions */
    private compositions: Composition[] = null;
    /** cached settings */
    public settingsCache: Settings = null;
    /** settings observable */
    private settingsSubject: Subject<Settings> = new Subject();


    constructor(private storage: Storage) {
        this.getSettings();
    }

    /**
     * @name observeSettings
     * @description observer pattern for the settings object
     * @return {Subject<Settings>} the observable RxJs
     */
    public observeSettings(): Subject<Settings> {
        return this.settingsSubject;
    }

    /**
     * @name getSettings
     * @description return the settings of the application
     * @return {Promise<Settings>} the promise to return the settings
     */
    public getSettings(): Promise<Settings> {
        return new Promise<Settings>(resolve => {
            if (this.settingsCache == null) {
                this.settingsCache = new Settings(); //temporal
                this.storage.ready().then(() => {
                    this.storage.get('settings').then((settings: Settings) => {
                        if (settings == null) {
                            settings = new Settings();
                        }
                        this.settingsCache = settings;
                        resolve(settings);
                    })
                });
            } else {
                resolve(this.settingsCache);
            }
        });
    }

    /**
     * @name setSettings
     * @description set the settings for the application
     * @return {Promise<void>} the promise to set the settings
     */
    public setSettings(settings: Settings): Promise<void> {
        return new Promise<Settings>(resolve => {
            this.storage.ready().then(() => {
                this.storage.set('settings', settings).then((result: any) => {
                    this.settingsCache = settings;
                    this.settingsSubject.next(this.settingsCache);
                    resolve();
                })
            });
        });
    }

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
                        }
                        this.compositions = compositions;
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