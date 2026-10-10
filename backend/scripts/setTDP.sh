#!/bin/bash
set -euo pipefail
REL_DIR=$(cd -- "$(dirname -- "$0")" && pwd)
source "$REL_DIR/common.sh"
[[ ${1:-} =~ ^[0-9]+([.][0-9]+)?$ ]] || exit 1
# Reject implausible values before any write. Device-specific limits still apply.
awk -v watts="$1" 'BEGIN { exit !(watts >= 3 && watts <= 100) }' || exit 1
mw=$(awk -v watts="$1" 'BEGIN { printf "%.0f", watts * 1000 }')
uw=$(awk -v watts="$1" 'BEGIN { printf "%.0f", watts * 1000000 }')
case "${GAMEASSIST_TDP_BACKEND:-}" in
 amdgpu-hwmon)
  found=0
  for cap in /sys/class/drm/card*/device/hwmon/hwmon*/power1_cap; do
   [[ -f "$cap" ]] || continue
   base=${cap%_cap}
   [[ ! -f "${base}_cap_min" || $uw -ge $(cat "${base}_cap_min") ]] || exit 1
   [[ ! -f "${base}_cap_max" || $uw -le $(cat "${base}_cap_max") ]] || exit 1
   printf '%s\n' "$uw" > "$cap"
   found=1
   break
  done
  [[ $found == 1 ]] ;;
 intel-rapl)
  for limit in /sys/class/powercap/intel-rapl/intel-rapl:0/constraint_{0,1}_power_limit_uw; do
   printf '%s\n' "$uw" > "$limit"
  done ;;
 ryzenadj) bash "$REL_DIR/ryzenadj-run.sh" --stapm-limit="$mw" --fast-limit="$mw" --slow-limit="$mw" ;;
 *) echo 'No supported TDP backend detected.' >&2; exit 1 ;;
esac
if [[ ${2:-} != --no-config ]]; then
 printf '%s\n' "$1" > "$CONFIG_DIR/tdp.txt"
fi
