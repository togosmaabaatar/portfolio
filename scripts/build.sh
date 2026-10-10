#!/bin/sh
set -eu
mkdir -p dist/assets
cp index.html style.css script.js dist/
cp assets/portrait-v2.jpg assets/camp.jpg assets/construction.png assets/favicon.svg assets/logo.svg assets/logo-mark.svg assets/logo-wordmark.svg assets/togosmaa-forest.jpg assets/togosmaa-mountains.jpg assets/togosmaa-city.jpg dist/assets/
