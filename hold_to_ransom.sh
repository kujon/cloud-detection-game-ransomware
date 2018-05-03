#!/bin/bash

FILE_PATH_TO_ENCRYPT=./dummy_directory/

java -jar ./JavaRansomware/JavaRansomware-2.1-jar-with-dependencies.jar $FILE_PATH_TO_ENCRYPT Encrypt

./start_cloud_game.sh

java -jar ./JavaRansomware/JavaRansomware-2.1-jar-with-dependencies.jar $FILE_PATH_TO_ENCRYPT Decrypt
