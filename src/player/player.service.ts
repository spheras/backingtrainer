import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { encode, decode } from '../util/Util';
import { Composition } from './composition';

@Injectable()
export class PlayerService {
    public static dataUrl1 = 'https://raw.githubusercontent.com/spheras/backingtrainer/compositions';
    //public static dataUrl1 = 'assets/data';

    constructor(private http: Http) { }

    public getSoundfont(): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve) => {
            let url = 'assets/soundfonts/FluidR3 GM2-2.sf2';
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
            this.http.request(req)
                .map((r: Response) => {
                    return r.arrayBuffer();
                })
                .catch((error) => {
                    console.error(error);
                    throw error;
                }).subscribe((response: ArrayBuffer) => {
                    resolve(response);
                });
        });
    }

    /**
     * @name getMP3
     * @description return the mp3 enconded in b64
     * @param {string} url the url to load
     * @return {Promise<String>} the promise to load the mp3
     */
    public getMP3(url: string): Promise<string> {
        return new Promise<string>((resolve) => {
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
            this.http.request(req)
                .map((r: Response) => {
                    return r.arrayBuffer();
                })
                .catch((error) => {
                    console.error(error);
                    throw error;
                }).subscribe((response: ArrayBuffer) => {
                    resolve(encode(response));
                });
        });
    }


    /**
     * @name getScore
     * @description return the score xml string corresponding to the composition. It can be retrieved directly from memory or downloading from server.
     * @param {Composition} comp the composition info to obtain the score xml data
     * @return Promise to get the String
     */
    public getScore(comp: Composition): Promise<string> {
        return new Promise<string>((resolve) => {
            if (comp.scoreXMLData != null) {
                resolve(comp.scoreXMLData);
            } else {
                let url = PlayerService.dataUrl1 + '/[' + comp.id + ']-' + comp.scoreURL;
                this.http
                    .get(url)
                    .map((r: Response) => {
                        return r.text();
                    })
                    .catch((error) => {
                        console.error(error);
                        throw error;
                    }).subscribe((data: string) => {
                        resolve(data);
                    });
            }
        });
    }

    /**
     * @name getMidi
     * @description return the midi ArrayBuffer data corresponding to the composition param. It can be retrieved directly from memory or downloading from server.
     * @param {Composition} comp the composition info to obtain the midi arraybuffer data
     * @return the promise to obtain the arraybuffer
     */
    public getMidi(comp: Composition): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve) => {
            if (comp.midiB64Data != null) {
                let buffer: ArrayBuffer = decode(comp.midiB64Data);
                resolve(buffer);
            } else {
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
                this.http.request(req)
                    .map((r: Response) => {
                        return r.arrayBuffer();
                    })
                    .catch((error) => {
                        console.error(error);
                        throw error;
                    }).subscribe((response: ArrayBuffer) => {
                        resolve(response);
                    });
            }
        });
    }

}