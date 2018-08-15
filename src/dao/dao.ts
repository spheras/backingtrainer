import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Composition } from '../player/composition';
import { Settings, PlayerSettings, FilterSettings } from './settings';
import { Subject } from 'rxjs';

@Injectable()
export class DAO {

    /** cached compositions */
    private compositions: Composition[] = null;
    /** recent compositions */
    private recents: Composition[] = null;
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
                this.storage.ready().then(() => {
                    this.storage.get('settings').then((settings: Settings) => {
                        if (settings == null) {
                            settings = new Settings();
                        }

                        if (!settings.filterSettings) {
                            settings.filterSettings = new FilterSettings();
                        }
                        if (!settings.playerSettings) {
                            settings.playerSettings = new PlayerSettings();
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
        return new Promise<void>(resolve => {
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
     * @name getRecents
     * @description return all the recents compositions
     * @return {Promise<Composition[]>} the promise to return all the recent compositions saved
     */
    public getRecents(): Promise<Composition[]> {
        return new Promise<Composition[]>(resolve => {
            if (this.recents == null) {
                this.storage.ready().then(() => {
                    this.storage.get('recents').then((compositions: Composition[]) => {
                        if (compositions == null) {
                            compositions = [];
                        }
                        this.recents = compositions;
                        resolve(compositions);
                    })
                });
            } else {
                resolve(this.recents);
            }
        });
    }

    /**
     * @name setRecents
     * @description set the recent compositions to the db (this method doesn't add, only set)
     * @param {Composition[]} comps the compositions to set
     * @return the promise to set the recent compositions
     */
    public setRecents(comps: Composition[]): Promise<void> {
        return new Promise<void>(resolve => {
            this.storage.ready().then(() => {
                this.storage.set('recents', comps).then((result: any) => {
                    this.recents = comps;
                    resolve();
                })
            });
        });
    }

    /**
     * @name addRecent
     * @description add a recent composition to the list of recent compositions
     * @param {Composition} comp the composition to add to recent compositions
     * @return {Promise<void>} the promise to add a recent composition to the list of compositions
     */
    public addRecent(comp: Composition): Promise<void> {
        return new Promise<void>((resolve) => {
            this.getRecents().then((comps) => {
                for (let i = 0; i < comps.length; i++) {
                    if (comps[i].id == comp.id) {
                        comps.splice(i, 1);
                        i--;
                    }
                }

                if (comps.length > 10) {
                    comps.splice(comps.length - 1, 1);
                }
                comps.splice(0, 0, comp);
                this.setRecents(comps).then(() => {
                    resolve();
                });
            });
        });
    }


    /**
     * @name removeRecent
     * @description remove a certain recent composition from the database
     * @param {string} the id of the recent composition to be removed
     * @return the promise to remove the recent composition
     */
    public removeRecent(id: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.getRecents().then((comps) => {
                for (let i = 0; i < comps.length; i++) {
                    if (comps[i].id == id) {
                        comps.splice(i, 1);
                        break;
                    }
                }
                this.setRecents(comps).then(() => {
                    resolve();
                });
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
        return new Promise<void>(resolve => {
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
        return new Promise<void>(resolve => {
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
        return new Promise<void>(resolve => {
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