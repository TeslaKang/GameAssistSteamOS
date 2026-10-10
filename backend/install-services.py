"""Optional Linux system services, with installation paths rendered explicitly."""
import os
import pathlib
import subprocess
from runtime import ROOT, SCRIPTS, user_home, detect

if os.geteuid() != 0:
    raise SystemExit('Run with sudo and DECKY_USER set to the gaming user.')
user, home = user_home()
if user == 'root':
    raise SystemExit('Set DECKY_USER to the gaming user.')
config = pathlib.Path(home) / '.config' / 'GameAssist'
if any(c.isspace() or c in '%"' for c in str(config) + str(SCRIPTS)):
    raise SystemExit('Service installation requires paths without whitespace, quotes or %.')
units = []
for template in (ROOT / 'services').glob('*.service'):
    content = template.read_text().replace('@SCRIPTS@', str(SCRIPTS)).replace('@CONFIG@', str(config)).replace('@TDP@', detect()['tdp'])
    (pathlib.Path('/etc/systemd/system') / template.name).write_text(content)
    units.append(template.name)
subprocess.run(['systemctl', 'daemon-reload'], check=True)
subprocess.run(['systemctl', 'enable', *units], check=True)
