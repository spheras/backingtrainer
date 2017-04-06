import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Composition } from '../../../player/composition';

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService]
})
export class SearchPage {

    private compositions: Composition[] = [];

    constructor(private service: SearchService) {
        this.service.getServerIndex().subscribe((compositions) => {
            this.compositions = compositions;
        });
    }

}