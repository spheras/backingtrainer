import { Component } from '@angular/core';
declare var verovio: any;


@Component({
    templateUrl: 'trainer.component.html'
})

/**
 * @class
 * @name PlayerPage
 * @description Page to play a backing track
 */
export class TrainerPage {
    vrvToolkit: any = null;

    constructor() {
        this.vrvToolkit = new verovio.toolkit();
        var svg = this.vrvToolkit.renderData({}, {});
    }


}
