#!/bin/bash

set -eu

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

if [ $# -ge 1 ]; then

	CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
	if [ ! -d $CONFIG_DIR ]; then
		mkdir -p "$CONFIG_DIR"
	fi

	echo $1 > $CONFIG_DIR/policy.txt

	if [[ "$1" == "0" ]]; then
		cpupower frequency-set -g powersave
	elif [[ "$1" == "1" ]]; then
		cpupower frequency-set -g ondemand
	elif [[ "$1" == "2" ]]; then
		cpupower frequency-set -g performance
	fi

fi
