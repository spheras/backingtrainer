import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

import { MainPage } from '../pages/main/main.component';
import { TrainerPage } from '../pages/trainer/trainer.component';

@Component({
  templateUrl: 'app.component.html'
})

/**
 * @class
 * @name MyApp
 * @description Application Class to start everything
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**
   * To set the root page
   */
  rootPage: any = MainPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private translate: TranslateService, private alertCtrl: AlertController) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.initializeApp();
  }

  /**
   * @name initializeApp
   * @description initialize the application
   */
  private initializeApp() {
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
   * @name openMain
   * @description Open the Main Screen
   */
  openMain() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(MainPage);
  }

  /**
   * @name openSettings
   * @description Open the Settings Screen
   */
  openSettings() {
    let alert = this.alertCtrl.create({
      title: 'TODO!',
      subTitle: 'This section is pending!',
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * @name openTunner
   * @description open the Tunner Screen
   */
  openTunner() {
    let alert = this.alertCtrl.create({
      title: 'TODO!',
      subTitle: 'This section is pending!',
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * @name openTrainer
   * @description open the Trainer Screen
   */
  openTrainer() {
    this.nav.setRoot(TrainerPage);
  }


}
