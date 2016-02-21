#!/bin/bash
./ffmpeg -s 640x480 -f video4linux2 -i /dev/video1 -f mpeg1video -b 800k -r 30 http://52.37.12.182:8082/admin/640/480