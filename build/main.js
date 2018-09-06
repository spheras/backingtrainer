webpackJsonp([0],{

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 216;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recent_recent_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__downloaded_downloaded_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__info_info_component__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MainPage = /** @class */ (function () {
    function MainPage(menu) {
        this.menu = menu;
        this.tab0 = __WEBPACK_IMPORTED_MODULE_4__info_info_component__["a" /* InfoPage */];
        this.tab1 = __WEBPACK_IMPORTED_MODULE_1__recent_recent_component__["a" /* RecentPage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_2__downloaded_downloaded_component__["a" /* DownloadedPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_3__search_search_component__["a" /* SearchPage */];
        this.currentTab = null;
    }
    MainPage.prototype.ionViewWillEnter = function () {
        this.enableMenus();
    };
    MainPage.prototype.ionViewWillLeave = function () {
        this.disableMenus();
    };
    /**
     * @name enableMenus
     * @description Enable the corresponding menu to the selected tab
     */
    MainPage.prototype.enableMenus = function () {
        if (this.currentTab != null) {
            if (this.currentTab.root === __WEBPACK_IMPORTED_MODULE_1__recent_recent_component__["a" /* RecentPage */]) {
            }
            else if (this.currentTab.root === __WEBPACK_IMPORTED_MODULE_2__downloaded_downloaded_component__["a" /* DownloadedPage */]) {
            }
            else if (this.currentTab.root === __WEBPACK_IMPORTED_MODULE_3__search_search_component__["a" /* SearchPage */]) {
                this.menu.enable(true, 'menu-search');
            }
        }
        else {
            this.disableMenus();
        }
    };
    /**
     * @name disableMenus
     * @description disable all the menus for all the tabs
     */
    MainPage.prototype.disableMenus = function () {
        this.menu.enable(false, 'menu-search');
    };
    /**
     * @name change
     * @description capture the change event for the ion-tab component
     * @param {Tab} tab the selected tab
     */
    MainPage.prototype.change = function (tab) {
        this.currentTab = tab;
        this.disableMenus();
        this.enableMenus();
    };
    MainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/main.component.html"*/'<ion-tabs color="primary" tabsHighlight="true" tabsPlacement="bottom" (ionChange)="change($event)">\n    <ion-tab tabIcon="information-circle" tabTitle=" {{ \'MAIN-INFO\' | translate }}" [root]="tab0"></ion-tab>\n    <ion-tab tabIcon="flame" tabTitle=" {{ \'MAIN-RECENT\' | translate }}" [root]="tab1"></ion-tab>\n    <ion-tab tabIcon="cloud-download" tabTitle=" {{ \'MAIN-DOWNLOADED\' | translate }}" [root]="tab2"></ion-tab>\n    <ion-tab tabIcon="search" tabTitle=" {{ \'MAIN-SEARCH\' | translate }}" [root]="tab3"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/main.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* MenuController */]])
    ], MainPage);
    return MainPage;
}());

//# sourceMappingURL=main.component.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_midiplayer__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_mp3player__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dao_dao__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__trainer_trainer_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RecentPage = /** @class */ (function () {
    function RecentPage(app, midiPlayer, mp3Player, popoverCtrl, dao, loadingCtrl) {
        this.app = app;
        this.midiPlayer = midiPlayer;
        this.mp3Player = mp3Player;
        this.popoverCtrl = popoverCtrl;
        this.dao = dao;
        this.loadingCtrl = loadingCtrl;
        this.compositions = [];
        this.filteredComp = [];
        this.lastCompositionsSearch = "";
        this.sortby = __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */].SORT_BY_NAME;
    }
    RecentPage.prototype.enableMenus = function () {
    };
    RecentPage.prototype.disableMenus = function () {
    };
    RecentPage.prototype.ionViewDidEnter = function () {
        this.loadCompositions();
    };
    RecentPage.prototype.onSortPopup = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */], { data: this.sortby });
        popover.present({
            ev: myEvent
        }).then(function (value) {
            //nothing
        });
        popover.onWillDismiss(function (data) {
            _this.sortby = data;
            _this.filterCompositions(_this.lastCompositionsSearch);
        });
    };
    /**
     * @name loadCompositions
     * @description load the compositions downloaded
     * @return the promise to load them
     */
    RecentPage.prototype.loadCompositions = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.dao.getRecents().then(function (compositions) {
                _this.compositions = compositions;
                _this.filteredComp = _this.compositions;
                resolve();
            });
        });
    };
    /**
     * @name stopMidi
     * @description stop the currently midi being played
     */
    RecentPage.prototype.stopMidi = function (index) {
        var comp = this.filteredComp[index];
        comp.flagPlaying = false;
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
    };
    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param <number> index the index to be played
     */
    RecentPage.prototype.playMidi = function (index) {
        var _this = this;
        var comp = this.filteredComp[index];
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
        comp.flagPlaying = true;
        if (comp.mp3URL && comp.mp3URL.length > 0) {
            var url = __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/[' + comp.id + ']-' + comp.mp3URL;
            this.mp3Player.init(url).then(function () {
                _this.midiPlayer.load(comp).then(function () {
                    _this.mp3Player.play();
                    _this.midiPlayer.play();
                });
            });
        }
        else {
            this.midiPlayer.load(comp).then(function () {
                _this.midiPlayer.play();
            });
        }
    };
    RecentPage.prototype.removeComposition = function (index) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait while removing..."
        });
        loader.present();
        var comp = this.filteredComp[index];
        this.dao.removeRecent(comp.id).then(function () {
            _this.loadCompositions().then(function () {
                loader.dismiss();
            });
        });
    };
    /**
     * @name trainComposition
     * @description train the selected composition
     * @param {number} index the index of the composition selected
     */
    RecentPage.prototype.trainComposition = function (index) {
        var comp = this.filteredComp[index];
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__trainer_trainer_component__["a" /* TrainerPage */], comp);
    };
    /**
     * @name sortCompositions
     * @description sort the compositions by name, author, level and instrument
     */
    RecentPage.prototype.sortCompositions = function () {
        this.filteredComp = __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */].sort(this.sortby, this.filteredComp);
    };
    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param <string> val the value to filter
     */
    RecentPage.prototype.filterCompositions = function (val) {
        this.lastCompositionsSearch = val;
        //before continue, sorting the compositions properly
        this.sortCompositions();
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredComp = this.compositions.filter(function (item) {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            });
        }
        else {
            this.filteredComp = this.compositions;
        }
    };
    RecentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/recent/recent.component.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{\'RECENT-TITLE\' | translate}}</ion-title>\n        <button ion-button class="bt_sort" (click)="onSortPopup($event)">\n            <ion-icon name="funnel"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-searchbar (ionInput)="filterCompositions($event.target.value)"></ion-searchbar>\n\n    <ion-list>\n        <ng-template ngFor let-composition [ngForOf]="filteredComp" let-i="index">\n            <ion-item class="item">\n                <ion-row nowrap>\n                    <ion-col no-padding class="thumbnail-col">\n                        <ion-thumbnail class="thumbnail" item-left>\n                            <img class="instrument-icon" src="assets/icon/instruments/{{composition.frontInstrument.name.toLowerCase()}}.svg">\n                        </ion-thumbnail>\n                    </ion-col>\n                    <ion-col text-wrap>\n                        <h2><strong><a target="_blank" href="{{composition.wikipediaLink}}">{{composition.name}}</a></strong></h2>\n                        <h3>{{composition.author}}</h3>\n                        <p><strong>{{\'SEARCH-LEVEL\' | translate}}:{{composition.level}}</strong>{{(composition.description.length>0?\' | \' + composition.description:\'\')}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row align-items-start>\n                        <button *ngIf="!composition.flagPlaying" ion-button clear icon-left class="action" (click)="playMidi(i)">\n                            <ion-icon name=\'headset\'></ion-icon>\n                            {{\'SEARCH-PLAY\' | translate}}\n                        </button>\n                        <button *ngIf="composition.flagPlaying" ion-button clear icon-left class="action" (click)="stopMidi(i)">\n                            <ion-icon name=\'pause\'></ion-icon>\n                            {{\'SEARCH-STOP\' | translate}}\n                        </button>\n                        <button ion-button clear icon-left class="action" (click)="trainComposition(i)">\n                            <ion-icon name="musical-notes"></ion-icon>\n                            {{\'SEARCH-TRAIN\' | translate}}\n                        </button>\n                        <button ion-button clear icon-left color="danger" class="action" (click)="removeComposition(i)">\n                            <ion-icon name="trash"></ion-icon>\n                            {{\'DOWNLOADED-REMOVE\' | translate}}\n                        </button>\n                </ion-row>\n            </ion-item>\n        </ng-template>\n    </ion-list>\n\n</ion-content>\n-->'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/recent/recent.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__player_midiplayer__["a" /* MidiPlayer */], __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_2__player_mp3player__["a" /* MP3Player */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1__player_midiplayer__["a" /* MidiPlayer */],
            __WEBPACK_IMPORTED_MODULE_2__player_mp3player__["a" /* MP3Player */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_4__dao_dao__["a" /* DAO */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* LoadingController */]])
    ], RecentPage);
    return RecentPage;
}());

//# sourceMappingURL=recent.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export extend */
/* unused harmony export inArray */
/* harmony export (immutable) */ __webpack_exports__["b"] = encode;
/* harmony export (immutable) */ __webpack_exports__["a"] = decode;
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
function inArray(elem, array, i) {
    var len;
    if (array) {
        if (array.indexOf) {
            return array.indexOf.call(array, elem, i);
        }
        len = array.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
            // Skip accessing in sparse arrays
            if (i in array && array[i] === elem) {
                return i;
            }
        }
    }
    return -1;
}
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function encode(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if ((len % 3) === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
}
function decode(base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i + 1]);
        encoded3 = chars.indexOf(base64[i + 2]);
        encoded4 = chars.indexOf(base64[i + 3]);
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
}
//# sourceMappingURL=Util.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/**
 * Contains misc static utility methods.
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Converts a single byte to a hex string.
     * @param {number} byte
     * @return {string}
     */
    Utils.byteToHex = function (byte) {
        // Ensure hex string always has two chars
        return ('0' + byte.toString(16)).slice(-2);
    };
    /**
     * Converts an array of bytes to a hex string.
     * @param {array} byteArray
     * @return {string}
     */
    Utils.bytesToHex = function (byteArray) {
        var hex = [];
        byteArray.forEach(function (byte) { return hex.push(Utils.byteToHex(byte)); });
        return hex.join('');
    };
    /**
     * Converts a hex string to a number.
     * @param {string} hexString
     * @return {number}
     */
    Utils.hexToNumber = function (hexString) {
        return parseInt(hexString, 16);
    };
    /**
     * Converts an array of bytes to a number.
     * @param {array} byteArray
     * @return {number}
     */
    Utils.bytesToNumber = function (byteArray) {
        return Utils.hexToNumber(Utils.bytesToHex(byteArray));
    };
    /**
     * Converts an array of bytes to letters.
     * @param {array} byteArray
     * @return {string}
     */
    Utils.bytesToLetters = function (byteArray) {
        var letters = [];
        byteArray.forEach(function (byte) { return letters.push(String.fromCharCode(byte)); });
        return letters.join('');
    };
    /**
     * Converts a decimal to it's binary representation.
     * @param {number} dec
     * @return {string}
     */
    Utils.decToBinary = function (dec) {
        return (dec >>> 0).toString(2);
    };
    /**
     * Reads a variable length value.
     * @param {array} byteArray
     * @return {number}
     */
    Utils.readVarInt = function (byteArray) {
        var result = 0;
        byteArray.forEach(function (number) {
            var b = number;
            if (b & 0x80) {
                result += (b & 0x7f);
                result <<= 7;
            }
            else {
                /* b is the last byte */
                result += b;
            }
        });
        return result;
    };
    /**
     * Decodes base-64 encoded string
     * @param {string} string
     * @return {string}
     */
    Utils.atob = function (string) {
        if (typeof atob === 'function')
            return atob(string);
        console.log("no atob");
        //return new Buffer(string, 'base64').toString('binary');
    };
    return Utils;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PlayerSettings; });
var Settings = /** @class */ (function () {
    function Settings() {
        this.filterSettings = new FilterSettings();
        this.playerSettings = new PlayerSettings();
    }
    return Settings;
}());

var FilterSettings = /** @class */ (function () {
    function FilterSettings() {
        //instrumentos melódicos
        this.flute = true;
        this.clarinet = true;
        this.record = true;
        this.trumpet = true;
        this.saxophone = true;
    }
    return FilterSettings;
}());

var PlayerSettings = /** @class */ (function () {
    function PlayerSettings() {
        /**
         * indicates if we want to show a cursor during the playing
         */
        this.cursor = true;
        /**
         * if the cursor should move with animation or not. (animation needs optimal render from the navigator)
         */
        this.cursorAnimation = false;
        /**
         * inciates if we want to hear the backing track
         */
        this.playBack = true;
        /**
         * indicates if the soloist voice should be played during the training or not
         */
        this.playSoloist = false;
        /**
         * Indicates if we need a double preparation before starting playing the music
         */
        this.doublePreparation = true;
        /**
         * indicates if we want to play the metronome
         */
        this.metronome = false;
        /**
         * settings to indicate that we want the high quality instruments
         */
        this.highQuality = false;
        /**
         * the bluetooth delay to sync visual and sound
         */
        this.bluetoothDelay = 0;
    }
    return PlayerSettings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_Util__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlayerService = /** @class */ (function () {
    //public static dataUrl1 = 'assets/data';
    function PlayerService(http) {
        this.http = http;
    }
    PlayerService_1 = PlayerService;
    PlayerService.prototype.getSoundfont = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var url = 'assets/soundfonts/FluidR3 GM2-2.sf2';
            var basicOptions = {
                url: url,
                method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
                search: null,
                headers: null,
                body: null,
                withCredentials: false,
                responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].ArrayBuffer
            };
            var reqOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */](basicOptions);
            var req = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */](reqOptions);
            _this.http.request(req)
                .map(function (r) {
                return r.arrayBuffer();
            })
                .catch(function (error) {
                console.error(error);
                throw error;
            }).subscribe(function (response) {
                resolve(response);
            });
        });
    };
    /**
     * @name getMP3
     * @description return the mp3 enconded in b64
     * @param {string} url the url to load
     * @return {Promise<String>} the promise to load the mp3
     */
    PlayerService.prototype.getMP3 = function (url) {
        var _this = this;
        return new Promise(function (resolve) {
            var basicOptions = {
                url: url,
                method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
                search: null,
                headers: null,
                body: null,
                withCredentials: false,
                responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].ArrayBuffer
            };
            var reqOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */](basicOptions);
            var req = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */](reqOptions);
            _this.http.request(req)
                .map(function (r) {
                return r.arrayBuffer();
            })
                .catch(function (error) {
                console.error(error);
                throw error;
            }).subscribe(function (response) {
                resolve(Object(__WEBPACK_IMPORTED_MODULE_2__util_Util__["b" /* encode */])(response));
            });
        });
    };
    /**
     * @name getScore
     * @description return the score xml string corresponding to the composition. It can be retrieved directly from memory or downloading from server.
     * @param {Composition} comp the composition info to obtain the score xml data
     * @return Promise to get the String
     */
    PlayerService.prototype.getScore = function (comp) {
        var _this = this;
        return new Promise(function (resolve) {
            if (comp.scoreXMLData != null) {
                resolve(comp.scoreXMLData);
            }
            else {
                var url = PlayerService_1.dataUrl1 + '/[' + comp.id + ']-' + comp.scoreURL;
                _this.http
                    .get(url)
                    .map(function (r) {
                    return r.text();
                })
                    .catch(function (error) {
                    console.error(error);
                    throw error;
                }).subscribe(function (data) {
                    resolve(data);
                });
            }
        });
    };
    /**
     * @name getMidi
     * @description return the midi ArrayBuffer data corresponding to the composition param. It can be retrieved directly from memory or downloading from server.
     * @param {Composition} comp the composition info to obtain the midi arraybuffer data
     * @return the promise to obtain the arraybuffer
     */
    PlayerService.prototype.getMidi = function (comp) {
        var _this = this;
        return new Promise(function (resolve) {
            if (comp.midiB64Data != null) {
                var buffer = Object(__WEBPACK_IMPORTED_MODULE_2__util_Util__["a" /* decode */])(comp.midiB64Data);
                resolve(buffer);
            }
            else {
                var url = PlayerService_1.dataUrl1 + '/[' + comp.id + ']-' + comp.midiURL;
                var basicOptions = {
                    url: url,
                    method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
                    search: null,
                    headers: null,
                    body: null,
                    withCredentials: false,
                    responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].ArrayBuffer
                };
                var reqOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */](basicOptions);
                var req = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */](reqOptions);
                _this.http.request(req)
                    .map(function (r) {
                    return r.arrayBuffer();
                })
                    .catch(function (error) {
                    console.error(error);
                    throw error;
                }).subscribe(function (response) {
                    resolve(response);
                });
            }
        });
    };
    PlayerService.dataUrl1 = 'https://raw.githubusercontent.com/spheras/backingtrainer/compositions';
    PlayerService = PlayerService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], PlayerService);
    return PlayerService;
    var PlayerService_1;
}());

//# sourceMappingURL=player.service.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_midiplayer__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_mp3player__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dao_dao__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__trainer_trainer_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DownloadedPage = /** @class */ (function () {
    function DownloadedPage(app, midiPlayer, mp3Player, dao, loadingCtrl, popoverCtrl) {
        this.app = app;
        this.midiPlayer = midiPlayer;
        this.mp3Player = mp3Player;
        this.dao = dao;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.compositions = [];
        this.filteredComp = [];
        this.lastCompositionsSearch = "";
        this.sortby = __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */].SORT_BY_NAME;
    }
    DownloadedPage.prototype.enableMenus = function () {
    };
    DownloadedPage.prototype.disableMenus = function () {
    };
    DownloadedPage.prototype.ionViewDidEnter = function () {
        this.loadCompositions();
    };
    /**
     * @name loadCompositions
     * @description load the compositions downloaded
     * @return the promise to load them
     */
    DownloadedPage.prototype.loadCompositions = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.dao.getCompositions().then(function (compositions) {
                _this.compositions = compositions;
                _this.filteredComp = _this.compositions;
                _this.filterCompositions(_this.lastCompositionsSearch);
                resolve();
            });
        });
    };
    /**
     * @name stopMidi
     * @description stop the currently midi being played
     */
    DownloadedPage.prototype.stopMidi = function (index) {
        var comp = this.filteredComp[index];
        comp.flagPlaying = false;
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
    };
    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param <number> index the index to be played
     */
    DownloadedPage.prototype.playMidi = function (index) {
        var _this = this;
        var comp = this.filteredComp[index];
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
        comp.flagPlaying = true;
        if (comp.mp3URL && comp.mp3URL.length > 0) {
            var url = __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/[' + comp.id + ']-' + comp.mp3URL;
            this.mp3Player.init(url).then(function () {
                _this.midiPlayer.load(comp).then(function () {
                    _this.mp3Player.play();
                    _this.midiPlayer.play();
                });
            });
        }
        else {
            this.midiPlayer.load(comp).then(function () {
                _this.midiPlayer.play();
            });
        }
    };
    DownloadedPage.prototype.removeComposition = function (index) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait while removing..."
        });
        loader.present();
        var comp = this.filteredComp[index];
        this.dao.removeComposition(comp.id).then(function () {
            _this.loadCompositions().then(function () {
                loader.dismiss();
            });
        });
    };
    /**
     * @name trainComposition
     * @description train the selected composition
     * @param {number} index the index of the composition selected
     */
    DownloadedPage.prototype.trainComposition = function (index) {
        var comp = this.filteredComp[index];
        this.dao.addRecent(comp);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__trainer_trainer_component__["a" /* TrainerPage */], comp);
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    };
    DownloadedPage.prototype.onSortPopup = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */], { data: this.sortby });
        popover.present({
            ev: myEvent
        }).then(function (value) {
            //nothing
        });
        popover.onWillDismiss(function (data) {
            _this.sortby = data;
            _this.filterCompositions(_this.lastCompositionsSearch);
        });
    };
    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param <string> val the value to filter
     */
    DownloadedPage.prototype.filterCompositions = function (val) {
        this.lastCompositionsSearch = val;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredComp = this.compositions.filter(function (item) {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            });
        }
        else {
            this.filteredComp = this.compositions;
        }
        //before continue, sorting the compositions properly
        this.sortCompositions();
    };
    /**
     * @name sortCompositions
     * @description sort the compositions by name, author, level and instrument
     */
    DownloadedPage.prototype.sortCompositions = function () {
        this.filteredComp = __WEBPACK_IMPORTED_MODULE_7__sort_sort_component__["a" /* SortPage */].sort(this.sortby, this.filteredComp);
    };
    DownloadedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/downloaded/downloaded.component.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{\'DOWNLOADED-TITLE\' | translate}}</ion-title>\n        <button ion-button class="bt_sort" (click)="onSortPopup($event)">\n            <ion-icon name="funnel"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-searchbar (ionInput)="filterCompositions($event.target.value)"></ion-searchbar>\n\n    <ion-list>\n        <ng-template ngFor let-composition [ngForOf]="filteredComp" let-i="index">\n            <ion-item class="item">\n                <ion-row nowrap>\n                    <ion-col no-padding class="thumbnail-col">\n                        <ion-thumbnail class="thumbnail" item-left>\n                            <img class="instrument-icon" src="assets/icon/instruments/{{composition.frontInstrument.name.toLowerCase()}}.svg">\n                        </ion-thumbnail>\n                    </ion-col>\n                    <ion-col text-wrap>\n                        <h2><strong><a target="_blank" href="{{composition.wikipediaLink}}">{{composition.name}}</a></strong></h2>\n                        <h3>{{composition.author}}</h3>\n                        <p><strong>{{\'SEARCH-LEVEL\' | translate}}:{{composition.level}}</strong>{{(composition.description.length>0?\' | \' + composition.description:\'\')}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row align-items-start>\n                        <button *ngIf="!composition.flagPlaying" ion-button clear icon-left class="action" (click)="playMidi(i)">\n                            <ion-icon name=\'headset\'></ion-icon>\n                            {{\'SEARCH-PLAY\' | translate}}\n                        </button>\n                        <button *ngIf="composition.flagPlaying" ion-button clear icon-left class="action" (click)="stopMidi(i)">\n                            <ion-icon name=\'pause\'></ion-icon>\n                            {{\'SEARCH-STOP\' | translate}}\n                        </button>\n                        <button ion-button clear icon-left class="action" (click)="trainComposition(i)">\n                            <ion-icon name="musical-notes"></ion-icon>\n                            {{\'SEARCH-TRAIN\' | translate}}\n                        </button>\n                        <button ion-button clear icon-left color="danger" class="action" (click)="removeComposition(i)">\n                            <ion-icon name="trash"></ion-icon>\n                            {{\'DOWNLOADED-REMOVE\' | translate}}\n                        </button>\n                </ion-row>\n            </ion-item>\n        </ng-template>\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/downloaded/downloaded.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__player_midiplayer__["a" /* MidiPlayer */], __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_2__player_mp3player__["a" /* MP3Player */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1__player_midiplayer__["a" /* MidiPlayer */], __WEBPACK_IMPORTED_MODULE_2__player_mp3player__["a" /* MP3Player */],
            __WEBPACK_IMPORTED_MODULE_4__dao_dao__["a" /* DAO */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* PopoverController */]])
    ], DownloadedPage);
    return DownloadedPage;
}());

