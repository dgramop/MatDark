#!/bin/bash
scss main.scss build/matdark.css;
cp ./matdark.js ./build/matdark.js;
scss matlight.scss build/matlight.css;
./build/css-invert build/matlight.css build/matlight.css;
