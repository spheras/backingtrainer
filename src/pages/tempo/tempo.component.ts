import { Component, OnInit, ElementRef, ApplicationRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavParams, App } from 'ionic-angular';
import { Composition } from '../../player/composition';
import { KnobComponent } from 'ng2-knob';
declare var $: any;

@Component({

    templateUrl: 'tempo.component.html',
    selector: 'tempo'
})

/**
 * @class
 * @name TempoPage
 * @description Page to display tempo and configure it
 */
export class TempoPage implements OnInit {
    private composition: Composition = null;
    tempo: number = 0;
    @ViewChild('myknob1') knob: KnobComponent;
    @Output("save") saveEvent = new EventEmitter();
    @Output("cancel") cancelEvent = new EventEmitter();

    constructor(private app: App, private appref: ApplicationRef, navParams: NavParams, private el: ElementRef) {
        //we get from the params the composition we want to train
        this.composition = navParams.data;
    }

    ngOnInit(): void {
        let width = this.el.nativeElement.offsetWidth;
        let height = this.el.nativeElement.offsetHeight;

        let size = Math.ceil(width * 0.8);
        if (width > height) {
            size = Math.ceil(height * 0.6);
        }

        $(".tempo-knob.container-knob").css("width", size + "px");
        $(".tempo-knob.container-knob").css("height", size + "px");
        $(".tempo-knob.container-knob").css("position", "absolute");
        $(".tempo-knob.container-knob").css("margin-left", "calc(50% - " + Math.ceil((size / 2)) + "px)");
        $(".tempo-knob.container-knob").css("margin-top", Math.ceil((height / 2) - (size / 2)) + "px");

        $(".tempo-knob.container-knob .skin3").css("width", size + "px");
        $(".tempo-knob.container-knob .skin3").css("height", size + "px");

        $(".tempo-knob.container-knob .knob").css("width", size + "px");
        $(".tempo-knob.container-knob .knob").css("height", size + "px");

        this.knob.writeValue(this.composition.currentTempo);
        this.tempo = this.composition.currentTempo;
        //look to other place (I need to perform some magic)
        (<any>this.knob).maxDistance = size;
    }

    /**
  * @name setTempo
  * @description set the tempo of the midi loaded
  * @param {number} bpm beats per minute
  */
    setTempo(bpm: number) {
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
    }

    reset() {
        this.knob.writeValue(this.composition.originalTempo);
        this.tempo = this.composition.originalTempo;
    }

    save() {
        this.saveEvent.emit(this.tempo);
    }

    cancel() {
        this.cancelEvent.emit();
    }
}