//# sourceMappingURL=downloaded.component.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_service__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_midiplayer__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_mp3player__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player_player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dao_dao__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__trainer_trainer_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort_sort_component__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SearchPage = /** @class */ (function () {
    function SearchPage(app, alertCtrl, service, midiPlayer, mp3Player, dao, popoverCtrl, loadingCtrl) {
        var _this = this;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.midiPlayer = midiPlayer;
        this.mp3Player = mp3Player;
        this.dao = dao;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.type = "compositions";
        this.compositions = [];
        this.filteredComp = [];
        this.collections = [];
        this.filteredCollections = [];
        this.daoSubscription = null;
        this.lastCompositionsSearch = "";
        this.sortby = __WEBPACK_IMPORTED_MODULE_8__sort_sort_component__["a" /* SortPage */].SORT_BY_NAME;
        this.dao.getSettings().then(function (settings) {
            _this.settings = settings;
        });
        this.daoSubscription = this.dao.observeSettings().subscribe(function (settings) {
            _this.settings = settings;
            _this.filterCompositions(_this.lastCompositionsSearch);
        });
        //first we get the compositions
        this.service.getServerCompositionIndex().subscribe(function (compositions) {
            _this.compositions = compositions;
            _this.filteredComp = _this.compositions;
            _this.dao.getSettings().then(function (settings) {
                _this.settings = settings;
                _this.filterCompositions("");
                _this.checkDownloaded();
            });
        });
        //second we get the collections
        this.service.getServerCollectionIndex().subscribe(function (collections) {
            _this.collections = collections;
            _this.filteredCollections = _this.collections;
            _this.dao.getSettings().then(function (settings) {
                _this.settings = settings;
                _this.filterCompositions("");
                _this.checkDownloaded();
            });
        });
    }
    SearchPage.prototype.ionViewDidLeave = function () {
        //settings unsubscription
        if (this.daoSubscription != null) {
            this.daoSubscription.unsubscribe();
        }
    };
    /**
     * @name checkDownloaded
     * @description check the flag downloaded for those compositions already downloaded
     */
    SearchPage.prototype.checkDownloaded = function () {
        var _this = this;
        this.dao.getCompositions().then(function (downloaded) {
            for (var i = 0; i < downloaded.length; i++) {
                for (var j = 0; j < _this.compositions.length; j++) {
                    if (downloaded[i].id == _this.compositions[j].id) {
                        _this.compositions[j].flagDownloaded = true;
                    }
                }
            }
        });
    };
    /**
      * @name trainComposition
      * @description train the selected composition
     * @param {number} indexComposition the index of the composition to be trained
     * @param {number} indexCollection (optional) the index of the collection to be trained
      */
    SearchPage.prototype.trainComposition = function (indexComposition, indexCollection) {
        var comp = null;
        if (indexCollection) {
            var coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        }
        else {
            comp = this.filteredComp[indexComposition];
        }
        this.dao.addRecent(comp);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__trainer_trainer_component__["a" /* TrainerPage */], comp, null, function () {
            //console.log('done');
        });
        //this.app.getRootNav().setRoot(TrainerPage, comp);
        //this.modalCtrl.create(TrainerPage, comp).present();
    };
    /**
     * @name downloadComposition
     * @description download an existing composition
     * @param {number} indexComposition the index of the composition to be downloaded
     * @param {number} indexCollection (optional) the index of the collection to be downloaded
     */
    SearchPage.prototype.downloadComposition = function (indexComposition, indexCollection) {
        var _this = this;
        var comp = null;
        if (indexCollection) {
            var coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        }
        else {
            comp = this.filteredComp[indexComposition];
        }
        var loader = this.loadingCtrl.create({
            content: "Please wait while downloading..."
        });
        loader.present();
        var midiPromise = this.service.downloadMidiB64(comp);
        var scorePromise = this.service.downloadScore(comp);
        midiPromise.subscribe(function (midib64) {
            comp.midiB64Data = midib64;
            scorePromise.subscribe(function (scorexml) {
                comp.scoreXMLData = scorexml;
                _this.dao.saveComposition(comp).then(function () {
                    comp.flagDownloaded = true;
                    loader.dismiss();
                });
            }, function (error) {
                loader.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Error downloading the score from the Server!',
                    buttons: ['OK']
                });
                alert.present();
            });
        }, function (error) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error downloading the midi from the Server!',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    /**
     * @name stopMidi
     * @description stop the currently midi being played
     * @param {number} indexComposition the index of the composition to be stopped
     * @param {number} indexCollection (optional) the index of the collection to be stopped
     */
    SearchPage.prototype.stopMidi = function (indexComposition, indexCollection) {
        var comp = null;
        if (indexCollection) {
            var coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        }
        else {
            comp = this.filteredComp[indexComposition];
        }
        comp.flagPlaying = false;
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
    };
    SearchPage.prototype.onSortPopup = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__sort_sort_component__["a" /* SortPage */], { data: this.sortby });
        popover.present({
            ev: myEvent
        }).then(function (value) {
            //nothing
        });
        popover.onWillDismiss(function (data) {
            _this.sortby = data;
            _this.filterCompositions(_this.lastCompositionsSearch);
        });
    };
    /**
     * @name playMidi
     * @description play the midi file linked with the composition
     * @param {number} indexComposition the index of the composition to be played
     * @param {number} indexCollection (optional) the index of the collection to be played
     */
    SearchPage.prototype.playMidi = function (indexComposition, indexCollection) {
        var _this = this;
        var comp = null;
        if (indexCollection) {
            var coll = this.filteredCollections[indexCollection];
            comp = coll.compositions[indexComposition];
        }
        else {
            comp = this.filteredComp[indexComposition];
        }
        this.mp3Player.stop();
        this.mp3Player.reset();
        this.midiPlayer.stop();
        comp.flagPlaying = true;
        if (comp.mp3URL && comp.mp3URL.length > 0) {
            var url = __WEBPACK_IMPORTED_MODULE_4__player_player_service__["a" /* PlayerService */].dataUrl1 + '/[' + comp.id + ']-' + comp.mp3URL;
            this.mp3Player.init(url).then(function () {
                _this.midiPlayer.load(comp).then(function () {
                    _this.mp3Player.play();
                    _this.midiPlayer.play();
                });
            });
        }
        else {
            this.midiPlayer.load(comp).then(function () {
                _this.midiPlayer.play();
            });
        }
    };
    /**
     * @name searchCompositions
     * @description filter the compositions by a value
     * @param {string} val the value to filter
     */
    SearchPage.prototype.filterCompositions = function (val) {
        var _this = this;
        this.lastCompositionsSearch = val;
        // if the value is an empty string don't filter the items
        val = val.toLowerCase();
        this.filteredComp = this.compositions.filter(function (item) {
            if (!_this.isValidInstrument(item.frontInstrument.name)) {
                return false;
            }
            if (val && val.trim().length > 0) {
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.frontInstrument.name.toLowerCase().indexOf(val) > -1);
            }
            else {
                return true;
            }
        });
        //before continue, sorting the compositions properly
        this.sortCompositions();
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            val = val.toLowerCase();
            this.filteredCollections = this.collections.filter(function (item) {
                if (!_this.isValidInstrument(item.instrument)) {
                    return false;
                }
                return (item.author.toLowerCase().indexOf(val) > -1) ||
                    (item.name.toLowerCase().indexOf(val) > -1) ||
                    (item.instrument.toLowerCase().indexOf(val) > -1);
            });
        }
        else {
            this.filteredCollections = this.collections;
        }
    };
    /**
     * @name isValidInstrument
     * @description check if a certain instrument is valid in terms of is can be showed or not
     * @param {string} name the name of the instrument
     * @return {boolean} true if it can be showed
     */
    SearchPage.prototype.isValidInstrument = function (name) {
        name = name.toLowerCase();
        if (this.settings) {
            if (this.settings.filterSettings) {
                if (!this.settings.filterSettings.clarinet && name == "clarinet") {
                    return false;
                }
                if (!this.settings.filterSettings.flute && name == "flute") {
                    return false;
                }
                if (!this.settings.filterSettings.record && name == "record") {
                    return false;
                }
                if (!this.settings.filterSettings.saxophone && name == "saxophone") {
                    return false;
                }
                if (!this.settings.filterSettings.trumpet && name == "trumpet") {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @name sortCompositions
     * @description sort the compositions by name, author, level and instrument
     */
    SearchPage.prototype.sortCompositions = function () {
        this.filteredComp = __WEBPACK_IMPORTED_MODULE_8__sort_sort_component__["a" /* SortPage */].sort(this.sortby, this.filteredComp);
    };
    SearchPage.prototype.expandCollection = function (index) {
        var col = this.filteredCollections[index];
        col.flagExpanded = !col.flagExpanded;
        if (col.flagExpanded && !col.compositions) {
            col.compositions = [];
            for (var i = 0; i < col.compositionIds.length; i++) {
                var id = col.compositionIds[i];
                for (var j = 0; j < this.compositions.length; j++) {
                    if (id == this.compositions[j].id) {
                        col.compositions.push(this.compositions[j]);
                        break;
                    }
                }
            }
        }
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/search/search.component.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{\'SEARCH-TITLE\' | translate}}</ion-title>\n        <button ion-button class="bt_sort" (click)="onSortPopup($event)">\n            <ion-icon name="funnel"></ion-icon>\n        </button>\n    </ion-navbar>\n\n    <ion-toolbar no-border-top color="primary">\n        <ion-segment [(ngModel)]="type" color="light">\n            <ion-segment-button value="compositions">\n                {{ \'SEARCH-TAB-COMPOSITIONS\'  | translate}}\n            </ion-segment-button>\n            <ion-segment-button value="collections">\n                {{ \'SEARCH-TAB-COLLECTIONS\'  | translate}}\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content [ngSwitch]="type">\n\n    <ion-searchbar (ionInput)="filterCompositions($event.target.value)">\n    </ion-searchbar>\n    \n    <div *ngSwitchCase="\'compositions\'">\n\n        <ion-list>\n            <ng-template ngFor let-composition [ngForOf]="filteredComp" let-i="index">\n                <ion-item class="item">\n                    <ion-row nowrap>\n                        <ion-col no-padding class="thumbnail-col">\n                            <ion-thumbnail class="thumbnail" item-left>\n                                <img class="instrument-icon" src="assets/icon/instruments/{{composition.frontInstrument.name.toLowerCase()}}.svg">\n                            </ion-thumbnail>\n                        </ion-col>\n                        <ion-col text-wrap>\n                            <h2><strong><a target="_blank" href="{{composition.wikipediaLink}}">{{composition.name}}</a></strong></h2>\n                            <h3>{{composition.author}}</h3>\n                            <p><strong>{{\'SEARCH-LEVEL\' | translate}}:{{composition.level}}</strong>{{(composition.description.length>0?\'\n                                | \' + composition.description:\'\')}}</p>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row align-items-start>\n                        <button *ngIf="!composition.flagPlaying" ion-button clear icon-left class="action" (click)="playMidi(i)">\n                            <ion-icon name=\'headset\'></ion-icon>\n                            {{\'SEARCH-PLAY\' | translate}}\n                        </button>\n                        <button *ngIf="composition.flagPlaying" ion-button clear icon-left class="action" (click)="stopMidi(i)">\n                            <ion-icon name=\'pause\'></ion-icon>\n                            {{\'SEARCH-STOP\' | translate}}\n                        </button>\n                        <button ion-button clear icon-left class="action" (click)="trainComposition(i)">\n                            <ion-icon name="musical-notes"></ion-icon>\n                            {{\'SEARCH-TRAIN\' | translate}}\n                        </button>\n                        <button *ngIf="composition.flagDownloaded" ion-button clear color="ok" class="action" icon-left>\n                            <ion-icon name="checkmark"></ion-icon>\n                            {{\'SEARCH-DOWNLOADED\' | translate}}\n                        </button>\n                        <button *ngIf="!composition.flagDownloaded" ion-button clear icon-left class="action" (click)="downloadComposition(i)">\n                            <ion-icon name="cloud-download"></ion-icon>\n                            {{\'SEARCH-DOWNLOAD\' | translate}}\n                        </button>\n                    </ion-row>\n                </ion-item>\n            </ng-template>\n        </ion-list>\n    </div>\n\n    <div *ngSwitchCase="\'collections\'">\n        <ion-list>\n\n            <ng-template ngFor let-collection [ngForOf]="filteredCollections" let-j="index">\n                <ion-item class="item" (click)="expandCollection(j)" [class.expanded]="collection.flagExpanded">\n                    <ion-row nowrap>\n\n                        <ion-icon *ngIf="!collection.flagExpanded" class="composition-add" name=\'add-circle\'></ion-icon>\n                        <ion-icon *ngIf="collection.flagExpanded" class="composition-add" name=\'remove-circle\'></ion-icon>\n\n                        <ion-col no-padding class="thumbnail-col">\n                            <ion-thumbnail class="thumbnail" item-left>\n                                <img class="instrument-icon composition" src="assets/icon/instruments/{{collection.instrument.toLowerCase()}}.svg">\n                            </ion-thumbnail>\n                        </ion-col>\n                        <ion-col text-wrap>\n                            <h2><strong>{{collection.name}}</strong></h2>\n                            <h3>{{collection.author}}</h3>\n                            <p><strong>{{\'SEARCH-LEVEL\' | translate}}:{{collection.level}}</strong>{{(collection.description.length>0?\'\n                                | \' + collection.description:\'\')}}</p>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-list>\n                        <ng-template ngFor let-composition [ngForOf]="collection.compositions" let-i="index">\n                            <ion-item class="item subitem" (click)="$event.stopPropagation();$event.preventDefault();">\n                                <ion-row nowrap>\n                                    <ion-col no-padding class="thumbnail-col">\n                                        <ion-thumbnail class="thumbnail" item-left>\n                                            <img class="instrument-icon" src="assets/icon/instruments/{{composition.frontInstrument.name.toLowerCase()}}.svg">\n                                        </ion-thumbnail>\n                                    </ion-col>\n                                    <ion-col text-wrap>\n                                        <h2><strong><a target="_blank" href="{{composition.wikipediaLink}}">{{composition.name}}</a></strong></h2>\n                                        <h3>{{composition.author}}</h3>\n                                        <p><strong>{{\'SEARCH-LEVEL\' | translate}}:{{composition.level}}</strong>{{(composition.description.length>0?\'\n                                            | \' + composition.description:\'\')}}</p>\n                                    </ion-col>\n                                </ion-row>\n                                <ion-row align-items-start>\n                                    <button *ngIf="!composition.flagPlaying" ion-button clear icon-left class="action" (click)="playMidi(i,j)">\n                                    <ion-icon name=\'headset\'></ion-icon>\n                                    {{\'SEARCH-PLAY\' | translate}}\n                                </button>\n                                    <button *ngIf="composition.flagPlaying" ion-button clear icon-left class="action" (click)="stopMidi(i,j)">\n                                    <ion-icon name=\'pause\'></ion-icon>\n                                    {{\'SEARCH-STOP\' | translate}}\n                                </button>\n                                    <button ion-button clear icon-left class="action" (click)="trainComposition(i,j)">\n                                    <ion-icon name="musical-notes"></ion-icon>\n                                    {{\'SEARCH-TRAIN\' | translate}}\n                                </button>\n                                    <button *ngIf="composition.flagDownloaded" ion-button clear color="ok" class="action" icon-left>\n                                    <ion-icon name="checkmark"></ion-icon>\n                                    {{\'SEARCH-DOWNLOADED\' | translate}}\n                                </button>\n                                    <button *ngIf="!composition.flagDownloaded" ion-button clear icon-left class="action" (click)="downloadComposition(i,j)">\n                                    <ion-icon name="cloud-download"></ion-icon>\n                                    {{\'SEARCH-DOWNLOAD\' | translate}}\n                                </button>\n                                </ion-row>\n                            </ion-item>\n                        </ng-template>\n                    </ion-list>\n                </ion-item>\n            </ng-template>\n\n        </ion-list>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/search/search.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__search_service__["a" /* SearchService */], __WEBPACK_IMPORTED_MODULE_2__player_midiplayer__["a" /* MidiPlayer */], __WEBPACK_IMPORTED_MODULE_4__player_player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_3__player_mp3player__["a" /* MP3Player */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1__search_service__["a" /* SearchService */],
            __WEBPACK_IMPORTED_MODULE_2__player_midiplayer__["a" /* MidiPlayer */], __WEBPACK_IMPORTED_MODULE_3__player_mp3player__["a" /* MP3Player */], __WEBPACK_IMPORTED_MODULE_5__dao_dao__["a" /* DAO */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* LoadingController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__credits_credits_component__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__downloads_downloads_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player_player_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InfoPage = /** @class */ (function () {
    function InfoPage(modalCtrl, service) {
        this.modalCtrl = modalCtrl;
        this.service = service;
    }
    /**
     * @name showCredits
     * @description show the credits of the application
     */
    InfoPage.prototype.showCredits = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__credits_credits_component__["a" /* CreditsPage */]).present();
    };
    /**
     * @name showDownloads
     * @description show the downloads of the application
     */
    InfoPage.prototype.showDownloads = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__downloads_downloads_component__["a" /* DownloadsPage */]).present();
    };
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/info/info.component.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Backing Trainer v1.0.3</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-slides pager>\n\n        <ion-slide class="slide1">\n            <div class="container">\n                \n                <a href="https://github.com/spheras/backingtrainer" target="_blank"><ion-icon class="github" name="logo-github"></ion-icon></a>\n                \n                <img src="assets/icon/info-logo.png" class="slide-image" />\n                <h2 class="slide-title">{{\'INFO-SLIDE1-TITLE\' | translate}}</h2>\n                <div [innerHtml]="\'INFO-SLIDE1-BODY\' | translate"></div>\n                <button ion-button round color="epoque" (click)="showCredits()">\n                    {{\'INFO-CREDITS\' | translate}}\n                </button>\n                <button class="downloads" ion-button round color="epoque" (click)="showDownloads()">\n                    {{\'INFO-DOWNLOADS\' | translate}}\n                </button>\n            </div>\n        </ion-slide>\n\n        <!--\n        <ion-slide>\n            <div class="container">\n                <img src="assets/icon/info-alpha.png" class="slide-image" />\n                <h2><strong>{{\'INFO-SLIDE2-TITLE\' | translate}}</strong></h2>\n                <div [innerHtml]="\'INFO-SLIDE2-BODY\' | translate"></div>\n            </div>\n        </ion-slide>\n        -->\n\n        <ion-slide>\n            <div class="container">\n                <img src="assets/icon/info-work.png" class="slide-image" />\n                <h2><strong>{{\'INFO-SLIDE3-TITLE\' | translate }}</strong></h2>\n                <div [innerHtml]="\'INFO-SLIDE3-BODY\' | translate"></div>\n            </div>\n        </ion-slide>\n\n        <ion-slide>\n            <div class="container">\n                <img src="assets/icon/info-mobile.png" class="slide-image" />\n                <h2><strong>{{\'INFO-SLIDE4-TITLE\' | translate}}</strong></h2>\n                <div [innerHtml]="\'INFO-SLIDE4-BODY\' | translate"></div>\n                <button class="downloads" ion-button round color="epoque" (click)="showDownloads()">\n                    {{\'INFO-DOWNLOADS\' | translate}}\n                </button>\n            </div>\n        </ion-slide>\n\n        <ion-slide>\n            <div class="container">\n                <img src="assets/icon/info-language.png" class="slide-image" />\n                <h2><strong>{{\'INFO-SLIDE5-TITLE\' | translate }}</strong></h2>\n                <div [innerHtml]="\'INFO-SLIDE5-BODY\' | translate"></div>\n            </div>\n        </ion-slide>\n\n        <ion-slide>\n            <div class="container">\n                <img src="assets/icon/info-go.png" class="slide-image" />\n                <h2><strong>{{\'INFO-SLIDE6-TITLE\' | translate }}</strong></h2>\n                <div [innerHtml]="\'INFO-SLIDE6-BODY\' | translate"></div>\n            </div>\n        </ion-slide>\n\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/info/info.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__player_player_service__["a" /* PlayerService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__player_player_service__["a" /* PlayerService */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CreditsPage = /** @class */ (function () {
    function CreditsPage() {
    }
    CreditsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/credits/credits.component.html"*/'<ion-header>\n    <ion-navbar class="force-back-button" color="primary">\n        <ion-title>{{\'CREDITS-TITLE\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="container">\n        <ion-card>\n            <ion-card-content>\n                <ion-avatar item-left>\n                    <img class="avatar" src="assets/icon/avatar.png">\n                </ion-avatar>\n                <ion-card-title>\n                    spheras - José Amuedo Salmerón\n                </ion-card-title>\n                <p>\n                    (spheras)=&gt;{{\'{\'}}console.log(&quot;<strong>BackingTrainer Developer and Designer</strong>&quot;){{\'}\'}};\n                </p>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    Willem Vree\n                </ion-card-title>\n                <p>\n                    Library to convert musicxml to ABC notation.\n                </p>\n                <a href="https://wim.vree.org" target="_blank">https://wim.vree.org/js/xml2abc-js.html</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    Jean-Francois Moine\n                </ion-card-title>\n                <p>\n                    Library to convert ABC notation to SVG score.\n                </p>\n                <a href="http://moinejf.free.fr/js" target="_blank">http://moinejf.free.fr/js</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    danigb\n                </ion-card-title>\n                <p>\n                    Sound Font player library.\n                </p>\n                <a href="https://github.com/danigb/soundfont-player" target="_blank">https://github.com/danigb/soundfont-player</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    Chris Wilson\n                </ion-card-title>\n                <p>\n                    Pitch Detection Library\n                </p>\n                <a href="https://github.com/cwilso/PitchDetect" target="_blank">https://github.com/cwilso/PitchDetect</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    Garrett Grimm\n                </ion-card-title>\n                <p>\n                    Midi Player Library\n                </p>\n                <a href="https://github.com/grimmdude/MidiPlayerJS" target="_blank">https://github.com/grimmdude/MidiPlayerJS</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    Ionic Team\n                </ion-card-title>\n                <p>\n                    Ionic framework\n                </p>\n                <a href="https://ionicframework.com/" target="_blank">https://ionicframework.com/</a>\n            </ion-card-content>\n        </ion-card>\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    and thousands of many other open source libraries\n                </ion-card-title>\n                <p>\n                    Long Live Open Source! THANKS TO ALL!!!\n                </p>\n                <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank">https://en.wikipedia.org/wiki/Open-source_software</a>\n            </ion-card-content>\n        </ion-card>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/credits/credits.component.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], CreditsPage);
    return CreditsPage;
}());

//# sourceMappingURL=credits.component.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DownloadsPage = /** @class */ (function () {
    function DownloadsPage() {
    }
    DownloadsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/downloads/downloads.component.html"*/'<ion-header>\n    <ion-navbar class="force-back-button" color="primary">\n        <ion-title>{{\'DOWNLOADS-TITLE\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="container">\n        <p>{{\'DOWNLOADS-TITLE1\' | translate}}</p>\n        <p>{{\'DOWNLOADS-TITLE2\' | translate}}</p>\n\n        <a href="https://github.com/spheras/backingtrainer/releases" target="_blank"><ion-icon class="logo" name="logo-windows"></ion-icon></a>\n        <a href="https://github.com/spheras/backingtrainer/releases" target="_blank"><ion-icon class="logo" name="logo-tux"></ion-icon></a>\n        <a href="https://github.com/spheras/backingtrainer/releases" target="_blank"><ion-icon class="logo" name="logo-apple"></ion-icon></a>\n        \n        <a href="https://github.com/spheras/backingtrainer/releases" target="_blank"><ion-icon class="logo" name="logo-android"></ion-icon></a>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/downloads/downloads.component.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], DownloadsPage);
    return DownloadsPage;
}());

//# sourceMappingURL=downloads.component.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TunerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pitchdetect__ = __webpack_require__(724);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TunerPage = /** @class */ (function () {
    function TunerPage(_sanitizer, appref) {
        this._sanitizer = _sanitizer;
        this.appref = appref;
        this.data = new __WEBPACK_IMPORTED_MODULE_3__pitchdetect__["b" /* PitchDetectData */](0, "", "", 0);
        this.sensitivity = 0;
        this.pd = null;
        this.init();
    }
    TunerPage.prototype.init = function () {
        var _this = this;
        this.pd = new __WEBPACK_IMPORTED_MODULE_3__pitchdetect__["a" /* PitchDetect */]();
        this.sensitivity = 10 - (this.pd.sensitivity * 100);
        this.pd.toggleLiveInput().subscribe(function (value) {
            //console.log(value.detune + ":" + value.detuneAmount);
            var diff = value.detuneAmount;
            if (diff < 10) {
                diff = 0;
            }
            if (value.detune == "flat") {
                diff = -diff;
            }
            _this.difference = _this._sanitizer.bypassSecurityTrustStyle("rotate(" + diff + "deg )");
            _this.data = value;
            _this.appref.tick();
        }, function (error) { return console.error(error); }, function () { return console.log("fin"); });
    };
    TunerPage.prototype.ionViewWillLeave = function () {
        if (this.pd.isLiveInput) {
            this.pd.toggleLiveInput();
        }
        if (this.pd.isPlaying) {
            this.pd.toggleOscillator();
        }
        this.pd.close();
    };
    /**
     * @name listen
     * @description start/stop playing the oscillator
     */
    TunerPage.prototype.listen = function () {
        if (this.pd.isPlaying) {
            this.pd.toggleOscillator();
            this.pd.toggleLiveInput();
            this.pd.close();
            this.init();
        }
        else {
            this.pd.toggleOscillator();
        }
    };
    /**
     * @name change
     * @description the range component has changed the value
     * @param {Range} the event produced by the component with the new value
     */
    TunerPage.prototype.change = function (event) {
        this.pd.sensitivity = (10 - event.value) / 100;
    };
    TunerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/tuner/tuner.component.html"*/'<ion-header>\n    <ion-navbar class="force-back-button" color="primary">\n        <ion-title>{{\'TUNER-TITLE\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="container">\n        <h2>{{\'TUNER-ATTENTION\' | translate}}</h2>\n        <p>{{\'TUNER-ATTENTION-DESC\' | translate}}</p>\n\n        <div class="base">\n            <div [class.correct]="data.detuneAmount<10" class="note">{{data.note}}</div>\n            <div class="tunerknob" [style.transform]="difference"></div>\n        </div>\n\n        <h3>{{\'TUNER-SENSITIVITY\' | translate}}</h3>\n        <ion-range min="1" max="10" step="1" pin="true" snaps="true" [(ngModel)]="sensitivity" color="danger" (ionChange)="change($event)">\n            <ion-icon range-left small color="danger" name="pulse"></ion-icon>\n            <ion-icon range-right color="danger" name="pulse"></ion-icon>\n        </ion-range>\n        <button class="oscillator" ion-button icon-left round color="epoque" (click)="listen()">\n            <ion-icon *ngIf="!pd.isPlaying" name="volume-up"></ion-icon>\n            <ion-icon *ngIf="pd.isPlaying" name="volume-off"></ion-icon>\n            {{(!pd.isPlaying?\'TUNER-LISTEN\':\'TUNER-STOP\') | translate}}\n        </button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/tuner/tuner.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Navbar */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], TunerPage);
    return TunerPage;
}());

//# sourceMappingURL=tuner.component.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(379);



// this is the magic wand
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_main_main_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_main_search_search_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_main_downloaded_downloaded_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_main_recent_recent_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_main_info_info_component__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tuner_tuner_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_trainer_trainer_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_credits_credits_component__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_downloads_downloads_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tempo_tempo_component__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_translate_ng2_translate__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_knob__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_knob___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ng2_knob__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_main_sort_sort_component__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_main_main_component__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_trainer_trainer_component__["a" /* TrainerPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tuner_tuner_component__["a" /* TunerPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_main_info_info_component__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_credits_credits_component__["a" /* CreditsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_downloads_downloads_component__["a" /* DownloadsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_main_search_search_component__["a" /* SearchPage */], __WEBPACK_IMPORTED_MODULE_6__pages_main_downloaded_downloaded_component__["a" /* DownloadedPage */], __WEBPACK_IMPORTED_MODULE_7__pages_main_recent_recent_component__["a" /* RecentPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tempo_tempo_component__["a" /* TempoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_main_sort_sort_component__["a" /* SortPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_19_ng2_knob__["KnobModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14_ng2_translate_ng2_translate__["b" /* TranslateModule */].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_14_ng2_translate_ng2_translate__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_15__angular_http__["a" /* Http */]]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_main_main_component__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_trainer_trainer_component__["a" /* TrainerPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_main_info_info_component__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tuner_tuner_component__["a" /* TunerPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_credits_credits_component__["a" /* CreditsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_downloads_downloads_component__["a" /* DownloadsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_main_search_search_component__["a" /* SearchPage */], __WEBPACK_IMPORTED_MODULE_6__pages_main_downloaded_downloaded_component__["a" /* DownloadedPage */], __WEBPACK_IMPORTED_MODULE_7__pages_main_recent_recent_component__["a" /* RecentPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tempo_tempo_component__["a" /* TempoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_main_sort_sort_component__["a" /* SortPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ],
        })
    ], AppModule);
    return AppModule;
}());

function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_14_ng2_translate_ng2_translate__["c" /* TranslateStaticLoader */](http, 'assets/i18n', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_main_main_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tuner_tuner_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dao_dao__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dao_settings__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, translate, dao, modalCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuCtrl = menuCtrl;
        this.translate = translate;
        this.dao = dao;
        this.modalCtrl = modalCtrl;
        this.settings = new __WEBPACK_IMPORTED_MODULE_8__dao_settings__["c" /* Settings */]();
        /**
         * To set the root page
         */
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_main_main_component__["a" /* MainPage */];
        // this language will be used as a fallback when a translation isn't found in the current language
        this.initializeApp();
    }
    /**
     * @name initializeApp
     * @description initialize the application
     */
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.dao.getSettings().then(function (settings) {
            if (!settings.filterSettings) {
                settings.filterSettings = new __WEBPACK_IMPORTED_MODULE_8__dao_settings__["a" /* FilterSettings */]();
            }
            _this.settings = settings;
            _this.dao.observeSettings().subscribe(function (settings) {
                _this.settings = settings;
            });
        });
        this.initializeLocale();
    };
    MyApp.prototype.initializeLocale = function () {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    };
    /**
     * @name settingAnimation
     * @description set the animation cursor property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingAnimation = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.cursorAnimation = value;
            settings.playerSettings.cursorAnimation = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingCursor
     * @description set the cursor property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingCursor = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.cursor = value;
            settings.playerSettings.cursor = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingPlaySoloist
     * @description set the playSoloist property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingPlaySoloist = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.playSoloist = value;
            settings.playerSettings.playSoloist = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingPlayBack
     * @description set the playBack property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingPlayBack = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.playBack = value;
            settings.playerSettings.playBack = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name tune
     * @description show the tune page
     */
    MyApp.prototype.tune = function () {
        this.menuCtrl.close();
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_tuner_tuner_component__["a" /* TunerPage */]).present();
    };
    /**
     * @name settingDoublePreparation
     * @description set the double preparation property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingDoublePreparation = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.doublePreparation = value;
            settings.playerSettings.doublePreparation = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingMetronome
     * @description set the metrnome property
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingMetronome = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.metronome = value;
            settings.playerSettings.metronome = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingInstrumentFilter
     * @description set the instrument filter
     * @param {string} instrument the instrument name (translated to a field for the setting object)
     * @param {boolean} value the value to filter or not the instrument
     */
    MyApp.prototype.settingInstrumentFilter = function (instrument, value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            if (!settings.filterSettings) {
                settings.filterSettings = new __WEBPACK_IMPORTED_MODULE_8__dao_settings__["a" /* FilterSettings */]();
            }
            settings.filterSettings[instrument] = value;
            _this.settings.filterSettings = settings.filterSettings;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingHighQuality
     * @description set/unset the quality for sounds
     * @param {boolean} value the value to set
     */
    MyApp.prototype.settingHighQuality = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.highQuality = value;
            settings.playerSettings.highQuality = value;
            _this.dao.setSettings(settings);
        });
    };
    /**
     * @name settingBluetoothDelay
     * @description set/unset the bluetooth delay
     * @param {number} value the value to set
     */
    MyApp.prototype.settingBluetoothDelay = function (value) {
        var _this = this;
        this.dao.getSettings().then(function (settings) {
            _this.settings.playerSettings.bluetoothDelay = value;
            settings.playerSettings.bluetoothDelay = value;
            _this.dao.setSettings(settings);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/app/app.component.html"*/'<ion-menu [content]="content" side="right" id="menu-search" persistent="true" type="overlay" enabled="false">\n  <ion-header>\n    <ion-toolbar color="primary">\n      <ion-title>Opciones</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item>\n        <ion-label>Show Flute</ion-label>\n        <ion-toggle color="royal" [ngModel]="settings.filterSettings.flute" (ngModelChange)="settingInstrumentFilter(\'flute\',$event)"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label>Show Clarinet</ion-label>\n        <ion-toggle color="bright" [ngModel]="settings.filterSettings.clarinet" (ngModelChange)="settingInstrumentFilter(\'clarinet\',$event)"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label>Show Record</ion-label>\n        <ion-toggle color="primary" [ngModel]="settings.filterSettings.record" (ngModelChange)="settingInstrumentFilter(\'record\',$event)"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label>Show Trumpet</ion-label>\n        <ion-toggle color="subtle" [ngModel]="settings.filterSettings.trumpet" (ngModelChange)="settingInstrumentFilter(\'trumpet\',$event)"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label>Show Saxophone</ion-label>\n        <ion-toggle color="danger" [ngModel]="settings.filterSettings.saxophone" (ngModelChange)="settingInstrumentFilter(\'saxophone\',$event)"></ion-toggle>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-menu [content]="content" side="left" id="menu-trainer" persistent="true" type="overlay" enabled="false">\n  <ion-header>\n    <ion-toolbar color="primary">\n      <ion-title>{{ \'MENU-TRAINER-OPTIONS-TITLE\' | translate }}</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item text-wrap (click)="tune()">\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-TUNE-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-TUNE-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-icon name="microphone" item-right color="royal" (click)="tune()"></ion-icon>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-ANIMATION-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-ANIMATION-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="primary" [ngModel]="settings.playerSettings.cursorAnimation" (ngModelChange)="settingAnimation($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-CURSOR-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-CURSOR-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="bright" [ngModel]="settings.playerSettings.cursor" (ngModelChange)="settingCursor($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-PLAYBACK-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-PLAYBACK-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="royal" [ngModel]="settings.playerSettings.playBack" (ngModelChange)="settingPlayBack($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-SOLOIST-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-SOLOIST-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="subtle" [ngModel]="settings.playerSettings.playSoloist" (ngModelChange)="settingPlaySoloist($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-DOUBLEPREPARATION-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-DOUBLEPREPARATION-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="danger" [ngModel]="settings.playerSettings.doublePreparation" (ngModelChange)="settingDoublePreparation($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-METRONOME-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-METRONOME-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="danger" [ngModel]="settings.playerSettings.metronome" (ngModelChange)="settingMetronome($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-HIGHQUALITY-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-HIGHQUALITY-DESC\' | translate }}</h5>\n        </ion-label>\n        <ion-toggle color="bright" [ngModel]="settings.playerSettings.highQuality" (ngModelChange)="settingHighQuality($event)"></ion-toggle>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>\n          <strong>{{ \'MENU-TRAINER-BLUETOOTHDELAY-TITLE\' | translate }}</strong>\n          <h5>{{ \'MENU-TRAINER-BLUETOOTHDELAY-DESC\' | translate }}</h5>\n          <h6>({{settings.playerSettings.bluetoothDelay}}) ms</h6>\n        </ion-label>\n        <ion-range min="0" max="2000" step="50" snaps="true" color="royal" [ngModel]="settings.playerSettings.bluetoothDelay" (ngModelChange)="settingBluetoothDelay($event)">\n          <ion-icon range-left small name="time"></ion-icon>\n          <ion-icon range-right name="time"></ion-icon>\n        </ion-range>        \n      </ion-item>\n      \n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav #content [root]="rootPage" swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/app/app.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__dao_dao__["a" /* DAO */]]
        })
        /**
         * @class
         * @name MyApp
         * @description Application Class to start everything
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__dao_dao__["a" /* DAO */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__track__ = __webpack_require__(426);


/**
 * Main player class.  Contains methods to load files, start, stop.
 * @param {function} - Callback to fire for each MIDI event.  Can also be added with on('midiEvent', fn)
 * @param {array} - Array buffer of MIDI file (optional).
 */
var Player = /** @class */ (function () {
    function Player(eventHandler, buffer) {
        this.sampleRate = 5; // milliseconds
        this.startTime = 0;
        this.buffer = null;
        this.setIntervalId = null;
        this.tracks = [];
        this.tempo = 120;
        this.forcedTempo = -1;
        this.originalTempo = -1;
        this.startTick = 0;
        this.tick = 0;
        this.inLoop = false;
        this.totalTicks = 0;
        this.eventListeners = {};
        this.sampleRate = 5; // milliseconds
        this.startTime = 0;
        this.buffer = buffer || null;
        this.division;
        this.format;
        this.setIntervalId = null;
        this.tracks = [];
        this.tempo = 120;
        this.startTick = 0;
        this.tick = 0;
        this.inLoop = false;
        this.totalTicks = 0;
        this.eventListeners = {};
        if (typeof (eventHandler) === 'function')
            this.on('midiEvent', eventHandler);
    }
    /**
     * Load an array buffer into the player.
     * @param {array} arrayBuffer - Array buffer of file to be loaded.
     * @return {Player}
     */
    Player.prototype.loadArrayBuffer = function (arrayBuffer) {
        this.buffer = new Uint8Array(arrayBuffer);
        return this.fileLoaded();
    };
    /**
     * Load a data URI into the player.
     * @param {string} dataUri - Data URI to be loaded.
     * @return {Player}
     */
    Player.prototype.loadDataUri = function (dataUri) {
        // convert base64 to raw binary data held in a string.
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].atob(dataUri.split(',')[1]);
        // write the bytes of the string to an ArrayBuffer
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        this.buffer = ia;
        return this.fileLoaded();
    };
    /**
     * Get filesize of loaded file in number of bytes.
     * @return {number} - The filesize.
     */
    Player.prototype.getFilesize = function () {
        return this.buffer ? this.buffer.length : 0;
    };
    /**
     * Parses file for necessary information and does a dry run to calculate total length.
     * Populates this.events & this.totalTicks.
     * @return {Player}
     */
    Player.prototype.fileLoaded = function () {
        if (!this.validate())
            throw 'Invalid MIDI file; should start with MThd';
        return this.getDivision().getFormat().getTracks().dryRun();
    };
    /**
     * Validates file using simple means - first four bytes should == MThd.
     * @return {boolean}
     */
    Player.prototype.validate = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToLetters(this.buffer.slice(0, 4)) === 'MThd';
    };
    /**
     * Gets MIDI file format for loaded file.
     * @return {Player}
     */
    Player.prototype.getFormat = function () {
        /*
        MIDI files come in 3 variations:
        Format 0 which contain a single track
        Format 1 which contain one or more simultaneous tracks
        (ie all tracks are to be played simultaneously).
        Format 2 which contain one or more independant tracks
        (ie each track is to be played independantly of the others).
        return Utils.bytesToNumber(this.buffer.slice(8, 10));
        */
        this.format = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToNumber(this.buffer.slice(8, 10));
        return this;
    };
    /**
     * Parses out tracks, places them in this.tracks and initializes this.pointers
     * @return {Player}
     */
    Player.prototype.getTracks = function () {
        this.tracks = [];
        this.buffer.forEach(function (byte, index) {
            if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToLetters(this.buffer.slice(index, index + 4)) == 'MTrk') {
                var trackLength = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToNumber(this.buffer.slice(index + 4, index + 8));
                var newtrack = new __WEBPACK_IMPORTED_MODULE_1__track__["a" /* Track */](this.tracks.length, this.buffer.slice(index + 8, index + 8 + trackLength));
                //patch, we force a tempo if needed
                newtrack.forcedTempo = this.forcedTempo;
                this.tracks.push(newtrack);
            }
        }, this);
        return this;
    };
    /**
     * Force a tempo for all the played midi
     * @param {number} bpm the forced tempo
     */
    Player.prototype.setForcedTempo = function (bpm) {
        this.tempo = bpm;
        this.forcedTempo = bpm;
        for (var i = 0; i < this.tracks.length; i++) {
            this.tracks[i].forcedTempo = bpm;
        }
    };
    /**
     * Save the original tempo for this song
     * @param {number} bpm the original tempo
     */
    Player.prototype.setOriginalTempo = function (bpm) {
        this.originalTempo = bpm;
        for (var i = 0; i < this.tracks.length; i++) {
            this.tracks[i].originalTempo = bpm;
        }
    };
    /**
     * Enables a track for playing.
     * @param {number} trackNumber - Track number
     * @return {Player}
     */
    Player.prototype.enableTrack = function (trackNumber) {
        this.tracks[trackNumber - 1].enable();
        return this;
    };
    /**
     * Disables a track for playing.
     * @param {number} - Track number
     * @return {Player}
     */
    Player.prototype.disableTrack = function (trackNumber) {
        this.tracks[trackNumber - 1].disable();
        return this;
    };
    /**
     * Gets quarter note division of loaded MIDI file.
     * @return {Player}
     */
    Player.prototype.getDivision = function () {
        this.division = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToNumber(this.buffer.slice(12, 14));
        return this;
    };
    /**
     * The main play loop.
     * @param {boolean} - Indicates whether or not this is being called simply for parsing purposes.  Disregards timing if so.
     * @return {undefined}
     */
    Player.prototype.playLoop = function (dryRun) {
        if (!this.inLoop) {
            this.inLoop = true;
            this.tick = this.getCurrentTick();
            //console.log("tick:"+this.tick);
            this.tracks.forEach(function (track) {
                // Handle next event
                if (!dryRun && this.endOfFile()) {
                    this.triggerPlayerEvent('endOfFile');
                    this.stop();
                }
                else {
                    var event_1 = track.handleEvent(this.tick, dryRun);
                    if (event_1 && !dryRun) {
                        this.emitEvent(event_1);
                    }
                    else if (event_1 && dryRun && dryRun instanceof Function) {
                        dryRun(event_1);
                    }
                }
            }, this);
            if (!dryRun)
                this.triggerPlayerEvent('playing', { tick: this.tick });
            this.inLoop = false;
        }
    };
    /**
     * Setter for startTime.
     * @param {number} - UTC timestamp
     */
    Player.prototype.setStartTime = function (startTime) {
        this.startTime = startTime;
    };
    /**
     * Start playing loaded MIDI file if not already playing.
     * @return {Player}
     */
    Player.prototype.play = function () {
        if (this.isPlaying())
            throw 'Already playing...';
        // Initialize
        if (!this.startTime)
            this.startTime = (new Date()).getTime();
        // Start play loop
        //window.requestAnimationFrame(this.playLoop.bind(this));
        this.setIntervalId = setInterval(this.playLoop.bind(this), this.sampleRate);
        return this;
    };
    /**
     * Pauses playback if playing.
     * @return {Player}
     */
    Player.prototype.pause = function () {
        clearInterval(this.setIntervalId);
        this.setIntervalId = false;
        this.startTick = this.tick;
        this.startTime = 0;
        return this;
    };
    /**
     * @name seek
     * @description seek the player
     * @param {number} tempo the original tempo of this track at the tick specified
     * @param {number} tick the tick to seek
     * @param {trackInfos[]} list of track info to restore the status
     */
    Player.prototype.seek = function (tempo, tick, trackInfos) {
        this.pause();
        var diff = this.forcedTempo - this.originalTempo;
        var newTempo = tempo + diff;
        this.tempo = newTempo;
        this.startTick = tick;
        this.tick = tick;
        for (var i = 0; i < trackInfos.length; i++) {
            diff = this.tracks[i].forcedTempo - this.tracks[i].originalTempo;
            newTempo = tempo + diff;
            this.tracks[i].tempo = newTempo;
            this.tracks[i].pointer = trackInfos[i].pointer;
            this.tracks[i].lastStatus = trackInfos[i].lastStatus;
            this.tracks[i].delta = trackInfos[i].delta;
            this.tracks[i].runningDelta = trackInfos[i].runningDelta;
            this.tracks[i].lastTick = trackInfos[i].lastTick;
        }
    };
    /**
     * @name prepare
     * @description prepare the midi to start playing the first note
     */
    Player.prototype.prepare = function () {
        if (this.startTick == 0) {
            this.playLoop(function (event) {
                if (event.name == "Note on") {
                    this.pause();
                }
            }.bind(this));
        }
    };
    /**
     * Stops playback if playing.
     * @return {Player}
     */
    Player.prototype.stop = function () {
        clearInterval(this.setIntervalId);
        this.setIntervalId = false;
        this.startTick = 0;
        this.startTime = 0;
        this.resetTracks();
        return this;
    };
    /**
     * Checks if player is playing
     * @return {boolean}
     */
    Player.prototype.isPlaying = function () {
        return this.setIntervalId > 0;
    };
    /**
     * Plays the loaded MIDI file without regard for timing and saves events in this.events.  Essentially used as a parser.
     * @return {Player}
     */
    Player.prototype.dryRun = function () {
        // Reset tracks first
        this.resetTracks();
        while (!this.endOfFile())
            this.playLoop(true);
        this.getEvents();
        this.totalTicks = this.getTotalTicks();
        this.startTick = 0;
        this.startTime = 0;
        // Leave tracks in pristine condish
        this.resetTracks();
        //console.log('Song time: ' + this.getSongTime() + ' seconds / ' + this.totalTicks + ' ticks.');
        this.triggerPlayerEvent('fileLoaded', this);
        return this;
    };
    /**
     * Resets play pointers for all tracks.
     * @return {Player}
     */
    Player.prototype.resetTracks = function () {
        this.tracks.forEach(function (track) { return track.reset(); });
        return this;
    };
    /**
     * Gets an array of events grouped by track.
     * @return {array}
     */
    Player.prototype.getEvents = function () {
        return this.tracks.map(function (track) { return track.events; });
    };
    /**
     * Gets total number of ticks in the loaded MIDI file.
     * @return {number}
     */
    Player.prototype.getTotalTicks = function () {
        return Math.max.apply(null, this.tracks.map(function (track) { return track.delta; }));
    };
    /**
     * Gets song duration in seconds.
     * @return {number}
     */
    Player.prototype.getSongTime = function () {
        return this.totalTicks / this.division / this.tempo * 60;
    };
    /**
     * Gets remaining number of seconds in playback.
     * @return {number}
     */
    Player.prototype.getSongTimeRemaining = function () {
        return Math.round((this.totalTicks - this.tick) / this.division / this.tempo * 60);
    };
    /**
     * Gets remaining percent of playback.
     * @return {number}
     */
    Player.prototype.getSongPercentRemaining = function () {
        return Math.round(this.getSongTimeRemaining() / this.getSongTime() * 100);
    };
    /**
     * Number of bytes processed in the loaded MIDI file.
     * @return {number}
     */
    Player.prototype.bytesProcessed = function () {
        // Currently assume header chunk is strictly 14 bytes
        return 14 + this.tracks.length * 8 + this.tracks.reduce(function (a, b) { return { pointer: a.pointer + b.pointer }; }, { pointer: 0 }).pointer;
    };
    /**
     * Determines if the player pointer has reached the end of the loaded MIDI file.
     * @return {boolean}
     */
    Player.prototype.endOfFile = function () {
        return this.bytesProcessed() == this.buffer.length;
    };
    /**
     * Gets the current tick number in playback.
     * @return {number}
     */
    Player.prototype.getCurrentTick = function () {
        return Math.round(((new Date()).getTime() - this.startTime) / 1000 * (this.division * (this.tempo / 60))) + this.startTick;
    };
    /**
     * Sends MIDI event out to listener.
     * @param {object}
     * @return {Player}
     */
    Player.prototype.emitEvent = function (event) {
        // Grab tempo if available.
        if (event.hasOwnProperty('name') && event.name === 'Set Tempo') {
            this.tempo = event.data;
        }
        this.triggerPlayerEvent('midiEvent', event);
        return this;
    };
    /**
     * Subscribes events to listeners
     * @param {string} - Name of event to subscribe to.
     * @param {function} - Callback to fire when event is broadcast.
     * @return {Player}
     */
    Player.prototype.on = function (playerEvent, fn) {
        if (!this.eventListeners.hasOwnProperty(playerEvent))
            this.eventListeners[playerEvent] = [];
        this.eventListeners[playerEvent].push(fn);
        return this;
    };
    /**
     * Broadcasts event to trigger subscribed callbacks.
     * @param {string} - Name of event.
     * @param {object} - Data to be passed to subscriber callback.
     * @return {Player}
     */
    Player.prototype.triggerPlayerEvent = function (playerEvent, data) {
        if (this.eventListeners.hasOwnProperty(playerEvent))
            this.eventListeners[playerEvent].forEach(function (fn) { return fn(data || {}); });
        return this;
    };
    return Player;
}());

