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

	echo $1 > $CONFIG_DIR/boost.txt

	echo $1 > /sys/devices/system/cpu/cpufreq/boost
	
fi
