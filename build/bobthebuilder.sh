#!/bin/bash
sass ../main.scss matdark.css;
cp ./matdark.js ./matdark.js;
sass ../matlight.scss matlight.css;
./invert-css matlight.css matlight.css;
