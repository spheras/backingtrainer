cd ..
ionic cordova platform add android
ionic cordova platform add browser
ionic cordova build browser --prod --release
ionic cordova build android --prod --release
npm run electron-dist-all

