#!/bin/bash

stop_container() {
    name=$1
    if [[ $(docker ps -a | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker container $name does not exists: skipping container stop step."
    elif [[ $(docker ps | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker container $name is already stopped: skipping containe stop step."
    else
        echo -e "\nStopping Docker container $name..."
        echo -e "docker stop $name"
        docker stop $name
    fi
}

remove_container() {
    name=$1
    if [[ $(docker ps -a | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker container $name does not exists: skipping cointainer remove step"
    elif [[ $(docker ps | grep $name | wc -l ) -gt 0 ]]; then
        echo -e "\nDocker container $name is not stopped: aborting script execution"
        exit
    else
        echo -e "\nRemoving Docker container $name..."
        echo -e "docker rm $name"
        docker rm $name
    fi
}

remove_image() {
    name=$1
    if [[ $(docker image ls | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker image $name does not exists: skipping image remove step."
    else
        echo -e "\nRemoving Docker image $name..."
        echo -e "docker image rm $name"
        docker image rm $name
    fi
}

echo -e  "\n\n#######################################"
echo -e  "Stop API docker container"
echo -e  "#######################################"

stop_container "products-api"
remove_container "products-api"
remove_image "products-api"

echo -e  "\n\nDone!"
