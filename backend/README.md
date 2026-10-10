# Standalone GameAssist backend

Sources copied from `../gamescope-session`; MIT license: LICENSE.
The original session installer is not used. Steam and OS session files are
not replaced, and deployment requires no writes to /usr.

On the target Linux x86-64 device, install g++, build the frontend, then run
`bash depoly.sh` as the gaming user (or set DECKY_USER when running as root).
Decky must already be installed. Native binaries must be built on Linux.

Discovery selects AMD hwmon power caps, Intel RAPL, or RyzenAdj for TDP.
Detected interfaces are candidates, not proof of device support. RyzenAdj
can reject unsupported CPUs. GPU controls require AMD overdrive; CPU and
governor controls require cpupower. SMT and boost require their sysfs files.
Fan controls require a recognized model and successful native I/O access.
HandyGCCS is optional; custom commands and settings are preserved.

Do not run another fan/TDP controller simultaneously. OS controllers can
overwrite values; their ownership must be checked on the actual device.
Active HHD disables GameAssist TDP and fan controls; jupiter-fan-control
disables GameAssist fan controls. Other controllers require manual checks.
Optional resume services can be installed from the deployed backend with
`sudo env DECKY_USER="$USER" python3 backend/install-services.py` (run from
the deployed plugin directory). Install only after testing manual controls.

Smoke test each OS: plugin loads; unsupported controls disappear; custom
commands work; CPU settings change; measured TDP/GPU limits change; fan
control switches back to automatic on disable/unload; profiles and suspend
resume work. Frontend API compatibility must also be checked on the device.
