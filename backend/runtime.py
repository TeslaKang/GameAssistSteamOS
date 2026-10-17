"""Read-only host discovery; no hardware writes during feature detection."""
import os
import pathlib
import pwd
import re
import shlex
import shutil
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
SCRIPTS = ROOT / "scripts"

def user_home():
    for key in ("DECKY_USER", "SUDO_USER", "USER"):
        name = os.environ.get(key)
        if name and name != "root":
            try:
                account = pwd.getpwnam(name)
                return account.pw_name, account.pw_dir
            except KeyError:
                pass
    # Decky installs plugins below the user's homebrew directory.
    for parent in ROOT.parents:
        if parent.name == "homebrew":
            home = str(parent.parent)
            for account in pwd.getpwall():
                if account.pw_dir == home:
                    return account.pw_name, home
    account = pwd.getpwuid(os.getuid())
    return account.pw_name, account.pw_dir

def read(path):
    try:
        return pathlib.Path(path).read_text().strip()
    except OSError:
        return ""

def detect():
    cpu = read('/proc/cpuinfo')
    governors = read('/sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors').split()
    cpu_control = bool(shutil.which('cpupower') and pathlib.Path('/sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq').exists())
    ryzen = shutil.which('ryzenadj') or str(SCRIPTS / 'ryzenadj')
    tdp = ''
    if 'GenuineIntel' in cpu and pathlib.Path('/sys/class/powercap/intel-rapl/intel-rapl:0/constraint_1_power_limit_uw').exists():
        tdp = 'intel-rapl'
    elif 'AuthenticAMD' in cpu and os.access(ryzen, os.X_OK):
        # Steam Deck uses an AMD GPU hwmon power cap rather than RyzenAdj.
        tdp = 'ryzenadj'
    caps = list(pathlib.Path('/sys/class/drm').glob('card*/device/hwmon/hwmon*/power1_cap'))
    if 'AuthenticAMD' in cpu and caps:
        tdp = 'amdgpu-hwmon'
    gpu = any(read(p / 'vendor') == '0x1002' and (p / 'pp_od_clk_voltage').exists()
              and bool(read(p / 'pp_od_clk_voltage')) for p in pathlib.Path('/sys/class/drm').glob('card*/device'))
    controllers = []
    if shutil.which('systemctl'):
        for service in ('hhd', 'jupiter-fan-control'):
            try:
                result = subprocess.run(['systemctl', 'is-active', service], capture_output=True, timeout=2)
                if result.returncode == 0:
                    controllers.append(service)
            except (OSError, subprocess.TimeoutExpired):
                pass
        # HHD is also distributed as a per-user system service.
        try:
            result = subprocess.run(['systemctl', 'list-units', '--type=service', '--state=active',
                                     '--no-legend', '--plain', 'hhd@*.service', 'hhd_local@*.service'],
                                    capture_output=True, text=True, timeout=2)
            if result.returncode == 0 and (getattr(result, 'stdout', '') or '').strip() and 'hhd' not in controllers:
                controllers.append('hhd')
        except (OSError, subprocess.TimeoutExpired):
            pass
    return dict(controllers=controllers, os=read('/etc/os-release'), model=read('/sys/devices/virtual/dmi/id/product_name'),
                tdp=tdp, gpu=gpu, cpu=cpu_control,
                smt=read('/sys/devices/system/cpu/smt/control') in ('on', 'off'),
                boost=pathlib.Path('/sys/devices/system/cpu/cpufreq/boost').exists(),
                policy=cpu_control and all(g in governors for g in ('powersave', 'ondemand', 'performance')),
                handy=pathlib.Path('/etc/handygccs/handygccs.conf').exists())

FEATURES = {'TDP': 'tdp', 'GPU': 'gpu', 'CPU': 'cpu', 'SMT': 'smt', 'BOOST': 'boost', 'POLICY': 'policy'}

TDP_WARNING_KEY = 'hhdTdpWarningAcknowledged'

def is_tdp_command(command):
    return bool(re.search(r'(?:set|reset|get)TDP\.sh\b', command))

def visible(command, caps):
    # TDP remains discoverable even when no usable control interface is found.
    return supported(command, dict(caps, tdp=True))

def supported(command, caps):
    for script in re.findall(r'(?:set|reset|get)(TDP|GPU|CPU|SMT|BOOST|POLICY|AdvCPU)\.sh', command):
        if script == 'AdvCPU':
            if not caps['cpu']:
                return False
        elif not caps[FEATURES[script]]:
            return False
    return True

def resolve(command):
    # Keep stored legacy commands portable, without rewriting user settings.
    return re.sub(r'(?:/usr/share/GameAssist/|@gameassist/)([A-Za-z0-9_.-]+)',
                  lambda m: 'bash ' + shlex.quote(str(SCRIPTS / m[1])) if m[1].endswith('.sh')
                  else shlex.quote(str(SCRIPTS / m[1])), command)