//# sourceMappingURL=player.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Track; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(427);


/**
 * Class representing a track.  Contains methods for parsing events and keeping track of pointer.
 */
var Track = /** @class */ (function () {
    function Track(index, data) {
        this.enabled = true;
        this.pointer = 0;
        this.lastTick = 0;
        this.lastStatus = null;
        this.delta = 0;
        this.runningDelta = 0;
        this.events = [];
        this.forcedTempo = -1;
        this.originalTempo = -1;
        this.enabled = true;
        this.pointer = 0;
        this.lastTick = 0;
        this.lastStatus = null;
        this.index = index;
        this.data = data;
        this.delta = 0;
        this.runningDelta = 0;
        this.events = [];
    }
    /**
     * Resets all stateful track informaion used during playback.
     * @return {Track}
     */
    Track.prototype.reset = function () {
        this.enabled = true;
        this.pointer = 0;
        this.lastTick = 0;
        this.lastStatus = null;
        this.delta = 0;
        this.runningDelta = 0;
        return this;
    };
    /**
     * Sets this track to be enabled during playback.
     * @return {Track}
     */
    Track.prototype.enable = function () {
        this.enabled = true;
        return this;
    };
    /**
     * Sets this track to be disabled during playback.
     * @return {Track}
     */
    Track.prototype.disable = function () {
        this.enabled = false;
        return this;
    };
    /**
     * Gets byte located at pointer position.
     * @return {number}
     */
    Track.prototype.getCurrentByte = function () {
        return this.data[this.pointer];
    };
    /**
     * Gets count of delta bytes and current pointer position.
     * @return {number}
     */
    Track.prototype.getDeltaByteCount = function () {
        // Get byte count of delta VLV
        // http://www.ccarh.org/courses/253/handout/vlv/
        // If byte is greater or equal to 80h (128 decimal) then the next byte
        // is also part of the VLV,
        // else byte is the last byte in a VLV.
        var currentByte = this.getCurrentByte();
        var byteCount = 1;
        while (currentByte >= 128) {
            currentByte = this.data[this.pointer + byteCount];
            byteCount++;
        }
        return byteCount;
    };
    /**
     * Get delta value at current pointer position.
     * @return {number}
     */
    Track.prototype.getDelta = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].readVarInt(this.data.slice(this.pointer, this.pointer + this.getDeltaByteCount()));
    };
    /**
     * Handles event within a given track starting at specified index
     * @param {number} currentTick
     * @param {boolean} dryRun - If true events will be parsed and returned regardless of time.
     */
    Track.prototype.handleEvent = function (currentTick, dryRun) {
        dryRun = dryRun || false;
        if (this.pointer < this.data.length && (dryRun || currentTick - this.lastTick >= this.getDelta())) {
            var event_1 = this.parseEvent();
            /*
            if (this.index > 0 && event.name == "Note on") {
                console.log(this.index + " - new event[delta:" + this.getDelta() + ";currentTick:" + currentTick + ";lastTick:" + this.lastTick + "]");
            }
            */
            if (this.enabled)
                return event_1;
            // Recursively call this function for each event ahead that has 0 delta time?
        }
        return null;
    };
    /**
     * Get string data from event.
     * @param {number} eventStartIndex
     * @return {string}
     */
    Track.prototype.getStringData = function (eventStartIndex) {
        //var currentByte = this.pointer;
        var byteCount = 1;
        var length = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].readVarInt(this.data.slice(eventStartIndex + 2, eventStartIndex + 2 + byteCount));
        //var stringLength = length;
        return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToLetters(this.data.slice(eventStartIndex + byteCount + 2, eventStartIndex + byteCount + length + 2));
    };
    /**
     * add a message to the event json
     * @param {any} the eventJson produced
     * @param {number} the number of messages to add
     */
    Track.prototype.addMessage = function (event, start, howmany) {
        for (var i = 0; i < howmany; i++) {
            event.message.push(this.data[start + i]);
        }
    };
    /**
     * Parses event into JSON and advances pointer for the track
     * @return {object}
     */
    Track.prototype.parseEvent = function () {
        var deltaByteCount = this.getDeltaByteCount();
        var eventStartIndex = this.pointer + deltaByteCount;
        var eventJson = {};
        eventJson.track = this.index + 1;
        eventJson.delta = this.getDelta();
        eventJson.message = [];
        this.lastTick = this.lastTick + eventJson.delta;
        this.runningDelta += eventJson.delta;
        eventJson.tick = this.runningDelta;
        //eventJson.raw = event;
        if (this.data[eventStartIndex] == 0xff) {
            // Meta Event
            // If this is a meta event we should emit the data and immediately move to the next event
            // otherwise if we let it run through the next cycle a slight delay will accumulate if multiple tracks
            // are being played simultaneously
            switch (this.data[eventStartIndex + 1]) {
                case 0x00:// Sequence Number
                    eventJson.name = 'Sequence Number';
                    break;
                case 0x01:// Text Event
                    eventJson.name = 'Text Event';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x02:// Copyright Notice
                    eventJson.name = 'Copyright Notice';
                    break;
                case 0x03:// Sequence/Track Name
                    eventJson.name = 'Sequence/Track Name';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x04:// Instrument Name
                    eventJson.name = 'Instrument Name';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x05:// Lyric
                    eventJson.name = 'Lyric';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x06:// Marker
                    eventJson.name = 'Marker';
                    break;
                case 0x07:// Cue Point
                    eventJson.name = 'Cue Point';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x09:// Device Name
                    eventJson.name = 'Device Name';
                    eventJson.string = this.getStringData(eventStartIndex);
                    break;
                case 0x20:// MIDI Channel Prefix
                    eventJson.name = 'MIDI Channel Prefix';
                    break;
                case 0x21:// MIDI Port
                    eventJson.name = 'MIDI Port';
                    eventJson.data = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToNumber([this.data[eventStartIndex + 3]]);
                    break;
                case 0x2F:// End of Track
                    eventJson.name = 'End of Track';
                    break;
                case 0x51:// Set Tempo
                    eventJson.name = 'Set Tempo';
                    eventJson.data = Math.round(60000000 / __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Utils */].bytesToNumber(this.data.slice(eventStartIndex + 3, eventStartIndex + 6)));
                    if (this.forcedTempo < 0) {
                        this.tempo = eventJson.data;
                    }
                    else {
                        var diff = this.forcedTempo - this.originalTempo;
                        var newTempo = eventJson.data + diff;
                        eventJson.data = newTempo;
                        this.tempo = newTempo;
                        /*
                        eventJson.data = this.forcedTempo;
                        this.tempo = this.forcedTempo;
                        */
                    }
                    //console.log("new tempo:"+this.tempo);
                    break;
                case 0x54:// SMTPE Offset
                    eventJson.name = 'SMTPE Offset';
                    break;
                case 0x58:// Time Signature
                    eventJson.name = 'Time Signature';
                    break;
                case 0x59:// Key Signature
                    eventJson.name = 'Key Signature';
                    break;
                case 0x7F:// Sequencer-Specific Meta-event
                    eventJson.name = 'Sequencer-Specific Meta-event';
                    break;
                default:
                    eventJson.name = 'Unknown: ' + this.data[eventStartIndex + 1].toString(16);
                    break;
            }
            var length = this.data[this.pointer + deltaByteCount + 2];
            // Some meta events will have vlv that needs to be handled
            this.addMessage(eventJson, eventStartIndex, 3);
            this.pointer += deltaByteCount + 3 + length;
        }
        else if (this.data[eventStartIndex] == 0xf0) {
            // Sysex
            eventJson.name = 'Sysex';
            var length = this.data[this.pointer + deltaByteCount + 1];
            this.addMessage(eventJson, eventStartIndex, 2 + length);
            this.pointer += deltaByteCount + 2 + length;
        }
        else {
            // Voice event
            if (this.data[eventStartIndex] < 0x80) {
                // Running status
                eventJson.running = true;
                eventJson.noteNumber = this.data[eventStartIndex];
                eventJson.noteName = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].NOTES[this.data[eventStartIndex]];
                eventJson.velocity = this.data[eventStartIndex + 1];
                if (this.lastStatus <= 0x8f) {
                    eventJson.message.push(this.lastStatus);
                    eventJson.name = 'Note off';
                    eventJson.channel = this.lastStatus - 0x80 + 1;
                }
                else if (this.lastStatus <= 0x9f) {
                    eventJson.message.push(this.lastStatus);
                    eventJson.name = 'Note on';
                    eventJson.channel = this.lastStatus - 0x90 + 1;
                }
                this.addMessage(eventJson, eventStartIndex, 2);
                this.pointer += deltaByteCount + 2;
            }
            else {
                this.lastStatus = this.data[eventStartIndex];
                if (this.data[eventStartIndex] <= 0x8f) {
                    // Note off
                    eventJson.name = 'Note off';
                    eventJson.channel = this.lastStatus - 0x80 + 1;
                    eventJson.noteNumber = this.data[eventStartIndex + 1];
                    eventJson.noteName = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].NOTES[this.data[eventStartIndex + 1]];
                    eventJson.velocity = Math.round(this.data[eventStartIndex + 2] / 127 * 100);
                    this.addMessage(eventJson, eventStartIndex, 3);
                    this.pointer += deltaByteCount + 3;
                }
                else if (this.data[eventStartIndex] <= 0x9f) {
                    // Note on
                    eventJson.name = 'Note on';
                    eventJson.channel = this.lastStatus - 0x90 + 1;
                    eventJson.noteNumber = this.data[eventStartIndex + 1];
                    eventJson.noteName = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].NOTES[this.data[eventStartIndex + 1]];
                    eventJson.velocity = Math.round(this.data[eventStartIndex + 2] / 127 * 100);
                    this.addMessage(eventJson, eventStartIndex, 3);
                    this.pointer += deltaByteCount + 3;
                }
                else if (this.data[eventStartIndex] <= 0xaf) {
                    // Polyphonic Key Pressure
                    eventJson.name = 'Polyphonic Key Pressure';
                    eventJson.channel = this.lastStatus - 0xa0 + 1;
                    eventJson.note = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].NOTES[this.data[eventStartIndex + 1]];
                    eventJson.pressure = event[2];
                    this.addMessage(eventJson, eventStartIndex, 3);
                    this.pointer += deltaByteCount + 3;
                }
                else if (this.data[eventStartIndex] <= 0xbf) {
                    // Controller Change
                    eventJson.name = 'Controller Change';
                    eventJson.channel = this.lastStatus - 0xb0 + 1;
                    eventJson.number = this.data[eventStartIndex + 1];
                    eventJson.value = this.data[eventStartIndex + 2];
                    this.addMessage(eventJson, eventStartIndex, 3);
                    this.pointer += deltaByteCount + 3;
                }
                else if (this.data[eventStartIndex] <= 0xcf) {
                    // Program Change
                    eventJson.name = 'Program Change';
                    eventJson.channel = this.lastStatus - 0xc0 + 1;
                    this.addMessage(eventJson, eventStartIndex, 2);
                    this.pointer += deltaByteCount + 2;
                }
                else if (this.data[eventStartIndex] <= 0xdf) {
                    // Channel Key Pressure
                    eventJson.name = 'Channel Key Pressure';
                    eventJson.channel = this.lastStatus - 0xd0 + 1;
                    this.addMessage(eventJson, eventStartIndex, 2);
                    this.pointer += deltaByteCount + 2;
                }
                else if (this.data[eventStartIndex] <= 0xef) {
                    // Pitch Bend
                    eventJson.name = 'Pitch Bend';
                    eventJson.channel = this.lastStatus - 0xe0 + 1;
                    this.addMessage(eventJson, eventStartIndex, 2);
                    this.pointer += deltaByteCount + 3;
                }
                else {
                    eventJson.name = 'Unknown.  Pointer: ' + this.pointer.toString() + ' ' + eventStartIndex.toString() + ' ' + this.data.length;
                }
            }
        }
        this.delta += eventJson.delta;
        this.events.push(eventJson);
        return eventJson;
    };
    /**
     * Returns true if pointer has reached the end of the track.
     * @param {boolean}
     */
    Track.prototype.endOfTrack = function () {
        if (this.data[this.pointer + 1] == 0xff && this.data[this.pointer + 2] == 0x2f && this.data[this.pointer + 3] == 0x00) {
            return true;
        }
        return false;
    };
    return Track;
}());

