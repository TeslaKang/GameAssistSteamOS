#!/bin/bash

set -eu

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
FILE=$CONFIG_DIR/cpu.txt
if [ -f $FILE ]; then
    rm $FILE
fi
