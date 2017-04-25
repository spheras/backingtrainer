import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';
import { ModalController } from 'ionic-angular';

import { MainPage } from '../pages/main/main.component';
import { TunerPage } from '../pages/tuner/tuner.component';
import { DAO } from '../dao/dao';
import { Settings } from '../dao/settings';

@Component({
  templateUrl: 'app.component.html',
  providers: [DAO]
})

/**
 * @class
 * @name MyApp
 * @description Application Class to start everything
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  settings: Settings = new Settings();

  /**
   * To set the root page
   */
  rootPage: any = MainPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuCtrl: MenuController,
    private translate: TranslateService, private dao: DAO, private modalCtrl: ModalController) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.initializeApp();
  }



  /**
   * @name initializeApp
   * @description initialize the application
   */
  private initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.dao.getSettings().then((settings) => {
      this.settings = settings;
      this.dao.observeSettings().subscribe((settings) => {
        this.settings = settings;
      });
    });
    this.initializeLocale();
  }

  private initializeLocale() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    this.translate.setDefaultLang('en');
    this.translate.use(userLang);
  }

  /**
   * @name settingAnimation
   * @description set the animation cursor property
   * @param {boolean} value the value to set
   */
  settingAnimation(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.cursorAnimation = value;
      settings.playerSettings.cursorAnimation = value;
      this.dao.setSettings(settings);
    });
  }


  /**
   * @name settingCursor
   * @description set the cursor property
   * @param {boolean} value the value to set
   */
  settingCursor(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.cursor = value;
      settings.playerSettings.cursor = value;
      this.dao.setSettings(settings);
    });
  }

  /**
   * @name settingPlaySoloist
   * @description set the playSoloist property
   * @param {boolean} value the value to set
   */
  settingPlaySoloist(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.playSoloist = value;
      settings.playerSettings.playSoloist = value;
      this.dao.setSettings(settings);
    });
  }


  /**
   * @name settingPlayBack
   * @description set the playBack property
   * @param {boolean} value the value to set
   */
  settingPlayBack(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.playBack = value;
      settings.playerSettings.playBack = value;
      this.dao.setSettings(settings);
    });
  }

  /**
   * @name tune
   * @description show the tune page
   */
  tune() {
    this.menuCtrl.close();
    this.modalCtrl.create(TunerPage).present();
  }

  /**
   * @name settingDoublePreparation
   * @description set the double preparation property
   * @param {boolean} value the value to set
   */
  settingDoublePreparation(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.doublePreparation = value;
      settings.playerSettings.doublePreparation = value;
      this.dao.setSettings(settings);
    });
  }

  /**
   * @name settingMetronome
   * @description set the metrnome property
   * @param {boolean} value the value to set
   */
  settingMetronome(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.metronome = value;
      settings.playerSettings.metronome = value;
      this.dao.setSettings(settings);
    });
  }

  

}