//# sourceMappingURL=track.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
/**
 * Constants used in player.
 */
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.NOTES = [];
    return Constants;
}());

(function () {
    // Builds notes object for reference against binary values.
    var allNotes = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];
    var counter = 0;
    var _loop_1 = function (i) {
        allNotes.forEach(function (noteGroup) {
            noteGroup.forEach(function (note) { return Constants.NOTES[counter] = note + i; });
            counter++;
        });
    };
    // All available octaves.
    for (var i = -1; i <= 9; i++) {
        _loop_1(i);
    }
})();
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DAO; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DAO = /** @class */ (function () {
    function DAO(storage) {
        this.storage = storage;
        /** cached compositions */
        this.compositions = null;
        /** recent compositions */
        this.recents = null;
        /** cached settings */
        this.settingsCache = null;
        /** settings observable */
        this.settingsSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]();
        this.getSettings();
    }
    /**
     * @name observeSettings
     * @description observer pattern for the settings object
     * @return {Subject<Settings>} the observable RxJs
     */
    DAO.prototype.observeSettings = function () {
        return this.settingsSubject;
    };
    /**
     * @name getSettings
     * @description return the settings of the application
     * @return {Promise<Settings>} the promise to return the settings
     */
    DAO.prototype.getSettings = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.settingsCache == null) {
                _this.storage.ready().then(function () {
                    _this.storage.get('settings').then(function (settings) {
                        if (settings == null) {
                            settings = new __WEBPACK_IMPORTED_MODULE_2__settings__["c" /* Settings */]();
                        }
                        if (!settings.filterSettings) {
                            settings.filterSettings = new __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* FilterSettings */]();
                        }
                        if (!settings.playerSettings) {
                            settings.playerSettings = new __WEBPACK_IMPORTED_MODULE_2__settings__["b" /* PlayerSettings */]();
                        }
                        _this.settingsCache = settings;
                        resolve(settings);
                    });
                });
            }
            else {
                resolve(_this.settingsCache);
            }
        });
    };
    /**
     * @name setSettings
     * @description set the settings for the application
     * @return {Promise<void>} the promise to set the settings
     */
    DAO.prototype.setSettings = function (settings) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.ready().then(function () {
                _this.storage.set('settings', settings).then(function (result) {
                    _this.settingsCache = settings;
                    _this.settingsSubject.next(_this.settingsCache);
                    resolve();
                });
            });
        });
    };
    /**
     * @name getRecents
     * @description return all the recents compositions
     * @return {Promise<Composition[]>} the promise to return all the recent compositions saved
     */
    DAO.prototype.getRecents = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.recents == null) {
                _this.storage.ready().then(function () {
                    _this.storage.get('recents').then(function (compositions) {
                        if (compositions == null) {
                            compositions = [];
                        }
                        _this.recents = compositions;
                        resolve(compositions);
                    });
                });
            }
            else {
                resolve(_this.recents);
            }
        });
    };
    /**
     * @name setRecents
     * @description set the recent compositions to the db (this method doesn't add, only set)
     * @param {Composition[]} comps the compositions to set
     * @return the promise to set the recent compositions
     */
    DAO.prototype.setRecents = function (comps) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.ready().then(function () {
                _this.storage.set('recents', comps).then(function (result) {
                    _this.recents = comps;
                    resolve();
                });
            });
        });
    };
    /**
     * @name addRecent
     * @description add a recent composition to the list of recent compositions
     * @param {Composition} comp the composition to add to recent compositions
     * @return {Promise<void>} the promise to add a recent composition to the list of compositions
     */
    DAO.prototype.addRecent = function (comp) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getRecents().then(function (comps) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i].id == comp.id) {
                        comps.splice(i, 1);
                        i--;
                    }
                }
                if (comps.length > 10) {
                    comps.splice(comps.length - 1, 1);
                }
                comps.splice(0, 0, comp);
                _this.setRecents(comps).then(function () {
                    resolve();
                });
            });
        });
    };
    /**
     * @name removeRecent
     * @description remove a certain recent composition from the database
     * @param {string} the id of the recent composition to be removed
     * @return the promise to remove the recent composition
     */
    DAO.prototype.removeRecent = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getRecents().then(function (comps) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i].id == id) {
                        comps.splice(i, 1);
                        break;
                    }
                }
                _this.setRecents(comps).then(function () {
                    resolve();
                });
            });
        });
    };
    /**
     * @name getCompositions
     * @description return all the stored compositions
     * @return {Promise<Composition[]>} the promise to return all the compositions saved
     */
    DAO.prototype.getCompositions = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.compositions == null) {
                _this.storage.ready().then(function () {
                    _this.storage.get('compositions').then(function (compositions) {
                        if (compositions == null) {
                            compositions = [];
                        }
                        _this.compositions = compositions;
                        resolve(compositions);
                    });
                });
            }
            else {
                resolve(_this.compositions);
            }
        });
    };
    /**
     * @name saveComposition
     * @description save a new composition to the storage
     * @param {Composition} composition the composition to save
     * @return {Promise<void>} the promise to save the composition
     */
    DAO.prototype.saveComposition = function (composition) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getCompositions().then(function (comps) {
                comps.push(composition);
                _this.setCompositions(comps).then(function () {
                    resolve();
                });
            });
        });
    };
    /**
     * @name updateComposition
     * @description update a certain composition with new info
     * @param {Composition} composition the composition to update
     * @return {Promise<void>} the promise to save the composition
     */
    DAO.prototype.updateComposition = function (composition) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getCompositions().then(function (comps) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i].id == composition.id) {
                        comps[i] = composition;
                        break;
                    }
                }
                _this.setCompositions(comps).then(function () {
                    resolve();
                });
            });
        });
    };
    /**
     * @name setCompositions
     * @description set the compositions to the db (this method doesn't add, only set)
     * @param {Composition[]} comps the compositions to set
     * @return the promise to set the compositions
     */
    DAO.prototype.setCompositions = function (comps) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.ready().then(function () {
                _this.storage.set('compositions', comps).then(function (result) {
                    _this.compositions = comps;
                    resolve();
                });
            });
        });
    };
    /**
     * @name removeComposition
     * @description remove a certain composition from the database
     * @param {string} the id of the composition to be removed
     * @return the promise to remove the composition
     */
    DAO.prototype.removeComposition = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getCompositions().then(function (comps) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i].id == id) {
                        comps.splice(i, 1);
                        break;
                    }
                }
                _this.setCompositions(comps).then(function () {
                    resolve();
                });
            });
        });
    };
    DAO = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], DAO);
    return DAO;
}());

