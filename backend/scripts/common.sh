#!/bin/bash
set -euo pipefail
CONFIG_DIR="${GAMEASSIST_CONFIG_DIR:?GameAssist configuration directory is required}"
mkdir -p "$CONFIG_DIR"
[[ $EUID -eq 0 ]] || { echo 'Run hardware controls through the root Decky backend.' >&2; exit 1; }
