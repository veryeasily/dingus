#!/bin/bash

docker stop dingus
docker rm dingus
docker build . -t dingus:latest -t dingus:1.0.0
docker run --name dingus --init -v $(pwd):/app/dingus -p 9222:9222 -p 80:3000 -d dingus
docker logs -f dingus
