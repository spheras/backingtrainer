cd ..
ionic platform add android
ionic platform add browser
ionic build browser --prod --release
ionic build android --prod --release
npm run electron-dist-all

