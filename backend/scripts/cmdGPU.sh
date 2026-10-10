#!/bin/bash

set -eu

# Only expose the GPU controls used by GameAssist. Never accept a path.
if [[ $# -lt 2 ]]; then
    echo "Usage: cmdGPU.sh <GPU attribute> <value...>" >&2
    exit 1
fi
case "$1" in
    power_dpm_force_performance_level)
        [[ $# -eq 2 && ( "$2" == auto || "$2" == manual ) ]] || exit 1
        ;;
    pp_od_clk_voltage)
        if [[ $# -eq 2 && "$2" == c ]]; then
            :
        elif [[ $# -eq 4 && "$2" == s && ( "$3" == 0 || "$3" == 1 ) && "$4" =~ ^[0-9]+$ ]]; then
            :
        else
            exit 1
        fi
        ;;
    *)
        echo "Unsupported GPU attribute: $1" >&2
        exit 1
        ;;
esac

if [[ $EUID -ne 0 ]]; then
    exec pkexec --disable-internal-agent "$0" "$@"
fi

attribute=$1
shift
for device in /sys/class/drm/card*/device; do
    if [[ -e "$device/$attribute" && $(cat "$device/vendor" 2>/dev/null) == 0x1002 ]]; then
        printf '%s\n' "$*" > "$device/$attribute"
        exit 0
    fi
done
echo "GPU attribute not found: $attribute" >&2
exit 1

