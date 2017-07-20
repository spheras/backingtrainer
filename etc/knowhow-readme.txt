
create platforms:
·················
ionic platform add browser
ionic platform add android

add plugins:
···········
ionic plugin add https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin.git
ionic plugin add cordova-plugin-crosswalk-webview

debug browser:
·············
ionic serve (after loading web from: localhost:8100)
ionic serve --lab   (after loading web from: localhost:8100/ionic-lab)

debug electron:
··············
npm run electron

compile electron:
················
npm run electron-dist-linux-x64

compile browser:
···············
ionic build browser --prod --release

compile android:
···············
  1. make sure your path is setting the jdk bin folder (or add it)
          export PATH=$PATH:/whateverfolderisyourJDK/bin
  2. make sure your android home is setting the nadroid-sdk folder (or add it)
          export ANDROID_HOME=/whateverfolderisyourAndroid-sdk

ionic build android --prod --release

  3. if you get an error like this:
Error: Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /whateverfolderisyourAndroiSDKFolder/tools/templates/gradle/wrapper
    we need to wait a cordova bugfix for this and recent android sdk versions.. until then I've copied an old sdk 'templates' folder onto the new tools folder

the unsigned apk will be at the /platforms/android/build/outputs/apk/ folder

deploy & debug in android:
·························
ionic run android


problem running in android
··························
try both:
1. ionic hooks add
2. sudo chmod -R 755 folder_to_android-sdk/


list connected devices
······················
adb devices

compiling a new version:
·························
Just to be sure remove everything first:
- remove the www folder
- remove the folders inside the platforms folder (don't remove the platform.json)
- add the platforms again: 
ionic platform add android
ionic platform add browser

and start compiling everything, first generate the base ionic www folder
ionic serve
after compile the browser
ionic build browser --prod --release
and everything you need
ionic build android --prod --release
ionic run electron-dist-all

creating gh-pages
·················
1st, compile the browserp platform (see compiling a new version if necessary)
2nd, copy the platforms/browser/www/  folder
3rd, remove the current gh-pages branch locally (except the screen file, which is a png image) and replace it by the new content compiled
     Attention: the config.xml is a modified one, if you delete it you must replace this line
     <preference name="FadeSplashScreenDuration" value="30000" /> 
     by something better
    <preference name="FadeSplashScreenDuration" value="300" />

4th, modify the cordova.js file replacing the line
        xhr.open("get", "/config.xml", true);
        by
        xhr.open("get", "config.xml", true);
        (removing the /)

and push it...