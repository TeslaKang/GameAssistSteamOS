#!/bin/bash
set -euo pipefail
REL_DIR=$(cd -- "$(dirname -- "$0")" && pwd)
if command -v ryzenadj >/dev/null 2>&1; then
 exec ryzenadj "$@"
else
 exec "$REL_DIR/ryzenadj" "$@"
fi
