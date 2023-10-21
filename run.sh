#!/bin/bash
git pull
docker build -t 4betterwork/4bw-frontend .
docker stop 4bw-frontend
docker rm 4bw-frontend
docker run --name 4bw-frontend --net sklnet -p 8085:80 --restart always -d 4betterwork/4bw-frontend