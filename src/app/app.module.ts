import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main.component';
import { SearchPage } from '../pages/main/search/search.component';
import { DownloadedPage } from '../pages/main/downloaded/downloaded.component';
import { RecentPage } from '../pages/main/recent/recent.component';
import { TrainerPage } from '../pages/trainer/trainer.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({

  declarations: [
    MyApp,
    MainPage,
    TrainerPage,
    SearchPage, DownloadedPage, RecentPage
  ],

  imports: [
    IonicModule.forRoot(MyApp),
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
    SearchPage, DownloadedPage, RecentPage
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