//# sourceMappingURL=dao.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicXMLPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__midiplayer__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mp3player__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__ = __webpack_require__(720);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * @class
 * @name MusicXMLPlayer
 * @description ABC player wich is able to load musicxml/abc and play it
 */
var MusicXMLPlayer = /** @class */ (function () {
    function MusicXMLPlayer(service, platform, loadingCtrl, translate) {
        this.service = service;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        /** the midi player */
        this.midiPlayer = null;
        /** the mp3 player */
        this.mp3Player = null;
        /** the musicxml to svg converter */
        this.converter = null;
        /** the composition to play */
        this.composition = null;
        /** the listener to notify */
        this.listener = null;
        /** the current settings */
        this.settings = null;
        /** the current midi info */
        this.midiInfo = null;
        /** current status */
        this.flagStatus = MusicXMLPlayer_1.STATUS_STOPPED;
        this.currentBarline = 0;
        this.currentNote = 0;
        this.$wijzer = null;
        this.midiPlayer = new __WEBPACK_IMPORTED_MODULE_4__midiplayer__["a" /* MidiPlayer */](service, platform);
        this.mp3Player = new __WEBPACK_IMPORTED_MODULE_5__mp3player__["a" /* MP3Player */](service, platform);
        this.midiPlayer.setListener(this);
    }
    MusicXMLPlayer_1 = MusicXMLPlayer;
    /**
     * @name getMeterSignatureNumerator
     * @description return the meter signature numerator of the score
     * @return {number} the numerator (num/dem)
     */
    MusicXMLPlayer.prototype.getMeterSignatureNumerator = function () {
        return this.converter.numerator;
    };
    /**
     * @name updateSettings
     * @description  Updating the settings that affect to the player
     * @param {Settings} settings the new settings
     */
    MusicXMLPlayer.prototype.updateSettings = function (settings) {
        this.settings = settings;
        //checking if we have changed the play soloist paremeter
        this.muteSoloist(!this.settings.playerSettings.playSoloist);
        //checking if we have changed the play back paremeter
        this.muteBack(!this.settings.playerSettings.playBack);
        //setting metronome
        this.midiPlayer.setMetronome(this.settings.playerSettings.metronome);
        this.midiPlayer.setHighQuality(settings.playerSettings.highQuality, this.composition);
    };
    /**
     * @name prepare
     * @description prepare the midi player to start playing
     */
    MusicXMLPlayer.prototype.prepare = function () {
        this.midiPlayer.prepare();
    };
    /**
     * @name muteSoloist
     * @description mute or unmute the soloist track
     * @param {boolean} mute if we want to mute or unmute
     */
    MusicXMLPlayer.prototype.muteSoloist = function (mute) {
        if (mute) {
            this.midiPlayer.muteTrack(this.composition.frontInstrument.track);
            if (this.composition.frontInstrument.help >= 0) {
                this.midiPlayer.muteTrack(this.composition.frontInstrument.help);
            }
        }
        else {
            this.midiPlayer.unmuteTrack(this.composition.frontInstrument.track);
            if (this.composition.frontInstrument.help >= 0) {
                this.midiPlayer.unmuteTrack(this.composition.frontInstrument.help);
            }
        }
    };
    /**
     * @name isMP3BackingTrack
     * @description check if the composition has an mp3 backing track
     * @return {boolean} true if the composition backing track is mp3 based
     */
    MusicXMLPlayer.prototype.isMP3BackingTrack = function () {
        return this.composition.mp3URL && this.composition.mp3URL.length > 0;
    };
    /**
     * @name muteBack
     * @description mute or unmute the backing track
     * @param {boolean} mute if we want to mute or unmute
     */
    MusicXMLPlayer.prototype.muteBack = function (mute) {
        if (mute) {
            if (this.isMP3BackingTrack()) {
                this.mp3Player.mute(mute);
            }
            else {
                for (var i = 0; i < this.composition.backInstruments.length; i++) {
                    this.midiPlayer.muteTrack(this.composition.backInstruments[i].track);
                }
            }
        }
        else {
            if (this.isMP3BackingTrack()) {
                this.mp3Player.mute(mute);
            }
            else {
                for (var i = 0; i < this.composition.backInstruments.length; i++) {
                    this.midiPlayer.unmuteTrack(this.composition.backInstruments[i].track);
                }
            }
        }
    };
    /**
     * @name getTempo
     * @description return the tempo of the midi loaded
     * @return {number} the tempo (bpm)
     */
    MusicXMLPlayer.prototype.getTempo = function () {
        return this.midiPlayer.getTempo();
    };
    /**
      * @name setTempo
      * @description set the tempo of the midi loaded
      * @param {number} bpm beats per minute
      */
    MusicXMLPlayer.prototype.setTempo = function (bpm) {
        this.midiPlayer.setTempo(bpm);
    };
    /**
     * @name init
     * @description initialize the player
     */
    MusicXMLPlayer.prototype.init = function (composition, listener, settings) {
        var _this = this;
        this.composition = composition;
        this.listener = listener;
        this.updateSettings(settings);
        return new Promise(function (resolve) {
            //we load the front sheet and generate the SVG code
            _this.loadAndRenderScore(_this.composition).then(function (frontsvg) {
                //we got the svg
                if (_this.listener != null) {
                    _this.listener.svgLoaded(frontsvg);
                }
                //loading mp3, midi data, soundfonts and tempo
                Promise.all([_this.loadMP3Data(_this.composition),
                    _this.loadMidiData(_this.composition)]).then(function () {
                    //we need to load midi before creating a map
                    Promise.all([
                        _this.midiPlayer.loadSoundFonts(_this.composition),
                        _this.createMap()
                    ]).then(function () {
                        if (_this.listener != null) {
                            _this.listener.playerInitialized();
                        }
                    });
                });
            });
        });
    };
    /**
     * @name loadMP3Data
     * @description load the mp3 data backing track
     * @param {Composition} composition the composition to load
     */
    MusicXMLPlayer.prototype.loadMP3Data = function (composition) {
        if (this.isMP3BackingTrack()) {
            var url = __WEBPACK_IMPORTED_MODULE_3__player_service__["a" /* PlayerService */].dataUrl1 + '/[' + composition.id + ']-' + composition.mp3URL;
            /*
            return new Promise<void>((resolve) => {
                this.service.getMP3(url).then((data: string) => {
                    this.mp3Player.reset();
                    return this.mp3Player.init('data:audio/mp3;base64,' + data).then(() => {
                        resolve();
                    });
                });
            });*/
            return this.mp3Player.init(url);
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * @name crateMap
     * @description internal function to load the midi and create a map of the music
     * @return {Promise<void>} the promise to create a map
     */
    MusicXMLPlayer.prototype.createMap = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.midiPlayer.createMap(_this.composition.frontInstrument.track).then(function (midiInfo) {
                _this.midiInfo = midiInfo;
                resolve();
            });
        });
    };
    /**
     * @name svgPoint
     * @description translate page to SVG coordinates
     * @param {any} svgGraphicElement the g element inside the SVG to transform the coordinates
     * @param {number} x the x position relative to the svg
     * @param {number} y the y position relative to the svg
     */
    MusicXMLPlayer.prototype.svgPoint = function (svgGraphicElement, x, y) {
        /*
        if (!svgGraphicElement.parent()[0].createSVGPoint) {
            console.log("why");
        }
        */
        var pt = svgGraphicElement.parent()[0].createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(svgGraphicElement[0].getScreenCTM().inverse());
    };
    /**
     * @name preloadMP3
     * @description preload the mp3 backing track
     * @return {Promise<void>} the promise to preload the mp3
     */
    MusicXMLPlayer.prototype.preloadMP3 = function () {
        var _this = this;
        if (this.isMP3BackingTrack()) {
            return new Promise(function (resolve) {
                var url = __WEBPACK_IMPORTED_MODULE_3__player_service__["a" /* PlayerService */].dataUrl1 + '/[' + _this.composition.id + ']-' + _this.composition.mp3URL;
                _this.service.getMP3(url).then(function (data) {
                    _this.mp3Player.reset();
                    _this.mp3Player.init('data:audio/mp3;base64,' + data).then(function () {
                        resolve();
                    });
                });
            });
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * @name select
     * @description select a certain note or rest
     * @param {any} svgGraphicElement the g element inside the SVG to transform the coordinates
     * @param {number} index the svg element index where is contained the note
     * @param {number} x the x position relative to the svg
     * @param {number} y the y position relative to the svg
     * @return {boolean} true if it was seeked, false if it was not seeked because the mp3 backing track need to be buffered
     */
    MusicXMLPlayer.prototype.select = function (svgGraphicElement, index, x, y) {
        //first we need to transform the x,y page position to an SVG scaled position
        var point = this.svgPoint(svgGraphicElement, x, y);
        x = point.x;
        y = point.y;
        //console.log("x:" + x + ",y:" + y);
        //we try to select the figure selected        
        var iFigure = 0;
        var iFigureNote = -1;
        var selectedFigure = null;
        for (; iFigure < this.converter.figureBoxes.length; iFigure++) {
            var figure = this.converter.figureBoxes[iFigure];
            if (figure.type == 1 && !figure.ligato) {
                iFigureNote++;
            }
            if (figure.barline > index) {
                //we haven't found the figure
                break;
            }
            if (figure.barline == index && x > figure.x && x < figure.x + figure.w) {
                if (y > figure.y && y < figure.y + figure.h) {
                    selectedFigure = figure;
                    break;
                }
            }
        }
        if (selectedFigure && selectedFigure != null) {
            //we can only select notes, not rest
            while (selectedFigure && (selectedFigure.type != 1 || selectedFigure.ligato) &&
                this.converter.figureBoxes.length > iFigure) {
                iFigure++;
                selectedFigure = this.converter.figureBoxes[iFigure];
                if (selectedFigure && selectedFigure.type == 1 && !selectedFigure.ligato) {
                    iFigureNote++;
                }
            }
            if (selectedFigure && selectedFigure.type == 1 && !selectedFigure.ligato) {
                //lets put the cursor over the figure
                this.currentBarline = index;
                if (this.$wijzer != null) {
                    this.$wijzer.remove();
                }
                this.$wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
                this.$wijzer.attr({ "fill": "#387ef5", "fill-opacity": (this.settings.playerSettings.cursor ? "0.5" : "0") });
                $("svg > g").eq(this.currentBarline).prepend(this.$wijzer);
                //this.scrollToCursor(selectedFigure);
                //we position correctly the focus rectangle
                this.$wijzer.attr({
                    "x": "" + (selectedFigure.x),
                    "y": "" + (selectedFigure.y),
                    "width": "" + selectedFigure.w,
                    "height": "" + selectedFigure.h
                });
                //oh, wait, we need to search the figure in the timeline map of figures
                var indexTimeLineOnlyNotes = -1;
                var indexTimeLine = 0;
                for (; indexTimeLine < this.converter.timeLineMap.length; indexTimeLine++) {
                    var iFigureTimeLine = this.converter.timeLineMap[indexTimeLine];
                    var figureTimeLine = this.converter.figureBoxes[iFigureTimeLine];
                    if (figureTimeLine.type == __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["b" /* FigureBox */].TYPE_NOTE && !figureTimeLine.ligato) {
                        indexTimeLineOnlyNotes++;
                    }
                    if (iFigureTimeLine == iFigure) {
                        break;
                    }
                }
                var midiinfo = this.midiInfo.notes[indexTimeLineOnlyNotes];
                this.midiPlayer.seek(midiinfo.tempo, midiinfo.tick, midiinfo.tracks);
                if (this.isMP3BackingTrack()) {
                    var ms = this.midiPlayer.getCurrentTime();
                    var resp = this.mp3Player.seek(ms);
                    if (!resp) {
                        //oh oh, not enough buffered info
                        return false;
                    }
                }
                //finally seek the midi player
                this.currentNote = indexTimeLine;
                this.currentBarline = index;
                return true;
            }
        }
        return true;
    };
    /**
     * @name loadAndRenderScore
     * @description load and render the front sheet
     * @param {Composition} comp the composition info to render
     * @return <Promise<string>> a promise to be returned a svg
     */
    MusicXMLPlayer.prototype.loadAndRenderScore = function (comp) {
        var _this = this;
        if (this.composition.scoreXMLData == null) {
            var obs_1 = this.service.getScore(comp);
            var self_1 = this;
            return new Promise(function (resolve) {
                obs_1.then(function (data) {
                    _this.composition.scoreXMLData = data;
                    var svg = self_1.renderScore();
                    resolve(svg);
                });
            });
        }
        else {
            var svg = this.renderScore();
            return Promise.resolve(svg);
        }
    };
    /**
     * @name renderScore
     * @description render the musicxml score into svg
     * @return {string} the svg generated
     */
    MusicXMLPlayer.prototype.renderScore = function () {
        // options by default
        var coptions = new __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["a" /* ConversionOptions */]();
        if (document.documentElement.clientWidth > 1024) {
            coptions.p = 'f';
        }
        this.converter = new __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["c" /* MusicXML2SVG */]($.parseXML(this.composition.scoreXMLData), coptions);
        var svg = this.converter.renderScore(document.documentElement.clientWidth - 40);
        return svg;
    };
    /**
     * @name loadMidiData
     * @description load the backingtrack midi file
     * @return <Promise<void>> the promise of the midi data
     */
    MusicXMLPlayer.prototype.loadMidiData = function (comp) {
        var _this = this;
        var obs = this.service.getMidi(comp);
        return new Promise(function (resolve) {
            obs.then(function (data) {
                _this.midiPlayer.loadMidiData(data);
                resolve();
            });
        });
    };
    /**
     * @name play
     * @description play the music, start the show!
     */
    MusicXMLPlayer.prototype.play = function () {
        this.flagStatus = MusicXMLPlayer_1.STATUS_RUNNING;
        this.midiPlayer.resume();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.play();
        }
    };
    /**
     * @name playMetronome
     * @description play the metronome
     * @param {boolean} high indicates if we want to hear a high tick metronome pulse or low
     */
    MusicXMLPlayer.prototype.playMetronome = function (high) {
        this.midiPlayer.playMetronome(high);
    };
    /**
     * @name pause
     * @description pause the music
     */
    MusicXMLPlayer.prototype.pause = function () {
        this.flagStatus = MusicXMLPlayer_1.STATUS_PAUSED;
        this.midiPlayer.pause();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.pause();
        }
    };
    /**
     * @name stop
     * @description stop the music
     */
    MusicXMLPlayer.prototype.stop = function (dontScroll) {
        this.flagStatus = MusicXMLPlayer_1.STATUS_STOPPED;
        this.currentBarline = 0;
        this.currentNote = 0;
        if (this.$wijzer != null) {
            this.$wijzer.remove();
            this.$wijzer = null;
        }
        this.midiPlayer.stop();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.stop();
        }
        if (!dontScroll) {
            $('.scroll-content').animate({ scrollTop: 0 }, 1000);
        }
    };
    /**
     * @name resume
     * @description resume the music
     */
    MusicXMLPlayer.prototype.resume = function () {
        this.flagStatus = MusicXMLPlayer_1.STATUS_RUNNING;
        this.midiPlayer.resume();
        if (this.isMP3BackingTrack()) {
            this.mp3Player.resume();
        }
    };
    /**
     * @name endOfSong
     * @description the player notify that the midi has ended
     */
    MusicXMLPlayer.prototype.endOfSong = function () {
        if (this.listener != null) {
            this.listener.endOfSong();
        }
    };
    /**
     * @name endOfPartSong
     * @description the player notify that the song start now a new part
     */
    MusicXMLPlayer.prototype.endOfPartSong = function () {
        this.pause();
        //oh, wait, we need to search the figure in the timeline map of figures
        var indexTimeLineOnlyNotes = -1;
        var indexTimeLine = 0;
        for (; indexTimeLine < this.converter.timeLineMap.length; indexTimeLine++) {
            var iFigureTimeLine = this.converter.timeLineMap[indexTimeLine];
            var figureTimeLine = this.converter.figureBoxes[iFigureTimeLine];
            if (figureTimeLine.type == __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["b" /* FigureBox */].TYPE_NOTE && !figureTimeLine.ligato) {
                indexTimeLineOnlyNotes++;
            }
            if (iFigureTimeLine == this.currentNote) {
                break;
            }
        }
        var midiinfo = this.midiInfo.notes[indexTimeLineOnlyNotes];
        this.midiPlayer.seek(midiinfo.tempo, midiinfo.tick, midiinfo.tracks);
        if (this.isMP3BackingTrack()) {
            var ms = this.midiPlayer.getCurrentTime();
            this.mp3Player.seek(ms);
        }
        if (this.listener != null) {
            this.listener.endOfPartSong();
        }
    };
    /**
     * @override
     */
    MusicXMLPlayer.prototype.midiUpdate = function (event) {
        if (event.name == 'Note on') {
            if (event.track == this.composition.frontInstrument.track) {
                if (event.velocity <= 0) {
                    return;
                }
                //first we get the figurebox to be highlighted
                var indexBox = this.converter.timeLineMap[this.currentNote];
                var figure_1 = this.converter.figureBoxes[indexBox];
                if (typeof figure_1 === "undefined") {
                    return;
                }
                while (figure_1.type != __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["b" /* FigureBox */].TYPE_NOTE || figure_1.ligato) {
                    this.currentNote++;
                    indexBox = this.converter.timeLineMap[this.currentNote];
                    figure_1 = this.converter.figureBoxes[indexBox];
                    if (typeof figure_1 === "undefined") {
                        return;
                    }
                }
                var self = this;
                var delay_func = function (varFigure) {
                    //next we create the focus rectangle 
                    if (self.$wijzer == null || self.currentBarline != varFigure.barline) {
                        self.currentBarline = figure_1.barline;
                        if (self.$wijzer != null) {
                            self.$wijzer.remove();
                        }
                        self.$wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
                        self.$wijzer.attr({ "fill": "#387ef5", "fill-opacity": (self.settings.playerSettings.cursor ? "0.5" : "0") });
                        $("svg > g").eq(self.currentBarline).prepend(self.$wijzer);
                        self.scrollToCursor(varFigure);
                    }
                    //we position correctly the focus rectangle
                    self.$wijzer.attr({
                        "x": "" + (varFigure.x),
                        "y": "" + (varFigure.y),
                        "width": "" + varFigure.w,
                        "height": "" + varFigure.h
                    });
                    //lets prepare next cursor
                    var nextFigure = self.getNextFigure(self.currentNote, 1);
                    if (nextFigure != null && self.currentBarline != nextFigure.barline) {
                        self.scrollToCursor(figure_1, nextFigure);
                    }
                };
                var delay = this.settings.playerSettings.bluetoothDelay;
                if (delay > 0) {
                    setTimeout(function () {
                        if (self.flagStatus != MusicXMLPlayer_1.STATUS_STOPPED) {
                            delay_func(figure_1);
                        }
                    }, delay);
                }
                else {
                    delay_func(figure_1);
                }
                this.currentNote++;
                if (this.converter.startParts.length > 1 && this.converter.timeLineMap.length > this.currentNote) {
                    //ensuring that the next figure is a note figure
                    var tmpCurrentNote = this.currentNote;
                    var figure_2 = this.converter.figureBoxes[tmpCurrentNote];
                    while (figure_2 != null && (figure_2.type != __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["b" /* FigureBox */].TYPE_NOTE || figure_2.ligato)) {
                        tmpCurrentNote++;
                        if (this.converter.timeLineMap.length > this.currentNote) {
                            indexBox = this.converter.timeLineMap[tmpCurrentNote];
                            figure_2 = this.converter.figureBoxes[indexBox];
                        }
                        else {
                            figure_2 = null;
                        }
                    }
                    //checking if the start part of the next note figure match with any startpart
                    if (figure_2 != null) {
                        for (var i = 0; i < this.converter.startParts.length; i++) {
                            if (this.converter.startParts[i] == tmpCurrentNote) {
                                //a new part is comingç
                                this.currentNote = tmpCurrentNote;
                                this.endOfPartSong();
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @name scrollToCursor
     * @description scroll the score to the cursor position (or the future cursor defined by the nextFigure)
     * @param {FigureBox} currentFigure the current figure which have the cursor
     * @param {FigureBox} nextFigure the next figure which have the cursor
     */
    MusicXMLPlayer.prototype.scrollToCursor = function (currentFigure, nextFigure) {
        var y = 0;
        var svgs = $("svg > g");
        var toFigure = currentFigure;
        if (nextFigure) {
            toFigure = nextFigure;
        }
        //FIXME, calculate the absolute position not working, why!?
        for (var isvg = 0; isvg < toFigure.barline; isvg++) {
            var svg = svgs[isvg];
            if (svg) {
                y = y + svg.getBoundingClientRect().height;
            }
            else {
                return;
            }
        }
        var svgHeight = svgs[currentFigure.barline].getBoundingClientRect().height;
        if (this.settings.playerSettings.cursorAnimation) {
            $('.scroll-content').animate({ scrollTop: y - (nextFigure ? svgHeight : 0) - 50 }, 200);
        }
        else {
            $('.scroll-content').scrollTop(y - (nextFigure ? svgHeight : 0) - 50);
        }
    };
    /**
     * @name getNextFigure
     * @description return the next figure to play
     * @param {number} indexBox the indexBox to start searching
     * @param {number} count the count to define 'next' figure
     * @return {FigureBox} the figurebox found or null
     */
    MusicXMLPlayer.prototype.getNextFigure = function (currentNote, count) {
        var icount = 0;
        currentNote++;
        while (icount < count) {
            if (currentNote >= this.converter.timeLineMap.length) {
                return null;
            }
            var indexBox = this.converter.timeLineMap[currentNote];
            var nextFigure = this.converter.figureBoxes[indexBox];
            if (nextFigure.type == __WEBPACK_IMPORTED_MODULE_6__musicxml2svg__["b" /* FigureBox */].TYPE_NOTE && !nextFigure.ligato) {
                icount++;
            }
            currentNote++;
        }
        if (count == icount) {
            var indexBox = this.converter.timeLineMap[currentNote];
            var nextFigure = this.converter.figureBoxes[indexBox];
            return nextFigure;
        }
        else {
            return null;
        }
    };
    MusicXMLPlayer.STATUS_STOPPED = 0;
    MusicXMLPlayer.STATUS_PAUSED = 1;
    MusicXMLPlayer.STATUS_RUNNING = 2;
    MusicXMLPlayer = MusicXMLPlayer_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["c" /* TranslateService */]])
    ], MusicXMLPlayer);
    return MusicXMLPlayer;
    var MusicXMLPlayer_1;
}());

//# sourceMappingURL=musicxmlplayer.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MusicXML2SVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversionOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FigureBox; });
/**
 * @class
 * @name MusicXML2SVG
 * @description MusicXML converter to SVG using libraries:
 * - xml2abc.js from Wim Vree (http://wim.vree.org/js/)
 * - abc2svg.js from Jef Moine (http://moinejf.free.fr/js/)
 * and some minor stuff from my side to join both
 */
var MusicXML2SVG = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} musicXML the musicxml string to be rendered
     * @param {RenderOptions} the options required by xml2abc library
     */
    function MusicXML2SVG(musicXML, options) {
        this.musicXML = musicXML;
        this.options = options;
        /*
        private static ABC2SVG_TYPE_TEMPO: number = 14;
        private static ABC2SVG_TYPE_BASE_LEN: number = 1536;
        */
        /**
         * The generated svg
         */
        this.svg = '';
        /**
         * Number of barlines at the score rendered
         */
        this.barlines = 0;
        /**
         * List of error messages generated
         */
        this.errorMessages = [];
        /**
         * List of bounding boxes of each figure at the svg
         */
        this.figureBoxes = [];
        /**
         * Timeline Map which is able to say what figureboxes must be played in sequence
         */
        this.timeLineMap = [];
        /**
         * List of index where a new part of the composition starts.
         * All compositions has at least one part starting at 0 position
         */
        this.startParts = [0];
        /**
         * the abc2svg library with user config
         */
        this.abc2svg = null;
        /** list of ligatos recovered, just for internal adjustements */
        this.ligatos = [];
        /** list of abc graces found */
        this.graces = [];
        this.indexGrace = 0;
        //CAUTION
        //there is a bug or something when reporting the figures by the abc2svg library
        //sometimes it reports an inexistent note before the first one, which is overlapping the cleff
        //the only way to detect it is that it is overlapping the cleff
        this.clefDetected = false;
    }
    /**
     * @name reset
     * @description Reset all the parameters to start a new conversion and render
     */
    MusicXML2SVG.prototype.reset = function () {
        this.svg = "";
        this.barlines = 0;
        this.errorMessages = [];
        this.figureBoxes = [];
        this.ligatos = [];
        this.graces = [];
        this.indexGrace = 0;
    };
    /**
     * @name analyseGraces
     * @description analyse the graces obtained by the abc code
     */
    MusicXML2SVG.prototype.analyseGraces = function (abcCode) {
        var index = -1;
        index = abcCode.indexOf("{");
        while (index >= 0) {
            var indexTo = abcCode.indexOf("}", index + 1);
            var str = abcCode.substr(index + 1, indexTo - index - 1);
            this.graces.push(str);
            index = abcCode.indexOf("{", indexTo);
        }
    };
    /**
     * @name renderScore
     * @description render a musicxml score using SVG. This only generates the SVG. You must insert it into the DOM to show it.
     * @param {number} width width of the svg generated
     * @return {string} the svg created
     */
    MusicXML2SVG.prototype.renderScore = function (width) {
        this.reset();
        var inforesult = vertaal(this.musicXML, this.options);
        //console.log(inforesult[0]);
        this.analyseGraces(inforesult[0]);
        var self = this;
        /*See: http://moinejf.free.fr/js/interface-1.xhtml*/
        var user = {
            'img_out': function (str) {
                self.imgOut(str);
            },
            'errmsg': function (txt, line, col) {
                self.errMsg(txt, line, col);
            },
            'read_file': this.readFile,
            'anno_start': function (type, startOffset, stopOffset, x, y, w, h) {
                self.annoStart(type, startOffset, stopOffset, x, y, w, h);
            },
            'get_abcmodel': function (tsFirst, voice_tb, music_types, info) {
                self.timeLine(tsFirst, voice_tb, music_types, info);
            },
            'imagesize': 'width="' + width + '"',
            'page_format': true,
        };
        //inforesult[0] = inforesult[0].replace(new RegExp("0.83", 'g'), "2.00");
        //console.log(inforesult[0]);
        this.abc2svg = new Abc(user);
        this.abc2svg.tosvg('abc2svg', inforesult[0]);
        return this.svg;
    };
    /**
     * @name imgOut
     * @description Callback function which called when a new part of the SVG image has been generated.
     * @param {string} str the string svg rendered
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    MusicXML2SVG.prototype.imgOut = function (str) {
        /*
        console.log(str);
        */
        if (str.indexOf('<svg') != -1) {
            this.barlines++;
            /*
            str = str.replace(/width="(\d*)px"\s*height="(\d*)px"/, 'width="$1px" height="$2px" viewbox="0 0 $1 $2"');
            bxs = self.keySort(bxs), bys = self.keySort(bys);
            if (bxs.length > 1 &&   // the first barline is at bxs[1] because bxs[0] == left side staff
                bxs[1] < Math.min.apply(null, nxs)) {  // first barline < min x-coor of all notes in this line
                bxs.splice(0, 1);  // remove left side staff because there already is a left barline
            }
            bars.push({ 'xs': bxs, 'ys': bys });
            bxs = {}, bys = {}, nxs = [];
            */
        }
        this.svg = this.svg + str;
    };
    /**
     * @name errMsg
     * @description Callback function which is called when some error has been found during the ABC parsing or the SVG generation
     * @param {string} txt text of the error
     * @param {number} line line number (Position of the error in the ABC source, same as the corresponding argument in errbld())
     * @param {number} col column number (Position of the error in the ABC source, same as the corresponding argument in errbld())
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    MusicXML2SVG.prototype.errMsg = function (txt, line, col) {
        this.errorMessages.push(txt);
    };
    /**
     * @name readFile
     * @description Callback function which is called to read a file. It is called when a %%abc-include command has been found in the ABC source.
     * @param {string} filename the name of the file
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    MusicXML2SVG.prototype.readFile = function (filename) {
        // %%abc-include, unused 
        return '';
    };
    /**
     * @name annoStart
     * @description Callback function for setting ABC references in the SVG images. This function is called just before the generation of a music element
     * @param {string} type It is one of annot, bar, clef, gchord, grace, key, meter, note, part, rest, tempo.
     * @param {number} startOffset offset of the music element in the ABC source
     * @param {number} stopOffset offset of the end of music element in the ABC source
     * @param {number} x x Coordinates of a rectangle which covers the music element
     * @param {number} y y Coordinates of a rectangle which covers the music element
     * @param {number} w width Coordinates of a rectangle which covers the music element
     * @param {number} x height Coordinates of a rectangle which covers the music element
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    MusicXML2SVG.prototype.annoStart = function (type, startOffset, stopOffset, x, y, w, h) {
        //console.log(type)
        if (type == 'clef') {
            //CAUTION
            //there is a bug or something when reporting the figures by the abc2svg library
            //sometimes it reports an inexistent note before the first one, which is overlapping the cleff
            //the only way to detect it is that it is overlapping the cleff
            //ups, no, let's try detecting it because the first note after the clef is not correctly aligned with others
            this.clefDetected = true; //clefBoxHalf = parseFloat(this.abc2svg.sx(x).toFixed(2)) + (w / 2);
        }
        if (type == 'meter') {
            //we discard this clef, it is the first one, and usually the meter move the note to the right
            this.clefDetected = false;
        }
        if (type == 'note' || type == 'rest' || type == 'grace') {
            var bbox = new FigureBox();
            bbox.barline = this.barlines;
            bbox.type = (type == 'note' || type == 'grace' ? FigureBox.TYPE_NOTE : FigureBox.TYPE_REST);
            bbox.x = parseFloat(this.abc2svg.sx(x).toFixed(2));
            bbox.y = parseFloat(this.abc2svg.sy(y).toFixed(2));
            bbox.w = w;
            bbox.h = h;
            bbox.offsetStart = startOffset;
            bbox.offsetStop = stopOffset;
            bbox.ligato = this.ligatos[this.figureBoxes.length];
            /*
            //CAUTION
            //there is a bug or something when reporting the figures by the abc2svg library
            //sometimes it reports an inexistent note before the first one, which is overlapping the cleff
            //the only way to detect it is that it is overlapping the cleff
            //ups, no, let's try detecting it because the first note after the clef is not correctly aligned with others
            if (this.clefDetected) {
                if (this.firstFigureLeft < 0) {
                    this.firstFigureLeft = bbox.x;
                    this.figureBoxes.push(bbox);
                } else {
                    if (this.firstFigureLeft > bbox.x) {
                        //we discard this!! it seem a bug note
                        console.warn("Warning! this seems a bug note: (expected:" + this.firstFigureLeft + ", obtained:" + bbox.x + ")");
                        //this.figureBoxes.push(bbox);
                    } else {
                        this.figureBoxes.push(bbox);
                    }
                }
            } else {
                this.figureBoxes.push(bbox);
            }*/
            this.figureBoxes.push(bbox);
        }
        else {
            //console.log(type);
        }
    };
    /**
     * @name timeLine
     * @description Callback function to get the internal representation of the music just before SVG generation.
     * @param {any} tsFirst First musical symbol in the time sequence. The symbols are double-linked by time by ts_next / ts_prev. The start of a new sequence is marked by seqst.
     * @param {any[]} voice_tb  Voice table. The first symbol of a voice is sym. The symbols are double-linked in a voice by next / prev.
     * @param {string[]} music_types Array giving the symbol type from integer value of the symbol attribute type.
     * @param {any} info Text of the information fields (T:, M:, Q:, P:...).  A newline ('\n') separates the appended values.
     * @see http://moinejf.free.fr/js/interface-1.xhtml
     */
    MusicXML2SVG.prototype.timeLine = function (tsFirst, voice_tb, music_types, info) {
        //let's do a timeline
        var map = [];
        var startReps = [];
        var index = 0;
        var indexFirstEndings = [];
        var indexSecondEndings = [];
        var indexSegno = -1;
        var indexFine = -1;
        var indexToCoda = -1;
        var flagLastLigato = false;
        var endPart = false;
        //getting the meter signature (numerator/denominator)
        var meterSignature = info.M.split("/");
        this.numerator = parseInt(meterSignature[0]);
        this.denominator = parseInt(meterSignature[1]);
        for (var ts = tsFirst; ts; ts = ts.ts_next) {
            switch (ts.type) {
                case MusicXML2SVG.ABC2SVG_TYPE_GRACE:
                case MusicXML2SVG.ABC2SVG_TYPE_NOTE:
                case MusicXML2SVG.ABC2SVG_TYPE_REST:
                    map.push(index);
                    //are we starting a new part?
                    if (endPart && !(ts.type == MusicXML2SVG.ABC2SVG_TYPE_REST)) {
                        this.startParts.push(map.length - 1);
                        endPart = false;
                    }
                    if (ts.type == MusicXML2SVG.ABC2SVG_TYPE_GRACE) {
                        this.ligatos.push(flagLastLigato);
                        var gracestr = this.graces[this.indexGrace];
                        this.indexGrace++;
                        var notes = gracestr.length - gracestr.replace(/[A-G]/g, '').length;
                        notes = notes + gracestr.length - gracestr.replace(/[a-g]/g, '').length;
                        for (var igrace = 0; igrace < notes - 1; igrace++) {
                            index++;
                            map.push(index);
                            this.ligatos.push(flagLastLigato);
                        }
                    }
                    //we need to save the ligato info to link after with the svg figure boxes generated
                    if (ts.notes) {
                        this.ligatos.push(flagLastLigato);
                        var ti1 = ts.notes[0].ti1;
                        if (ti1 == 3) {
                            //ligato!
                            flagLastLigato = true;
                        }
                        else {
                            flagLastLigato = false;
                        }
                    }
                    //lets see if we found a segno annotation
                    if (ts.a_dd && ts.a_dd.length > 0) {
                        for (var idd = 0; idd < ts.a_dd.length; idd++) {
                            var dd = ts.a_dd[idd];
                            if (dd.glyph === 'sgno') {
                                //segno
                                indexSegno = index;
                            }
                            else {
                                //console.log(dd.glyph);
                            }
                        }
                    }
                    index++;
                    break;
                case MusicXML2SVG.ABC2SVG_TYPE_BAR:
                    if (ts.text) {
                        if (ts.text.trim() === '1') {
                            //first ending
                            indexFirstEndings.push(index);
                        }
                        else if (ts.text.trim() === '2') {
                            //second ending
                            indexSecondEndings.push(index);
                        }
                    }
                    if (ts.a_gch && ts.a_gch.length > 0) {
                        for (var ig = 0; ig < ts.a_gch.length; ig++) {
                            var gch = ts.a_gch[ig];
                            var text = gch.text.toLowerCase();
                            if (text === "fine") {
                                //we found a fine annotation
                                indexFine = index;
                                continue;
                            }
                            if (text === "to coda") {
                                //we found a go to coda annotation
                                indexToCoda = index;
                                continue;
                            }
                            var start = 0;
                            var end = index;
                            var repeat = false;
                            if (text.startsWith("d.s.") || text.startsWith("d.c.")) {
                                //da segno or da capo, al fine or al coda
                                //we have a segno (da segno to...)?
                                if (indexSegno > -1 && text.startsWith("d.s.")) {
                                    start = indexSegno;
                                }
                                //we have a fine (...to fine)
                                if (indexFine > -1) {
                                    end = indexFine;
                                }
                                else if (indexToCoda > -1) {
                                    //to coda!
                                    end = indexToCoda;
                                }
                                repeat = true;
                            }
                            //lets create the repeat timeline                            
                            if (repeat) {
                                for (var irep = start; irep < end; irep++) {
                                    //we need to check first endings.. after a repetition we should pass again through first endings
                                    for (var ifirst = 0; ifirst < indexFirstEndings.length; ifirst++) {
                                        var firstEnd = indexFirstEndings[ifirst];
                                        if (firstEnd == irep) {
                                            irep = indexSecondEndings[ifirst];
                                            break;
                                        }
                                        else if (firstEnd > irep) {
                                            break;
                                        }
                                    }
                                    map.push(irep);
                                }
                            }
                        }
                    }
                    if (ts.bar_type === '||') {
                        //we discard it as an end of a new part if the previous bar was a :: or :|
                        //then we supose this is the end of the repetition
                        var tmp = ts.prev;
                        while (tmp.type != MusicXML2SVG.ABC2SVG_TYPE_BAR) {
                            tmp = tmp.prev;
                        }
                        if (!(tmp.bar_type === '::' || tmp.bar_type === ':|')) {
                            //this part ends... a new part is coming?
                            endPart = true;
                        }
                    }
                    if (ts.bar_type === '|:' || ts.bar_type === '||') {
                        //start a repetition
                        startReps.push(index);
                    }
                    else if (ts.bar_type === '::' || ts.bar_type === ':|') {
                        //now we repeat from the start to the end
                        var indexStartRep = startReps[startReps.length - 1];
                        if (!indexStartRep) {
                            //if we don't have yet a start definition, then we start from the begining
                            indexStartRep = 0;
                        }
                        var toIndex = index;
                        if (indexFirstEndings.length == indexSecondEndings.length && ts.text && ts.text.trim() === '2') {
                            toIndex = indexFirstEndings[indexFirstEndings.length - 1];
                        }
                        for (var i = indexStartRep; i < toIndex; i++) {
                            map.push(i);
                        }
                        startReps = startReps.slice(0, startReps.length - 1);
                        if (ts.bar_type === '::') {
                            //start a repetition
                            startReps.push(index);
                        }
                    }
                    break;
            }
        }
        this.timeLineMap = map;
    };
    /**set of const used by abc2svg library */
    MusicXML2SVG.ABC2SVG_TYPE_BAR = 0;
    MusicXML2SVG.ABC2SVG_TYPE_GRACE = 4;
    /*
    private static ABC2SVG_TYPE_METER: number = 6;
    */
    MusicXML2SVG.ABC2SVG_TYPE_NOTE = 8;
    MusicXML2SVG.ABC2SVG_TYPE_REST = 10;
    return MusicXML2SVG;
}());

