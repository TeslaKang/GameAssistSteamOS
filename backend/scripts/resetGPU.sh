#!/bin/bash

set -eu

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
FILE=$CONFIG_DIR/gpu.txt
if [ -f $FILE ]; then
    rm $FILE
fi

REL_DIR=$(cd -- "$(dirname -- "$0")" && pwd)
bash "$REL_DIR/cmdGPU.sh" power_dpm_force_performance_level auto

