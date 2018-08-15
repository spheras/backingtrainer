import { Component, ViewChild, ElementRef } from '@angular/core';
import { Composition, Collection } from '../../../player/composition';
import { PopoverController, NavParams, ViewController } from 'ionic-angular';


@Component({
  templateUrl: 'sort.component.html'
})
export class SortPage {
  public static SORT_BY_NAME = "NAME";
  public static SORT_BY_AUTHOR = "AUTHOR";
  public static SORT_BY_LEVEL = "LEVEL";
  public sortby: string = SortPage.SORT_BY_NAME;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.sortby = this.navParams.get("data");
  }

  close() {
    this.viewCtrl.dismiss(this.sortby);
  }

  sort(sortBy: string) {
    this.sortby = sortBy;
    this.close();
  }

  /**
   * @name sort
   * @description sort an array of compositions by a given criteria
   * @param {string} by the criteria,  @see SORT_BY_NAME and SORT_BY_AUTHOR
   * @param {Composition[]} compositions the list to sort
   * @result {Composition[]} the array sorted
   */
  public static sort(by: string, compositions: Composition[]): Composition[] {
    return compositions.sort(function (a: Composition, b: Composition): number {

      //default case sort by composition name
      let a1field: any = a.name;
      let b1field: any = b.name;
      let a2field: string = a.author;
      let b2field: string = b.author;

      //case sort by author
      if (by == SortPage.SORT_BY_AUTHOR) {
        a1field = a.author;
        b1field = b.author;
        a2field = a.name;
        b2field = b.name;
      }

      //case sort by level
      if (by == SortPage.SORT_BY_LEVEL) {
        a1field = a.level;
        b1field = b.level;
        a2field = a.name;
        b2field = b.name;
      }

      if (a1field === b1field) {
        if (a2field == b2field) {
          if (a.level == b.level) {
            if (a.frontInstrument.name == b.frontInstrument.name) return 0;
            if (a.frontInstrument.name < b.frontInstrument.name) return -1;
            if (a.frontInstrument.name > b.frontInstrument.name) return 1;
          } else {
            if (a.level < b.level) return -1;
            if (a.level > b.level) return 1;
          }
        } else {
          if (a2field < b2field) return -1;
          if (a2field > b2field) return 1;
        }
      } else {
        if (a1field < b1field) return -1;
        if (a1field > b1field) return 1;
      }
      return 1;
    });
  }
}

