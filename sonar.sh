#!/bin/bash

docker volume create --name sonarqube_data
docker volume create --name sonarqube_logs
docker volume create --name sonarqube_extensions
docker run --name sonarqube-custom -p 9000:9000 sonarqube:10.6-community