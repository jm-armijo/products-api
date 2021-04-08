#!/bin/bash

build_image() {
    name=$1
    if [[ $(docker image ls | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker image $name does not exists: building..."
        echo -e "docker build -t $name ."
        docker build -t $name .
    else
        echo -e "\nDocker image $name already exists: skipping image build step."
    fi
}

run_container() {
    name=$1
    port=$2
    if [[ $(docker ps -a | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker container $name does not exists: creating and starting..."
        echo -e "docker run --name $name -d --network=products-network -p $port:$port --env-file ./env.list $name"
        docker run --name $name -d --network=products-network -p $port:$port --env-file ./env.list $name
    elif [[ $(docker ps | grep $name | wc -l ) = 0 ]]; then
        echo -e "\nDocker container $name is stopped: starting..."
        echo -e "docker start $name"
        docker start $name
    else
        echo -e "\nDocker container $name is already running: skipping image run step."
    fi
}



echo -e  "#######################################"
echo -e  "Create network for docker containers"
echo -e  "#######################################"


if [[ $(docker network ls | grep products-network | wc -l) = 0 ]]; then
    echo -e "\nDocker network products-network does not exist: creating..."
    echo -e "docker network create products-network"
    docker network create products-network
else
    echo -e "\nNetwork products-network already exists: skipping network creation step"
fi



echo -e  "\n\n#######################################"
echo -e  "Create and run DB docker image"
echo -e  "#######################################"

cd db
build_image "products-db"
run_container "products-db" "27017"

echo -e  "\n\n#######################################"
echo -e  "Create and run API docker image"
echo -e  "#######################################"

cd ../api
build_image "products-api"
run_container "products-api" "5000"

echo -e  "\n\nDone!"
