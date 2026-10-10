#!/bin/bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
target_user=${DECKY_USER:-${SUDO_USER:-${USER:-}}}
[[ -n "$target_user" && "$target_user" != root ]] || { echo 'Set DECKY_USER to the gaming session user.' >&2; exit 1; }
target_home=$(getent passwd "$target_user" | cut -d: -f6)
[[ -n "$target_home" && -d "$target_home" ]] || exit 1
bash backend/build.sh
destination="$target_home/homebrew/plugins/GameAssist"
if [[ $EUID -ne 0 ]]; then
 exec sudo env DECKY_USER="$target_user" bash "$0"
fi
mkdir -p "$destination"
cp main.py plugin.json package.json LICENSE README.md "$destination/"
cp -R dist backend "$destination/"
chmod +x "$destination/backend/scripts/ryzenadj" "$destination/backend/scripts/GameAssist"
echo "Installed in $destination. Reload Game Assist in Decky Loader."