/**
 * @name ConversionOptions
 * @description set of conversion options required by xml2abc.js library.
 */
var ConversionOptions = /** @class */ (function () {
    function ConversionOptions() {
        this.u = 0; //unfold repeats (1)
        this.b = 0; //bars per line
        this.n = 0; //chars per line
        this.c = 0; //credit text filter level (0-6)
        this.v = 3; //no volta on higher voice numbers (1)
        this.d = 0; //denominator unit length (L:)
        this.m = 2; //no midi, minimal midi, all midi output (0,1,2)
        this.x = 0; //no line breaks (1)
        this.t = 1; //clef dependent step value (1)
        this.p = '1.0,' + Math.round((document.documentElement.clientWidth * 20) / 640) + ',0,0'; // page format: scale (1.0), width, left and right margin in cm
    }
    return ConversionOptions;
}());

/**
 * @name FigureBox
 * @description represent the bounding box of a Note or a Rest inside the svg result
 */
var FigureBox = /** @class */ (function () {
    function FigureBox() {
        /** the x position */
        this.x = 0;
        /** the y position */
        this.y = 0;
        /** the width of the rectangle */
        this.w = 0;
        /** the height of the rectangle */
        this.h = 0;
        /** type of the figure, note or rest */
        this.type = FigureBox.TYPE_NOTE;
        /** the bar line where it is being rendered */
        this.barline = 0;
        /** indicates if its a ligato */
        this.ligato = false;
        /** startOffset offset of the music element in the ABC source */
        this.offsetStart = 0;
        /** stopOffset offset of the end of music element in the ABC source */
        this.offsetStop = 0;
    }
    FigureBox.TYPE_NOTE = 1;
    FigureBox.TYPE_REST = 2;
    return FigureBox;
}());

//# sourceMappingURL=musicxml2svg.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_Util__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_player_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
    }
    /**
     * @name getServerCompositionIndex
     * @description get the list of compositions available at the github server
     * @return {Composition[]} the list of compositions
     */
    SearchService.prototype.getServerCompositionIndex = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/index-compositions.json')
            .map(function (r) {
            return r.json();
        })
            .catch(function (error) {
            console.error(error);
            return [];
        });
    };
    /**
     * @name getServerCollectionIndex
     * @description get the list of collections available at the github server
     * @return {Collection[]} the list of collection
     */
    SearchService.prototype.getServerCollectionIndex = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/index-collections.json')
            .map(function (r) {
            return r.json();
        })
            .catch(function (error) {
            console.error(error);
            return [];
        });
    };
    /**
     * @name downloadMidiB64
     * @description download the midi binary and encode to b64
     * @param {Composition} comp the composition info to download
     * @return {Observable<string>} the observable to get the b64 string
     */
    SearchService.prototype.downloadMidiB64 = function (comp) {
        var url = __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/[' + comp.id + ']-' + comp.midiURL;
        var basicOptions = {
            url: url,
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
            search: null,
            headers: null,
            body: null,
            withCredentials: false,
            responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].ArrayBuffer
        };
        var reqOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */](basicOptions);
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */](reqOptions);
        return this.http.request(req)
            .map(function (r) {
            var ab = r.arrayBuffer();
            return Object(__WEBPACK_IMPORTED_MODULE_2__util_Util__["b" /* encode */])(ab);
        })
            .catch(function (error) {
            console.error(error);
            throw error;
        });
    };
    /**
     * @name downloadScore
     * @description download the score of the composition
     * @param {Composition} comp the composition info to download
     * @return {Observable<string>} the observable to get the XML score string
     */
    SearchService.prototype.downloadScore = function (comp) {
        var url = __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */].dataUrl1 + '/[' + comp.id + ']-' + comp.scoreURL;
        return this.http
            .get(url)
            .map(function (r) {
            return r.text();
        })
            .catch(function (error) {
            console.error(error);
            throw error;
        });
    };
    SearchService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], SearchService);
    return SearchService;
}());

//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PitchDetectData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PitchDetect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/**
 * pitch detect library from https://github.com/cwilso/PitchDetect
 */
/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var PitchDetectData = /** @class */ (function () {
    function PitchDetectData(pitch, note, detune, detuneAmount) {
        this.pitch = 0;
        this.note = "";
        this.detune = "";
        this.detuneAmount = 0;
        this.pitch = pitch;
        this.note = note;
        this.detune = detune;
        this.detuneAmount = detuneAmount;
    }
    return PitchDetectData;
}());

