#!/bin/bash

set -eu

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

if [ $# -ge 1 ]; then

	VENDOR=$(cat /proc/cpuinfo | grep 'vendor' | uniq)
	AMD='AMD'
	INTEL='Intel'

	CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
	if [ ! -d $CONFIG_DIR ]; then
		mkdir -p "$CONFIG_DIR"
	fi

	echo $1 > $CONFIG_DIR/gpu.txt

	REL_DIR=$(cd -- "$(dirname -- "$0")" && pwd)
	if [[ "$VENDOR" == *"$AMD"* ]]; then
		bash "$REL_DIR/cmdGPU.sh" power_dpm_force_performance_level manual
		bash "$REL_DIR/cmdGPU.sh" pp_od_clk_voltage s 0 $1
		bash "$REL_DIR/cmdGPU.sh" pp_od_clk_voltage s 1 $1
		bash "$REL_DIR/cmdGPU.sh" pp_od_clk_voltage c
	elif [[ "$VENDOR" == *"$INTEL"* ]]; then
		:
	fi
	
fi
