"""Restore only supported saved settings after resume."""
import os
import pathlib
import subprocess
from runtime import detect, supported, SCRIPTS

def restore():
    caps = detect()
    env = os.environ.copy()
    env['GAMEASSIST_TDP_BACKEND'] = caps['tdp']
    config = pathlib.Path(env['GAMEASSIST_CONFIG_DIR'])
    for key, name in [('policy', 'POLICY'), ('cpu', 'CPU'), ('gpu', 'GPU'),
                      ('smt', 'SMT'), ('boost', 'BOOST'), ('tdp', 'TDP')]:
        file = config / (key + '.txt')
        script = 'set' + name + '.sh'
        if file.exists() and supported(script, caps):
            value = file.read_text().strip()
            valid = value in ('on', 'off') if key == 'smt' else value.replace('.', '', 1).isdigit()
            if valid:
                subprocess.run(['bash', str(SCRIPTS / script), value], env=env, check=False)

if __name__ == '__main__':
    restore()
