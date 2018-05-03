#!/bin/bash

FILE_PATH_TO_ENCRYPT=./dummy_directory/

git clone git@github.com:PanagiotisDrakatos/JavaRansomware.git

java -jar JavaRansomware.jar $FILE_PATH_TO_ENCRYPT Encrypt

./start_cloud_game.sh

java -jar JavaRansomware.jar $FILE_PATH_TO_ENCRYPT Decrypt
