#!/bin/bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
[[ $(uname -s) == Linux ]] || { echo 'Build on Linux for the target device.' >&2; exit 1; }
g++ -std=c++11 -O2 -o scripts/GameAssist GameAssist.cpp
g++ -std=c++11 -O2 -shared -fPIC -o scripts/GameAssist.so GameAssist.cpp
chmod +x scripts/ryzenadj