var PitchDetect = /** @class */ (function () {
    /*
    private theBuffer = null;
    private DEBUGCANVAS = null;
    private detectorElem;
    private canvasElem;
    private waveCanvas;
    private pitchElem;
    private noteElem;
    private detuneElem;
    private detuneAmount;
    */
    function PitchDetect() {
        var _this = this;
        this.audioContext = null;
        this.mediaStreamSource = null;
        this.analyser = null;
        this.sourceNode = null;
        this.isLiveInput = false;
        this.isPlaying = false;
        this.micStream = null;
        this.rafID = null;
        //private tracks = null;
        this.buflen = 1024;
        this.buf = new Float32Array(this.buflen);
        this.noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.MIN_SAMPLES = 0; // will be initialized when AudioContext is created.
        this.GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
        // sensitivity to ignore signal
        this.sensitivity = 0.06;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); //new AudioContext();
        PitchDetect.MAX_SIZE = Math.max(4, Math.floor(this.audioContext.sampleRate / 5000)); // corresponds to a 5kHz signal
        this.observable = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"](function (observer) { return _this.observer = observer; });
    }
    PitchDetect.prototype.close = function () {
        this.audioContext.close();
    };
    PitchDetect.prototype.error = function () {
        console.error('Stream generation failed.');
    };
    PitchDetect.prototype.getUserMedia = function (dictionary, callback) {
        try {
            var n = navigator;
            n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
            navigator.getUserMedia(dictionary, callback, this.error);
        }
        catch (e) {
            console.error('getUserMedia threw exception :' + e);
        }
    };
    PitchDetect.prototype.gotStream = function (stream) {
        // Create an AudioNode from the stream.
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        // Connect it to the destination.
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.mediaStreamSource.connect(this.analyser);
        this.updatePitch();
    };
    PitchDetect.prototype.toggleOscillator = function () {
        if (this.isPlaying) {
            //stop playing and return
            this.sourceNode.stop(0);
            this.sourceNode = null;
            this.analyser = null;
            this.isPlaying = false;
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            window.cancelAnimationFrame(this.rafID);
            return "play oscillator";
        }
        this.sourceNode = this.audioContext.createOscillator();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.sourceNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.sourceNode.start(0);
        this.isPlaying = true;
        this.updatePitch();
        return "stop";
    };
    PitchDetect.prototype.toggleLiveInput = function () {
        if (this.isPlaying) {
            //stop playing and return
            this.sourceNode.stop(0);
            this.sourceNode = null;
            this.analyser = null;
            this.isPlaying = false;
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            window.cancelAnimationFrame(this.rafID);
        }
        if (this.isLiveInput) {
            var tracks = this.micStream.getTracks();
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].stop();
            }
            return;
        }
        var self = this;
        this.isLiveInput = true;
        this.getUserMedia({
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, function (stream) {
            self.micStream = stream;
            self.gotStream(stream);
        });
        return this.observable;
    };
    PitchDetect.prototype.noteFromPitch = function (frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    };
    PitchDetect.prototype.frequencyFromNoteNumber = function (note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    };
    PitchDetect.prototype.centsOffFromPitch = function (frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    };
    PitchDetect.prototype.autoCorrelate = function (buf, sampleRate) {
        var SIZE = buf.length;
        var MAX_SAMPLES = Math.floor(SIZE / 2);
        var best_offset = -1;
        var best_correlation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;
        var correlations = new Array(MAX_SAMPLES);
        for (var i = 0; i < SIZE; i++) {
            var val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < this.sensitivity)
            return -1;
        var lastCorrelation = 1;
        for (var offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
            var correlation = 0;
            for (var i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation > this.GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            }
            else if (foundGoodCorrelation) {
                // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
                // (anti-aliased) offset.
                // we know best_offset >=1, 
                // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
                // we can't drop into this clause until the following pass (else if).
                var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
                return sampleRate / (best_offset + (8 * shift));
            }
            lastCorrelation = correlation;
        }
        if (best_correlation > 0.01) {
            // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            return sampleRate / best_offset;
        }
        return -1;
        //	var best_frequency = sampleRate/best_offset;
    };
    PitchDetect.prototype.updatePitch = function () {
        //var cycles = new Array();
        if (this.analyser == null) {
            return;
        }
        this.analyser.getFloatTimeDomainData(this.buf);
        var ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate);
        var self = this;
        if (ac == -1) {
            /*
            detectorElem.className = "vague";
            pitchElem.innerText = "--";
            noteElem.innerText = "-";
            detuneElem.className = "";
            detuneAmount.innerText = "--";
            */
        }
        else {
            //detectorElem.className = "confident";
            var pitch = ac;
            var pitchElem = Math.round(pitch);
            var note = this.noteFromPitch(pitch);
            var noteElem = this.noteStrings[note % 12];
            var detune = this.centsOffFromPitch(pitch, note);
            var detuneAmount = 0;
            var detuneElem = "";
            if (detune == 0) {
                //detuneElem.className = "";
                detuneAmount = 0;
            }
            else {
                if (detune < 0)
                    detuneElem = "flat";
                else
                    detuneElem = "sharp";
                detuneAmount = Math.abs(detune);
            }
            var pddata = new PitchDetectData(pitchElem, noteElem, detuneElem, detuneAmount);
            this.observer.next(pddata);
            //console.log("pitch:" + pitchElem + ", note:" + noteElem + ", detune:" + detuneElem + "(" + detuneAmount + ")");
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        this.rafID = window.requestAnimationFrame(function () {
            self.updatePitch();
        });
    };
    PitchDetect.MAX_SIZE = 0;
    return PitchDetect;
}());

//# sourceMappingURL=pitchdetect.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TempoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_knob__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_knob___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_knob__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TempoPage = /** @class */ (function () {
    function TempoPage(app, appref, navParams, el) {
        this.app = app;
        this.appref = appref;
        this.el = el;
        this.composition = null;
        this.tempo = 0;
        this.saveEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cancelEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        //we get from the params the composition we want to train
        this.composition = navParams.data;
    }
    TempoPage.prototype.ngOnInit = function () {
        var width = this.el.nativeElement.offsetWidth;
        var height = this.el.nativeElement.offsetHeight;
        var size = Math.ceil(width * 0.8);
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
        this.knob.maxDistance = size;
    };
    /**
  * @name setTempo
  * @description set the tempo of the midi loaded
  * @param {number} bpm beats per minute
  */
    TempoPage.prototype.setTempo = function (bpm) {
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
    };
    TempoPage.prototype.reset = function () {
        this.knob.writeValue(this.composition.originalTempo);
        this.tempo = this.composition.originalTempo;
    };
    TempoPage.prototype.save = function () {
        this.saveEvent.emit(this.tempo);
    };
    TempoPage.prototype.cancel = function () {
        this.cancelEvent.emit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myknob1'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ng2_knob__["KnobComponent"])
    ], TempoPage.prototype, "knob", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("save"),
        __metadata("design:type", Object)
    ], TempoPage.prototype, "saveEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("cancel"),
        __metadata("design:type", Object)
    ], TempoPage.prototype, "cancelEvent", void 0);
    TempoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/tempo/tempo.component.html"*/'<div class="tempo-container">\n\n    <div class="tempo-header">\n        <h2>{{composition.name}}</h2>\n        <h3>{{composition.author}}</h3>\n    </div>\n\n\n    <div class="tempo-knob container-knob">\n        <div class="tempo-middle">{{tempo}} bpm</div>\n        <knob class="skin3" #myknob1 [min]="20" [max]="300" (change)="setTempo($event)" [startDegree]="5" [intensive]="true" [endDegree]="355"></knob>\n    </div>\n\n    <button class="default" ion-button full (click)="reset()">{{\'TEMPO-RESETTODEFAULT\' | translate}}</button>\n    <button class="save" ion-button color="secondary" (click)="save()">{{\'TEMPO-SAVE\' | translate}}</button>\n    <button class="cancel" ion-button color="danger" (click)="cancel()">{{\'TEMPO-CANCEL\' | translate}}</button>\n\n</div>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/tempo/tempo.component.html"*/,
            selector: 'tempo'
        })
        /**
         * @class
         * @name TempoPage
         * @description Page to display tempo and configure it
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], TempoPage);
    return TempoPage;
}());

//# sourceMappingURL=tempo.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MidiPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__midiplayerjs_player__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_soundfont_player__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_soundfont_player___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_soundfont_player__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


 //midi-player-js';


/**
 * @class
 * @name MidiPlayer
 * @description MidiPlayer based on midi-player-js and sounffont-player which is able to play and generate sounds.
 */
var MidiPlayer = /** @class */ (function () {
    function MidiPlayer(service, platform) {
        this.service = service;
        this.platform = platform;
        //TODO, sf2 for orchestras?
        //public static sf2MidiSynth:SoundFontMidiSynth;
        //the preferred tempo, -1 not set
        this.bpm = -1;
        /** indicates the muted Track, if any (>-1) */
        this.mutedTracks = [];
        /** the midi data arraybuffer chache */
        this.midiDataArrayBuffer = null;
        /** last metronome tick */
        this.lastTick = -1;
        /** to activate or deactivate metronome */
        this.metronome = false;
        /** if we need highquality sounds or not */
        this.highQuality = false;
        this.soundpool = new CircularSoundPool();
        this.initMidiPlayer();
    }
    MidiPlayer_1 = MidiPlayer;
    /**
     * @name setListener
     * @description set an event listener for this player
     */
    MidiPlayer.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    /**
     * @name prepare
     * @description prepare the midi player to start playing
     */
    MidiPlayer.prototype.prepare = function () {
        this.player.prepare();
    };
    /**
     * @name getTempo
     * @description return the tempo of the midi loaded
     * @return {number} the tempo (bpm)
     */
    MidiPlayer.prototype.getTempo = function () {
        return this.player.tempo;
    };
    /**
     * @name setMetronome
     * @description activate or deactivate the metronome
     * @param {boolean} activate true if you want to hear the metronome
     */
    MidiPlayer.prototype.setMetronome = function (activate) {
        this.metronome = activate;
    };
    /**
     * @name setHighQuality
     * @description set or unset the high quality for sounds
     * @param {boolean} highQuality true if we need high quality for sounds
     */
    MidiPlayer.prototype.setHighQuality = function (highQuality, comp) {
        if (this.highQuality != highQuality) {
            this.highQuality = highQuality;
            MidiPlayer_1.soundfonts = {};
            this.loadSoundFonts(comp);
        }
    };
    /**
     * @name getCurrentTime
     * @description return the current time in milliseconds
     * @return {number} the current time in milliseconds
     */
    MidiPlayer.prototype.getCurrentTime = function () {
        var currentTick = this.player.startTick;
        return currentTick / this.player.division / this.player.tempo * 60000;
    };
    /**
     * @name load
     * @description load the midi data from the composition info
     * @param {Composition} comp the composition info to load the midi info
     * @return {Promise<void>} the promise to load the composition
     */
    MidiPlayer.prototype.load = function (comp) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loadSoundFonts(comp).then(function () {
                _this.service.getMidi(comp).then(function (data) {
                    _this.loadMidiData(data);
                    resolve();
                });
            });
        });
    };
    /**
     * @name loadMidiData
     * @description load the midi data
     * @param {ArrayBuffer} data the midi data as an arraybuffer
     */
    MidiPlayer.prototype.loadMidiData = function (data) {
        this.midiDataArrayBuffer = data;
        this.player.loadArrayBuffer(data);
    };
    MidiPlayer.prototype.play = function () {
        this.resume();
    };
    /**
     * @name createMap
     * @description internal function to load the midi and create a map of ticks, find the tempo info, ...
     * @param {number} itrack the index of the track in which the map will be based on
     * @return {Promise<MidiInfo>} the promise to return the midi info
     */
    MidiPlayer.prototype.createMap = function (itrack) {
        var _this = this;
        return new Promise(function (resolve) {
            //preparing some variables
            var result = { tempo: 0, notes: [] };
            var foundTempo = false;
            var oldEventHandlers = _this.player.eventListeners;
            _this.player.eventListeners = {};
            var player = _this.player;
            player.resetTracks();
            var currentTick = 0;
            //we need to store delta time to wait ticks
            var deltaTracks = [];
            for (var i = 0; i < player.tracks.length; i++) {
                deltaTracks.push(0);
            }
            var tickDelta = 0;
            var currentTempo = 0;
            //lets start reading
            while (!player.endOfFile()) {
                var tracks = [];
                //we get info from each track
                for (var i = 0; i < player.tracks.length; i++) {
                    var track = player.tracks[i];
                    var trackInfo = {
                        pointer: track.pointer,
                        lastStatus: track.lastStatus,
                        delta: track.delta,
                        runningDelta: track.runningDelta,
                        lastTick: track.lastTick,
                    };
                    var event_1 = track.handleEvent(currentTick, false);
                    tracks.push(trackInfo);
                    //lets capture the tempo
                    if (event_1 != null && event_1.name == 'Set Tempo') {
                        if (!foundTempo) {
                            foundTempo = true;
                            _this.player.tempo = event_1.data;
                            _this.player.setForcedTempo(event_1.data);
                            _this.player.setOriginalTempo(event_1.data);
                        }
                        currentTempo = event_1.data;
                    }
                    //if we are dealing with the front track
                    if (i == (itrack - 1)) {
                        if (event_1 != null) {
                            if (event_1.name == 'Note on' && event_1.velocity > 0) {
                                //a new note, lets save the track infos
                                result.notes.push({ tempo: currentTempo, tick: currentTick, tracks: tracks });
                            }
                        }
                    }
                    if (event_1 != null) {
                        deltaTracks[i] = track.getDelta();
                    }
                    else {
                        deltaTracks[i] = deltaTracks[i] - tickDelta;
                    }
                }
                //lets calculate the next tick delta
                tickDelta = Math.min.apply(null, deltaTracks);
                if (tickDelta <= 0) {
                    tickDelta = 5;
                }
                currentTick = currentTick + tickDelta;
            }
            //restoring the player
            player.resetTracks();
            _this.player.eventListeners = oldEventHandlers;
            resolve(result);
        });
    };
    /**
     * @name seek
     * @description seek the midi player
     * @param {number} tempo the original tempo of the track at the tick specified
     * @param {number} tick the tick number to seek
     * @param {trackInfos[]} list of track info to restore the status
     */
    MidiPlayer.prototype.seek = function (tempo, tick, trackInfos) {
        this.player.seek(tempo, tick, trackInfos);
    };
    /**
     * @name setTempo
     * @description set the tempo of the midi loaded
     * @param {number} bpm beats per minute
     */
    MidiPlayer.prototype.setTempo = function (bpm) {
        if (this.player.isPlaying()) {
            this.player.pause();
            this.player.tempo = bpm;
            this.player.setForcedTempo(bpm);
            this.player.play();
        }
        else {
            this.bpm = bpm;
            this.player.tempo = bpm;
            this.player.setForcedTempo(bpm);
        }
    };
    /**
     * @name initMidiPlayer
     * @description initialize the midi player
     */
    MidiPlayer.prototype.initMidiPlayer = function () {
        this.player = new __WEBPACK_IMPORTED_MODULE_2__midiplayerjs_player__["a" /* Player */](this.midiUpdate.bind(this));
        this.player.on('endOfFile', function () {
            this.stop();
            if (this.listener && this.listener != null) {
                this.listener.endOfSong();
            }
        }.bind(this));
        this.player.on('playing', function (event) {
            if (this.player.isPlaying()) {
                var division = this.player.division; //parts (ticks) per quarter (is quarter the beat reference?)
                //let tempo = this.player.tempo; //qpm quarter per minute
                //let tempoBySec = tempo / 60; //qps quarter per second
                var tick = event.tick;
                var diff = tick - this.lastTick;
                //console.log("tick:" + tick + ";division:" + division + ";diff:" + diff);
                if (this.lastTick < 0 || diff >= division) {
                    //console.log(">>>>>>>>>>>tick:" + tick + ";division:" + division);
                    if (this.lastTick < 0) {
                        this.lastTick = 0;
                    }
                    else {
                        this.lastTick = this.lastTick + division;
                    }
                    //console.log("diff:" + (diff - division));
                    this.playMetronome(true);
                }
            }
        }.bind(this));
    };
    /**
     * @name loadSoundFont
     * @description load a soundfont from binary js descriptor
     * @param {string} name the name of the instrument to load
     * @return {Promise<void>} the promise to load the instrument
     */
    MidiPlayer.prototype.loadSoundFont = function (name) {
        var _this = this;
        return new Promise(function (resolve) {
            if (name != null && (!MidiPlayer_1.soundfonts[name] || MidiPlayer_1.soundfonts[name] == null)) {
                MidiPlayer_1.soundfonts[name] = "loading";
                var url = _this.getInsrumentUrl(name);
                __WEBPACK_IMPORTED_MODULE_4_soundfont_player__["instrument"](MidiPlayer_1.audioContext, url).then(function (instrument) {
                    MidiPlayer_1.soundfonts[name] = instrument;
                    resolve(instrument);
                });
            }
            else {
                resolve();
            }
        });
    };
    /**
     * @name getInstrumentsByTrack
     * @description get the instruments by track needed for this composition
     * @param {Composition} composition
     * @return {string[]} the list of instruments needed by track (index of the array)
     */
    MidiPlayer.prototype.getInstrumentsByTrack = function (composition) {
        //ensuring space in the array
        var safe = function (object, index) {
            while (object.length <= index) {
                object.push(null);
            }
        };
        var result = [];
        var frontName = composition.frontInstrument.name.toLowerCase().trim();
        safe(result, composition.frontInstrument.track);
        result[composition.frontInstrument.track] = frontName;
        //front could have a help track
        if (composition.frontInstrument.help >= 0) {
            safe(result, composition.frontInstrument.help);
            result[composition.frontInstrument.help] = frontName;
        }
        if (composition.backInstruments) {
            for (var i = 0; i < composition.backInstruments.length; i++) {
                var backName = composition.backInstruments[i].name.toLowerCase().trim();
                var track = composition.backInstruments[i].track;
                safe(result, track);
                result[track] = backName;
            }
        }
        result[0] = "metronome";
        return result;
    };
    /**
     * @name loadSoundFont
     * @description load the soundfont to play midi files
     * @return the promise to load the soundfont
     */
    MidiPlayer.prototype.loadSoundFonts = function (composition) {
        var _this = this;
        return new Promise(function (resolve) {
            var instrumentsByTrack = _this.getInstrumentsByTrack(composition);
            //lets remove every instrument not needed from memory
            if (MidiPlayer_1.soundfonts) {
                //we have soundfonts in memory
                var keys = Object.keys(MidiPlayer_1.soundfonts);
                for (var i = 0; i < keys.length; i++) {
                    var name_1 = keys[i];
                    var needed = false;
                    //let search if the instrument is needed
                    for (var j = 0; j < instrumentsByTrack.length; j++) {
                        if (instrumentsByTrack[j] === name_1) {
                            //yes, it is needed
                            needed = true;
                            break;
                        }
                    }
                    if (!needed) {
                        //we don't need the instrument in memory
                        delete MidiPlayer_1.soundfonts[name_1];
                    }
                }
            }
            var promises = [];
            for (var i = 0; i < instrumentsByTrack.length; i++) {
                promises.push(_this.loadSoundFont(instrumentsByTrack[i]));
            }
            Promise.all(promises).then(function () {
                _this.soundpool.init(instrumentsByTrack);
                resolve();
                /*
                TODO, sf2 for orchestras?
                this.service.getSoundfont().then((response: ArrayBuffer) => {
                    let input: Uint8Array = new Uint8Array(response);
                    MidiPlayer.sf2MidiSynth = new SoundFontMidiSynth();
                    MidiPlayer.sf2MidiSynth.loadSoundFont(input);
                    resolve();
                });
                */
            });
        });
    };
    /**
     * @name playMidiData
     * @description play the music, start the show!
     * @param {ArrayBuffer} data the binary data of the midi to be played
     */
    MidiPlayer.prototype.playMidiData = function (data) {
        this.player.loadArrayBuffer(data);
        this.player.play();
    };
    /**
     * @name playMetronome
     * @description play the metronome
     * @param {boolean} high indicates if we want to hear a high tick metronome pulse or low
     */
    MidiPlayer.prototype.playMetronome = function (high) {
        if (this.metronome) {
            this.soundpool.play({ noteName: (high ? "A0" : "Bb0"), track: 0, velocity: 100 });
        }
    };
    /**
     * @name stop
     * @description stop the current playing
     */
    MidiPlayer.prototype.stop = function () {
        this.lastTick = -1;
        this.player.stop();
        this.soundpool.stop();
    };
    /**
     * @name pause
     * @description pause the current playing
     */
    MidiPlayer.prototype.pause = function () {
        this.player.pause();
    };
    /**
     * @name resume
     * @description resume the current playing
     */
    MidiPlayer.prototype.resume = function () {
        this.player.play();
    };
    /**
     * @name muteTrack
     * @description mute a Track
     * @param {number} track the Track to mute
     */
    MidiPlayer.prototype.muteTrack = function (track) {
        this.mutedTracks.push(track);
    };
    /**
     * @name unmuteTrack
     * @description unmute a certain track
     * @param {number} the track to unmute
     */
    MidiPlayer.prototype.unmuteTrack = function (track) {
        var result = [];
        for (var i = 0; i < this.mutedTracks.length; i++) {
            if (this.mutedTracks[i] != track) {
                result.push(this.mutedTracks[i]);
            }
        }
        this.mutedTracks = result;
    };
    /**
     * @name unmuteTracks
     * @description unmute all Tracks
     */
    MidiPlayer.prototype.unmuteTracks = function () {
        this.mutedTracks = [];
    };
    /**
     * @name isMuted
     * @description check if a certain track is muted or not
     * @param {number} track the track to chec
     * @return {boolean} if the track is muted or not
     */
    MidiPlayer.prototype.isMuted = function (track) {
        for (var i = 0; i < this.mutedTracks.length; i++) {
            if (this.mutedTracks[i] == track) {
                return true;
            }
        }
        return false;
    };
    /**
     * @name midiUpdate
     * @description a new midi event has been produced
     * @param event the event produced
     */
    MidiPlayer.prototype.midiUpdate = function (event) {
        //TODO, sf2 for orchestras?
        /*
                console.log("EVENT:" + event.name + ";velocity:" + event.velocity);
                if (event.name == 'Note on') {
                    console.log("note");
                    if (event.velocity == 0) {
                        console.log("cero");
                    }
                }
                MidiPlayer.sf2MidiSynth.processMidiMessage(event.message);
        */
        if (event.name == 'Note on') {
            if (!this.isMuted(event.track)) {
                this.soundpool.play(event);
            }
        }
        if (this.listener && this.listener != null) {
            this.listener.midiUpdate(event);
        }
    };
    /**
     * @name getInstrumentUrl
     * @description obtain the soundfont url for the instrument we desire
     * @param {string} instrument the instrument we're trying to get
     * @return {string} the url to get the js soundfont
     */
    MidiPlayer.prototype.getInsrumentUrl = function (instrument) {
        if (instrument.toLowerCase().trim().indexOf("metronome") >= 0) {
            return 'assets/soundfonts/metronome-wav.js';
        }
        else if (instrument.toLowerCase().trim().indexOf("piano") >= 0) {
            instrument = "acoustic_grand_piano";
        }
        else if (instrument.toLowerCase().trim().indexOf("harp") >= 0) {
            instrument = "orchestral_harp";
        }
        var highQualityUrl = 'http://gleitz.github.io/midi-js-soundfonts/MusyngKite/';
        var lowQualityUrl = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/';
        return (this.highQuality ? highQualityUrl : lowQualityUrl) + instrument.toLowerCase().trim() + '-mp3.js';
        /*
        let android: boolean = this.platform.is("android");
        let codec: string = "wav"; //TODO, always wav? or try mp3 and then wav? increasing size of the app?
        if (android) {
            //unfortunately android mp3 decodification is veeryyyyy slow! (do the same in IOS?)
            codec = "wav";
        }
        //remember to avoid using mp3 files as the decode in android is very slow
        if (instrument.toLowerCase().trim().indexOf("flute") >= 0) {
            return 'assets/soundfonts/flute-' + codec + '.js'
        }
        else if (instrument.toLowerCase().trim().indexOf("metronome") >= 0) {
            return 'assets/soundfonts/metronome-wav.js'
        } else if (instrument.toLowerCase().trim().indexOf("harp") >= 0) {
            return 'assets/soundfonts/harp-wav.js'
        } else {
            return 'assets/soundfonts/acoustic_grand_piano-' + codec + '.js';
        }
        */
    };
    /** we have static fields to avoid creating again these object, which have a huge cost */
    MidiPlayer.audioContext = new (window.AudioContext || window.webkitAudioContext)(); //new AudioContext();
    MidiPlayer.soundfonts = {};
    MidiPlayer = MidiPlayer_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Platform */]])
    ], MidiPlayer);
    return MidiPlayer;
    var MidiPlayer_1;
}());

