#!/bin/zsh

docker rmi -f hocgin/antd-starter:0.0.2
docker build . -t hocgin/antd-starter:0.0.2

docker rm test
docker run -it \
 -p 7001:7001 \
 --name test \
 hocgin/antd-starter:0.0.2



