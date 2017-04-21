
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
ionic serve

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
ionic build android --prod --release

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