/**
 * @name CircularSoundPool
 * @description a circular sound pool to avoid playing infinite sounds. The threshold determine how many sounds can be played simultaneously
 */
var CircularSoundPool = /** @class */ (function () {
    function CircularSoundPool() {
        this.trackList = [[]];
        this.pianoIndex = 0;
        this.pianoThreshold = 8;
    }
    /**
     * @name init
     * @description initialize the circular sound pool with a set of instruments by track
     * @param {string[]} instrumentMap a set of instruments by track (null or not defined means piano)
     */
    CircularSoundPool.prototype.init = function (instrumentMap) {
        this.instrumentsMap = instrumentMap;
        this.trackList = [[]];
        for (var i = 0; i < this.instrumentsMap.length; i++) {
            this.trackList.push([]);
        }
    };
    /**
     * @name stop
     * @description stop all the instruments mapped
     */
    CircularSoundPool.prototype.stop = function () {
        for (var i = 0; i < this.trackList.length; i++) {
            if (this.trackList[i] && this.trackList[i] != null) {
                for (var j = 0; j < this.trackList[i].length; j++) {
                    var instrument = this.trackList[i][j];
                    if (instrument && instrument != null) {
                        instrument.stop();
                    }
                }
            }
        }
    };
    /**
     * @name play
     * @description play a midi event
     * @param {any} event a midi event
     */
    CircularSoundPool.prototype.play = function (event) {
        var track = event.track;
        var strInstrument = this.instrumentsMap[track];
        if (!strInstrument || strInstrument == null) {
            strInstrument = "piano";
        }
        var instrument = MidiPlayer.soundfonts[strInstrument];
        if (!instrument || instrument == null) {
            strInstrument = "piano";
            instrument = MidiPlayer.soundfonts["piano"];
        }
        var max = (strInstrument == "piano" || strInstrument == "harp" ? this.pianoThreshold : 1);
        var index = (strInstrument == "piano" || strInstrument == "harp" ? this.pianoIndex : 0);
        if (this.trackList[track][index] && strInstrument != "metronome") {
            this.trackList[track][index].stop();
        }
        var options = { gain: 0 };
        if (event.velocity > 0) {
            //console.log("velocity:"+event.velocity);
            //trying to maximize volume
            event.velocity = 1127;
            options = {
                gain: 5
            };
        }
        this.trackList[track][index] = instrument.play(event.noteName, MidiPlayer.audioContext.currentTime, options);
        index++;
        if (index == max) {
            index = 0;
        }
        if (strInstrument == "piano" || strInstrument == "harp") {
            this.pianoIndex = index;
        }
    };
    return CircularSoundPool;
}());
//# sourceMappingURL=midiplayer.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MP3Player; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_soundmanager2__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_soundmanager2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_soundmanager2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * @class
 * @name MP3Player
 * @description MP3Player to play mp3 backing tracks
 */
var MP3Player = /** @class */ (function () {
    function MP3Player(service, platform) {
        this.service = service;
        this.platform = platform;
        this.soundTrack = null;
        this.muted = false;
        if (MP3Player_1.soundManager == null) {
            MP3Player_1.soundManager = new __WEBPACK_IMPORTED_MODULE_3_soundmanager2__["SoundManager"]();
        }
        else {
            MP3Player_1.soundManager.reset();
        }
    }
    MP3Player_1 = MP3Player;
    MP3Player.prototype.reset = function () {
        MP3Player_1.soundManager.reset();
    };
    /**
     * @name init
     * @description Initialize the mp3 player and start loading the mp3 backing track
     * @param {string} url the url to get the mp3
     * @return {Promise<void>} the promise to init and load the mp3
     */
    MP3Player.prototype.init = function (url) {
        var _this = this;
        return new Promise(function (resolve) {
            MP3Player_1.soundManager.setup({
                preferFlash: false,
                onready: function () {
                    // console.log('SM2 ready!');
                    this.soundTrack = MP3Player_1.soundManager.createSound({
                        id: 'backingtrack',
                        url: url,
                        html5Only: true,
                        autoLoad: true,
                        autoPlay: false,
                        onload: function () {
                            // console.log('backingtrack loaded!');
                            resolve();
                        },
                        volume: 100
                    });
                    this.mute(this.muted);
                }.bind(_this),
                ontimeout: function () {
                    resolve();
                    console.log('SM2 init failed!');
                },
                defaultOptions: {
                    // set global default volume for all sound objects
                    volume: 100
                }
            });
            MP3Player_1.soundManager.beginDelayedInit();
        });
    };
    /**
     * @name seek
     * @description seek the mp3 player
     * @param {number} ms the milliseconds to seek
     * @return {boolean} indicates if it was possible to seek or not depending in the bufered data
     */
    MP3Player.prototype.seek = function (ms) {
        if (this.soundTrack.duration > ms) {
            this.stop();
            this.play();
            this.pause();
            this.soundTrack.setPosition(ms);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @name pause
     * @description pause the current sound track
     */
    MP3Player.prototype.pause = function () {
        this.soundTrack.pause();
    };
    /**
     * @name stop
     * @description stop the current sound track
     */
    MP3Player.prototype.stop = function () {
        if (this.soundTrack != null) {
            this.soundTrack.stop();
        }
    };
    /**
     * @name play
     * @description play the current sound track
     */
    MP3Player.prototype.play = function () {
        this.soundTrack.play();
    };
    /**
     * @name resume
     * @description resume the current sound track
     */
    MP3Player.prototype.resume = function () {
        this.soundTrack.resume();
    };
    /**
     * @name mute
     * @description to mute or unmute the player
     * @param {boolean} mute the new muted state
     */
    MP3Player.prototype.mute = function (mute) {
        this.muted = mute;
        if (this.soundTrack != null) {
            if (mute) {
                this.soundTrack.mute();
            }
            else {
                this.soundTrack.unmute();
            }
        }
    };
    /** the sound manager */
    MP3Player.soundManager = null;
    MP3Player = MP3Player_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */]])
    ], MP3Player);
    return MP3Player;
    var MP3Player_1;
}());

//# sourceMappingURL=mp3player.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrainerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_musicxmlplayer__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_player_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dao_dao__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_knob__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_knob___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_knob__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Rx__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TrainerPage = /** @class */ (function () {
    function TrainerPage(app, appref, menu, insomnia, navParams, player, _sanitizer, dao, translate) {
        this.app = app;
        this.appref = appref;
        this.menu = menu;
        this.insomnia = insomnia;
        this.player = player;
        this._sanitizer = _sanitizer;
        this.dao = dao;
        this.translate = translate;
        this.tempo = 0;
        this.STATE_STOP = 0;
        this.STATE_PLAYING = 1;
        this.STATE_PAUSED = 2;
        this.composition = null;
        this.state = 0;
        this.flagRendering = false;
        this.daoSubscription = null;
        this.resizeSubscription = null;
        this.loadingComponent = "";
        this.tempoIsVisible = false;
        this.prepare = -1;
        //we get from the params the composition we want to train
        this.composition = navParams.data;
    }
    TrainerPage.prototype.enableMenus = function () {
        this.menu.enable(true, 'menu-trainer');
    };
    TrainerPage.prototype.disableMenus = function () {
        this.menu.enable(false, 'menu-trainer');
    };
    TrainerPage.prototype.ionViewDidLeave = function () {
        //stopping the player
        this.player.stop(true);
        //allowing to sleep again the device
        this.insomnia.allowSleepAgain();
        //disabling my menus
        this.disableMenus();
        //settings unsubscription
        if (this.daoSubscription != null) {
            this.daoSubscription.unsubscribe();
        }
        //resize unsubscription
        if (this.resizeSubscription != null) {
            this.resizeSubscription.unsubscribe();
        }
        this.dao.updateComposition(this.composition);
    };
    /**
     * @name listenResizeEvents
     * @description we listen the resize events to render again
     */
    TrainerPage.prototype.listenResizeEvents = function () {
        var _this = this;
        var $resizeEvent = __WEBPACK_IMPORTED_MODULE_9_rxjs_Rx__["Observable"].fromEvent(window, 'resize').debounceTime(200);
        var self = this;
        this.resizeSubscription = $resizeEvent.subscribe(function (data) {
            if (!_this.flagRendering) {
                _this.flagRendering = true;
                if (_this.state == _this.STATE_PLAYING) {
                    self.pause();
                }
                _this.loadingComponent = "score";
                _this.player.loadAndRenderScore(_this.composition).then(function (svg) {
                    _this.svgContent = _this._sanitizer.bypassSecurityTrustHtml(svg);
                    _this.listenSVG();
                    _this.flagRendering = false;
                    _this.loadingComponent = "";
                });
            }
        });
    };
    /**
     * @name listenSVG
     * @description listen click events on the SVG to select notes
     */
    TrainerPage.prototype.listenSVG = function () {
        $("#svg").off("click").click(function (event) {
            var _this = this;
            var $target = $(event.target);
            var tries = 0;
            //we get the g element
            if ($target.is("svg")) {
                $target = $target.find(">g.music").eq(0);
            }
            else {
                while (!$target.is("g.music") && tries < 3) {
                    $target = $target.parent();
                    tries++;
                }
            }
            if ($target.is("g.music")) {
                if (this.state != this.STATE_PLAYING) {
                    var response = this.player.select($target, $target.parent().index(), event.clientX, event.clientY);
                    this.state = this.STATE_PAUSED;
                    if (!response && this.composition.mp3URL && this.composition.mp3URL.length > 0) {
                        //oh oh! we need to buffer the entire song :(
                        //TODO ask to the user
                        this.loadingComponent = "mp3";
                        this.player.preloadMP3().then(function () {
                            _this.loadingComponent = "";
                            _this.player.select($target, $target.parent().index(), event.clientX, event.clientY);
                        });
                    }
                }
            }
        }.bind(this));
    };
    TrainerPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //enabling my menus
        this.enableMenus();
        //we can't go to sleep now
        this.insomnia.keepAwake();
        //lets start loading
        this.loadingComponent = "score";
        this.flagRendering = true;
        this.listenResizeEvents();
        this.dao.getSettings().then(function (settings) {
            _this.player.init(_this.composition, _this, settings);
        });
        this.daoSubscription = this.dao.observeSettings().subscribe(function (settings) {
            _this.player.updateSettings(settings);
        });
    };
    /**
     * @name svgLoaded
     * @description The SVG has been generated
     * @param {string} svg the svg created
     * @override
     */
    TrainerPage.prototype.svgLoaded = function (svg) {
        this.svgContent = this._sanitizer.bypassSecurityTrustHtml(svg);
        this.listenSVG();
        this.loadingComponent = "audio";
    };
    /**
     * @name playerInitialized
     * @description the player has been initialized
     * @override
     */
    TrainerPage.prototype.playerInitialized = function () {
        var bpm = this.player.getTempo();
        if (this.composition.originalTempo && this.composition.originalTempo != 0) {
            bpm = this.composition.currentTempo;
        }
        else {
            this.composition.originalTempo = bpm;
            this.composition.currentTempo = bpm;
            this.dao.updateComposition(this.composition);
        }
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
        //----------------------------------------
        this.knob.writeValue(bpm);
        this.loadingComponent = "";
        //this.loader.dismiss();
        this.flagRendering = false;
    };
    /**
     * @name endOfSong
     * @description the player has finished
     * @override
     */
    TrainerPage.prototype.endOfSong = function () {
        this.stop();
    };
    /**
     * @name endOfSong
     * @description the player indicates that a new part is starting now
     * @override
     */
    TrainerPage.prototype.endOfPartSong = function () {
        this.pause();
    };
    /**
      * @name setTempo
      * @description set the tempo of the midi loaded
      * @param {number} bpm beats per minute
      */
    TrainerPage.prototype.setTempo = function (bpm) {
        this.tempo = bpm;
        //----------------------------------------
        //don't know why this is needed in android
        this.appref.tick();
        //----------------------------------------
        this.composition.currentTempo = bpm;
        this.player.setTempo(bpm);
    };
    /**
     * @name play
     * @description play or resume the music
     */
    TrainerPage.prototype.play = function () {
        var _this = this;
        if (this.state == this.STATE_PAUSED) {
            this.resume();
        }
        else if (this.state == this.STATE_STOP) {
            this.state = this.STATE_PLAYING;
            this.showPrepare().then(function () {
                _this.player.play();
            });
        }
    };
    /**
     * @name pause
     * @description pause the music
     */
    TrainerPage.prototype.pause = function () {
        if (this.state == this.STATE_PLAYING) {
            this.state = this.STATE_PAUSED;
            this.player.pause();
        }
    };
    /**
     * @name stop
     * @description stop the music
     */
    TrainerPage.prototype.stop = function () {
        if (this.state == this.STATE_PAUSED || this.state == this.STATE_PLAYING) {
            this.state = this.STATE_STOP;
            this.player.stop();
            //seems necesary in android
            this.appref.tick();
        }
    };
    /**
     * @name resume
     * @description resume the music
     */
    TrainerPage.prototype.resume = function () {
        var _this = this;
        this.state = this.STATE_PLAYING;
        this.showPrepare().then(function () {
            _this.player.resume();
        });
    };
    TrainerPage.prototype.onKnobClick = function () {
        this.tempoIsVisible = true;
    };
    /**
     * @name showPrepare
     * @description show the prepare screen, before starting the music
     * @return {Promise<void>} resolve when all the preparation has been finished
     */
    TrainerPage.prototype.showPrepare = function () {
        var _this = this;
        this.player.prepare();
        return new Promise(function (resolve) {
            var numerator = _this.player.getMeterSignatureNumerator();
            while (numerator > 4) {
                numerator = numerator / 2;
            }
            var bpm = _this.player.getTempo(); //bpm
            var time = 60000 / bpm;
            _this.prepare = 0;
            _this.dao.getSettings().then(function (settings) {
                var double = settings.playerSettings.doublePreparation;
                var cycle = 0;
                var show = function () {
                    this.prepare++;
                    if (this.state != this.STATE_PLAYING) {
                        this.prepare = -1;
                        return;
                    }
                    if (this.prepare > numerator && double && cycle < 1) {
                        cycle++;
                        this.prepare = 1;
                        this.player.playMetronome(true);
                        setTimeout(show.bind(this), time);
                    }
                    else if (this.prepare <= numerator) {
                        this.player.playMetronome(true);
                        setTimeout(show.bind(this), time);
                    }
                    else {
                        this.prepare = -1;
                        resolve();
                    }
                };
                setTimeout(show.bind(_this), 1000);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myknob1'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ng2_knob__["KnobComponent"])
    ], TrainerPage.prototype, "knob", void 0);
    TrainerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/trainer/trainer.component.html"*/'<div id="overlay" *ngIf="loadingComponent.length>0">\n    <div id="loading">\n        {{\'TRAINER-WAIT\' | translate}} {{loadingComponent}}\n        <div id="patient">{{\'TRAINER-WAIT-DETAIL\' | translate}}</div>\n    </div>\n\n</div>\n<div *ngIf="prepare>-1" id="prepare">\n    <span class="text" *ngIf="prepare==0">{{\'TRAINER-PREPARE\' | translate}}</span>\n    <span class="number" *ngIf="prepare>0">{{prepare}}</span>\n</div>\n\n<ion-header>\n    <ion-navbar color="dark">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <div class="container-knob" (click)="onKnobClick()">\n            <knob class="skin1" #myknob1  [min]="20" [max]="300" [value]="60" [startDegree]="5" [intensive]="true" [endDegree]="355" (change)="setTempo($event)"></knob>\n            <div class="info">{{tempo}} bpm</div>\n        </div>\n\n        <ion-buttons end>\n            <button *ngIf="state==STATE_STOP || state==STATE_PAUSED" ion-button (click)="play();">\n                <ion-icon name="ios-play"></ion-icon>\n            </button>\n            <button *ngIf="state==STATE_PLAYING" ion-button (click)="pause();">\n                <ion-icon name="ios-pause"></ion-icon>\n            </button>\n            <button *ngIf="state==STATE_PLAYING || state==STATE_PAUSED" ion-button (click)="stop();">\n                <ion-icon name="ios-square" color="danger"></ion-icon>\n            </button>\n        </ion-buttons>\n\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding>\n    <div id="svg" [innerHTML]="svgContent"></div>\n</ion-content>\n\n<tempo *ngIf="tempoIsVisible" (save)="tempoIsVisible=false;setTempo($event);knob.writeValue($event);" (cancel)="tempoIsVisible=false"></tempo>\n'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/trainer/trainer.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__player_musicxmlplayer__["a" /* MusicXMLPlayer */], __WEBPACK_IMPORTED_MODULE_3__player_player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__["a" /* Insomnia */]]
        })
        /**
         * @class
         * @name PlayerPage
         * @description Page to play a backing track
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__["a" /* Insomnia */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__player_musicxmlplayer__["a" /* MusicXMLPlayer */], __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_7__dao_dao__["a" /* DAO */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["c" /* TranslateService */]])
    ], TrainerPage);
    return TrainerPage;
}());

//# sourceMappingURL=trainer.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SortPage = /** @class */ (function () {
    function SortPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sortby = SortPage_1.SORT_BY_NAME;
        this.sortby = this.navParams.get("data");
    }
    SortPage_1 = SortPage;
    SortPage.prototype.close = function () {
        this.viewCtrl.dismiss(this.sortby);
    };
    SortPage.prototype.sort = function (sortBy) {
        this.sortby = sortBy;
        this.close();
    };
    /**
     * @name sort
     * @description sort an array of compositions by a given criteria
     * @param {string} by the criteria,  @see SORT_BY_NAME and SORT_BY_AUTHOR
     * @param {Composition[]} compositions the list to sort
     * @result {Composition[]} the array sorted
     */
    SortPage.sort = function (by, compositions) {
        return compositions.sort(function (a, b) {
            //default case sort by composition name
            var a1field = a.name;
            var b1field = b.name;
            var a2field = a.author;
            var b2field = b.author;
            //case sort by author
            if (by == SortPage_1.SORT_BY_AUTHOR) {
                a1field = a.author;
                b1field = b.author;
                a2field = a.name;
                b2field = b.name;
            }
            //case sort by level
            if (by == SortPage_1.SORT_BY_LEVEL) {
                a1field = a.level;
                b1field = b.level;
                a2field = a.name;
                b2field = b.name;
            }
            if (a1field === b1field) {
                if (a2field == b2field) {
                    if (a.level == b.level) {
                        if (a.frontInstrument.name == b.frontInstrument.name)
                            return 0;
                        if (a.frontInstrument.name < b.frontInstrument.name)
                            return -1;
                        if (a.frontInstrument.name > b.frontInstrument.name)
                            return 1;
                    }
                    else {
                        if (a.level < b.level)
                            return -1;
                        if (a.level > b.level)
                            return 1;
                    }
                }
                else {
                    if (a2field < b2field)
                        return -1;
                    if (a2field > b2field)
                        return 1;
                }
            }
            else {
                if (a1field < b1field)
                    return -1;
                if (a1field > b1field)
                    return 1;
            }
            return 1;
        });
    };
    SortPage.SORT_BY_NAME = "NAME";
    SortPage.SORT_BY_AUTHOR = "AUTHOR";
    SortPage.SORT_BY_LEVEL = "LEVEL";
    SortPage = SortPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/sort/sort.component.html"*/'<ion-list radio-group>\n  <ion-list-header>{{\'SORT-TITLE\' | translate}}</ion-list-header>\n\n  <!--\n  <ion-item>\n    <ion-label>By Most Played</ion-label>\n    <ion-radio [checked]="sortby==\'MostPlayed\'" (click)="sort(\'MOSTPLAYED\')"></ion-radio>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>By Less Played</ion-label>\n    <ion-radio [checked]="sortby==\'MostPlayed\'" (click)="sort(\'MOSTPLAYED\')"></ion-radio>\n  </ion-item>\n  -->\n  <ion-item>\n    <ion-label>{{\'SORT-BYNAME\' | translate}}</ion-label>\n    <ion-radio [checked]="sortby==\'NAME\'" (click)="sort(\'NAME\')"></ion-radio>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>{{\'SORT-BYAUTHOR\' | translate}}</ion-label>\n    <ion-radio [checked]="sortby==\'AUTHOR\'" (click)="sort(\'AUTHOR\')"></ion-radio>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>{{\'SORT-BYLEVEL\' | translate}}</ion-label>\n    <ion-radio [checked]="sortby==\'LEVEL\'" (click)="sort(\'LEVEL\')"></ion-radio>\n  </ion-item>\n</ion-list>'/*ion-inline-end:"/home/spheras/jasdata/desarrollo/projects/backingtrainer/master/src/pages/main/sort/sort.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], SortPage);
    return SortPage;
    var SortPage_1;
}());

//# sourceMappingURL=sort.component.js.map

/***/ })

},[374]);
//# sourceMappingURL=main.js.map