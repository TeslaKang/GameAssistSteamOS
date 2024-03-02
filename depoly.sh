#!/bin/bash

set -eu

if [[ $EUID -ne 0 ]];
then
    sudo "$0" "$@"
    exit 0
fi

mkdir -p /home/deck/homebrew
mkdir -p /home/deck/homebrew/plugins
mkdir -p /home/deck/homebrew/plugins/GameAssist

cp main.py /home/deck/homebrew/plugins/GameAssist/
cp plugin.json /home/deck/homebrew/plugins/GameAssist/
cp package.json /home/deck/homebrew/plugins/GameAssist/
cp LICENSE /home/deck/homebrew/plugins/GameAssist/
cp README.md /home/deck/homebrew/plugins/GameAssist/
cp dist /home/deck/homebrew/plugins/GameAssist/ -rf
