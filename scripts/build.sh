# /bin/bash

cp ./src/configs/config-prod.js ./src/configs/config.js

react-scripts build

cp ./build/index.html ./build/404.html
