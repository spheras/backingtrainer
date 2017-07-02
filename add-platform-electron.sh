#!/bin/bash
#this script is intended to create and prepare the correct electron source folder

#creating the folders
rm -rf ./platforms/electron
mkdir -p ./platforms/electron
mkdir -p ./platforms/electron/src
#mkdir -p ./platforms/electron/dist
#copying package dependencies
cp ./package-electron.json ./platforms/electron/src/package.json
#copying electron starter
cp ./electron.js ./platforms/electron/src
#copying the browser distribution files
cp -r ./platforms/browser/www ./platforms/electron/src
#replacing /config.xml by config.xml to avoid root search
sed -i 's|/config.xml|config.xml|g' ./platforms/electron/src/www/cordova.js
