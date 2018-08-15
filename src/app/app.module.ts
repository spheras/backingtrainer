import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MainPage } from '../pages/main/main.component';
import { SearchPage } from '../pages/main/search/search.component';
import { DownloadedPage } from '../pages/main/downloaded/downloaded.component';
import { RecentPage } from '../pages/main/recent/recent.component';
import { InfoPage } from '../pages/main/info/info.component';
import { TunerPage } from '../pages/tuner/tuner.component';
import { TrainerPage } from '../pages/trainer/trainer.component';
import { CreditsPage } from '../pages/credits/credits.component';
import { DownloadsPage } from '../pages/downloads/downloads.component';
import { TempoPage } from '../pages/tempo/tempo.component';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { KnobModule } from 'ng2-knob';
import { SortPage } from '../pages/main/sort/sort.component';

@NgModule({

  declarations: [
    MyApp,
    MainPage,
    TrainerPage,
    TunerPage,
    InfoPage,
    CreditsPage,
    DownloadsPage,
    SearchPage, DownloadedPage, RecentPage,
    TempoPage,
    SortPage
  ],

  imports: [
    KnobModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    MainPage,
    TrainerPage,
    InfoPage,
    TunerPage,
    CreditsPage,
    DownloadsPage,
    SearchPage, DownloadedPage, RecentPage,
    TempoPage,
    SortPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],

})

export class AppModule { }
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
