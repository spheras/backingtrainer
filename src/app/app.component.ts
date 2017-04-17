import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

import { MainPage } from '../pages/main/main.component';
import { TrainerPage } from '../pages/trainer/trainer.component';
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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private translate: TranslateService, private alertCtrl: AlertController, private dao: DAO) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.initializeApp();
  }



  /**
   * @name initializeApp
   * @description initialize the application
   */
  private initializeApp() {
    this.dao.getSettings().then((settings) => {
      this.settings = settings;
      this.dao.observeSettings().subscribe((settings) => {
        this.settings = settings;
      });
    });
    this.initializeLocale();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
   * @name settingSoundQuality
   * @description set the soundquality property
   * @param {boolean} value the value to set
   */
  settingSoundQuality(value: boolean) {
    this.dao.getSettings().then((settings) => {
      this.settings.playerSettings.highQualitySound = value;
      settings.playerSettings.highQualitySound = value;
      this.dao.setSettings(settings);
    });
  }



}
