#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

FILE="${GAMEASSIST_CONFIG_DIR:?}/handygccs.conf"
if [ -f $FILE ]; then
    mv $FILE "/etc/handygccs/handygccs.conf"
    systemctl restart handycon 
fi
