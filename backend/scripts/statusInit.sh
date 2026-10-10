#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

REL_DIR=$(cd -- "$(dirname -- "$0")" && pwd)
if [ $# -ge 1 ]; then
    "$REL_DIR/GameAssist" "$1"
else
    "$REL_DIR/GameAssist"
fi

CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
FILE=$CONFIG_DIR/tdp.txt
if [ -f $FILE ]; then
    TDP=$(cat $FILE)
    c=$(echo "$TDP < 15" | bc)
    if [ $c == '1' ]; then
        bash "$REL_DIR/setTDP.sh" 15 --no-config
    fi
fi
