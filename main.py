import asyncio
import subprocess
import logging
import traceback
import json
import os
import shlex
import pathlib
import locale
import ctypes
import configparser
from genericpath import exists
from subprocess import check_output, CalledProcessError, STDOUT
from time import sleep

logging.basicConfig(filename="/tmp/GameAssist.log", format='[GameAssist] %(asctime)s %(levelname)s %(message)s', filemode='w+', force=True)
logger = logging.getLogger()
logger.setLevel(logging.INFO) # can be changed to logging.DEBUG for debugging issues

def log(txt):
    logger.info(txt)
#    print(txt)    

Initialized = False

ControlTypeButton = 1
ControlTypeToggle = 2
ControlTypeSlider = 3
ControlTypeGroup = 4
ControlTypeChoice = 5

HOME_DIR = str(pathlib.Path(os.getcwd()).parent.parent.resolve())
CURRENT_DIR = str(pathlib.Path(__file__).parent.resolve())
USER_NAME = None

def get_user():
    global USER_NAME
    cmd = "who | awk '{print $1}' | sort | head -1"
    while USER_NAME is None:
        USER_LIST = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout = subprocess.PIPE, stderr = subprocess.PIPE, shell=True)
        for get_first in USER_LIST.stdout:
            name = get_first.decode().strip()
            if name is not None:
                USER_NAME = name
            break
        sleep(1)

def steam_ifrunning_deckui(cmd):
    global HOME_DIR
    # Get the currently running Steam PID.
    steampid_path = HOME_DIR + '/.steam/steam.pid'
    try:
        with open(steampid_path) as f:
            pid = f.read().strip()
    except Exception as err:
        log(f"{err} | Error getting steam PID.")
        log(traceback.format_exc())
        return False

    # Get the andline for the Steam process by checking /proc.
    steam_cmd_path = f"/proc/{pid}/cmdline"
    if not os.path.exists(steam_cmd_path):
        log("Steam not running")
        return False

    try:
        with open(steam_cmd_path, "rb") as f:
            steam_cmd = f.read()
    except Exception as err:
        log(f"{err} | Error getting steam cmdline.")
        log(traceback.format_exc())
        return False 

    # Use this andline to determine if Steam is running in DeckUI mode.
    # e.g. "steam://shortpowerpress" only works in DeckUI.
    is_deckui = b"-gamepadui" in steam_cmd
    if not is_deckui:
        log("Steam not gamepadui")
        return False

    steam_path = HOME_DIR + '/.steam/root/ubuntu12_32/steam'
    try:
        result = subprocess.run(["su", USER_NAME, "-c", f"{steam_path} -ifrunning {cmd}"])
        log(f"{steam_path} {cmd} {result.returncode}")
        return result.returncode == 0
    except Exception as err:
        log(f"{err} | Error sending and to Steam.")
        log(traceback.format_exc())
        return False


PRESET_HIBERNATE_NAME = "Hibernate"
PRESET_SUSPEND_NAME = "Suspend"
PRESET_TDP_NAME = "Thermal Design Power(TDP) Limit"
PRESET_TDP_DESC = "Limit processor power to reduce total power used."
PRESET_CPU_POWER_NAME = "CPU Package Power"
PRESET_CPU_POWER_UNIT = " W"
PRESET_GPU_CLOCK_NAME = "Manual GPU clock control"
PRESET_GPU_CLOCK_DESC = "Set the GPU to a fixed clock"
PRESET_GPU_CLOCK = "GPU Clock"
PRESET_CPU_CLOCK_NAME = "Manual CPU clock control"
PRESET_CPU_CLOCK_DESC = "Set max CPU clock"
PRESET_CPU_CLOCK_MAX = "CPU Clock"
PRESET_CPU_ADV_NAME = "Advance CPU Control"
PRESET_CPU_ADV_DESC = "Controls the detailed functions of the CPU"
PRESET_SMT_NAME = "Control SMT"
PRESET_SMT_DESC = "Turns the SMT function off or on."
PRESET_BOOST_NAME = "Control CPU Boost"
PRESET_BOOST_DESC = "Turns the CPU Boost function off or on."
PRESET_POLICY_NAME = "Performance Policy"
PRESET_POLICY_POWERSAVE = "PowerSave"
PRESET_POLICY_BALANCE = "Balance"
PRESET_POLICY_PERFORMANCE = "Performance"

GlobalLocale = ""
def TransLang(lang):
    global GlobalLocale
    loc = GlobalLocale
    if (loc == ""):
        loc = locale.getlocale()[0]
    if (loc.find("ko") >= 0 or loc.find("KR") >= 0):
        if (lang == PRESET_HIBERNATE_NAME):
            lang = "최대 절전"
        if (lang == PRESET_SUSPEND_NAME):
            lang = "절전 모드"
        elif (lang == PRESET_TDP_NAME):
            lang = "열 설계 전력(TDP) 제한"
        elif (lang == PRESET_TDP_DESC):
            lang = "프로세서 전력을 제한하여 총 사용 전력을 줄입니다."
        elif (lang == PRESET_CPU_POWER_NAME):
            lang = "CPU 패키지 전력"
        elif (lang == PRESET_CPU_POWER_UNIT):
            lang = " 와트"
        elif (lang == PRESET_GPU_CLOCK_NAME):
            lang = "GPU 클럭 수동 제어"
        elif (lang == PRESET_GPU_CLOCK_DESC):
            lang = "고정된 클럭으로 GPU를 설정 합니다."
        elif (lang == PRESET_GPU_CLOCK):
            lang = "GPU 클럭 빈도"
        elif (lang == PRESET_CPU_CLOCK_NAME):
            lang = "CPU 클럭 수동 제어"
        elif (lang == PRESET_CPU_CLOCK_DESC):
            lang = "최대 CPU 클럭을 설정 합니다."
        elif (lang == PRESET_CPU_CLOCK_MAX):
            lang = "CPU 최대 클럭"
        elif (lang == PRESET_CPU_ADV_NAME):
            lang = "추가 CPU 제어"
        elif (lang == PRESET_CPU_ADV_DESC):
            lang = "추가적인 CPU 설정을 합니다."
        elif (lang == PRESET_SMT_NAME):
            lang = "SMT 제어"
        elif (lang == PRESET_SMT_DESC):
            lang = "SMT 기능을 끄거나 켭니다."
        elif (lang == PRESET_BOOST_NAME):
            lang = "CPU 부스트 제어"
        elif (lang == PRESET_BOOST_DESC):
            lang = "CPU 부스트 기능을 끄거나 켭니다."
        elif (lang == PRESET_POLICY_NAME):
            lang = "성능 정책"
        elif (lang == PRESET_POLICY_POWERSAVE):
            lang = "절전 모드"
        elif (lang == PRESET_POLICY_BALANCE):
            lang = "균형 모드"
        elif (lang == PRESET_POLICY_PERFORMANCE):
            lang = "성능 모드"
    return lang

class Shortcut:
    def __init__(self, dict):
        def checkAndAssign(dict, key, defValue):
            if key in dict:    
                return dict[key]
            else:    
                return defValue

        # common
        self.id = checkAndAssign(dict, 'id', '___')
        self.position = checkAndAssign(dict, 'position', 1)
        self.name = checkAndAssign(dict, 'name', '')
        self.type = checkAndAssign(dict, 'type', 1)
        self.cmd = checkAndAssign(dict, 'cmd', '')
        self.desc = checkAndAssign(dict, 'desc', '')
        self.group = checkAndAssign(dict, 'group', '')
        self.timeout = checkAndAssign(dict, 'timeout', '1000')
        self.current = checkAndAssign(dict, 'current', '')

        # button
        self.name1 = checkAndAssign(dict, 'name1', '')
        self.cmd1 = checkAndAssign(dict, 'cmd1', '')
        self.name2 = checkAndAssign(dict, 'name2', '')
        self.cmd2 = checkAndAssign(dict, 'cmd2', '')
        self.name3 = checkAndAssign(dict, 'name3', '')
        self.cmd3 = checkAndAssign(dict, 'cmd3', '')
        self.name4 = checkAndAssign(dict, 'name4', '')
        self.cmd4 = checkAndAssign(dict, 'cmd4', '')
        self.name5 = checkAndAssign(dict, 'name5', '')
        self.cmd5 = checkAndAssign(dict, 'cmd5', '')
        self.name6 = checkAndAssign(dict, 'name6', '')
        self.cmd6 = checkAndAssign(dict, 'cmd6', '')

        # toggle
        self.checked = checkAndAssign(dict, 'checked', -1)

        # slider
        self.min = checkAndAssign(dict, 'min', '1')
        self.max = checkAndAssign(dict, 'max', '100')
        self.step = checkAndAssign(dict, 'step', '1')
        self.scale = checkAndAssign(dict, 'scale', '1')
        self.value = checkAndAssign(dict, 'value', '-1')
        self.suffix = checkAndAssign(dict, 'suffix', '')

class Plugin:
    steamAppId = "0"
    shortcutsSettingMap = {}
    shortcutsSettingPath = HOME_DIR + "/.config/GameAssist/setting.json"

    def _runProgram(self, cmd):
        log(f"_runProgram {cmd}") 
        if (cmd.find("systemctl suspend") >= 0):
            log(f"systemctl suspend {cmd}") 
            if (steam_ifrunning_deckui("steam://shortpowerpress") == True):
                return True
            log(f"systemctl suspend {cmd} failed!!!") 
        elif (cmd.find("systemctl poweroff") >= 0):
            if (steam_ifrunning_deckui("steam://longpowerpress") == True):
                return True

        res = subprocess.call([cmd], shell=True)
        return res == 0

    def _exeProgram(self, cmd):
        p = subprocess.run([cmd], capture_output=True, text=True)
        return p.stdout
        
    def _exeProgram2(self, cmd, defValue):
        if (cmd != ""):
            ret = self._exeProgram(self, cmd)
            if (ret != "" and int(ret) >= 0):
                return ret
        return defValue

    def saveSetting(self):
        jDat = json.dumps(self.shortcutsSettingMap, indent=4)
        with open(self.shortcutsSettingPath, "w") as outfile:
            outfile.write(jDat)

    def loadSetting(self):
        if (exists(self.shortcutsSettingPath)):
            try:
                with open(self.shortcutsSettingPath, "r") as file:
                    settingDict = json.load(file)

                    for k,v in settingDict.items():
                        self.shortcutsSettingMap[k] = v

            except Exception as e:
                log(f"Exception while loadSetting: {e}") # error reading json

    def _setGlobalSetting(self, key, value):
        Section = "Settings"
        data = {}
        if (Section in self.shortcutsSettingMap):
            data = self.shortcutsSettingMap[Section]
        data[key] = value
        self.shortcutsSettingMap[Section] = data

        self.saveSetting(self)

    def _getGlobalSetting(self, key):
        Section = "Settings"
        if (Section in self.shortcutsSettingMap):
            if (key in self.shortcutsSettingMap[Section]):
                return self.shortcutsSettingMap[Section][key]
        return ""

    def setSetting(self, shortcut):
        data = {}
        if (shortcut.type == ControlTypeToggle or shortcut.type == ControlTypeGroup):
            if (shortcut.id in self.shortcutsSettingMap):
                data = self.shortcutsSettingMap[shortcut.id]
            data[self.steamAppId] = shortcut.checked
        elif (shortcut.type == ControlTypeSlider or shortcut.type == ControlTypeChoice):
            if (shortcut.id in self.shortcutsSettingMap):
                data = self.shortcutsSettingMap[shortcut.id]
            data[self.steamAppId] = shortcut.value
        self.shortcutsSettingMap[shortcut.id] = data

        self.saveSetting(self)

    def getSetting(self, shortcut):
        if (shortcut.type == ControlTypeToggle or shortcut.type == ControlTypeGroup):
            if (shortcut.id in self.shortcutsSettingMap):
                if (self.steamAppId in self.shortcutsSettingMap[shortcut.id]):
                    shortcut.checked = self.shortcutsSettingMap[shortcut.id][self.steamAppId]
                else:
                    shortcut.checked = self._exeProgram2(self, shortcut.current, -1)
            else:
                shortcut.checked = self._exeProgram2(self, shortcut.current, -1)
        elif (shortcut.type == ControlTypeSlider or shortcut.type == ControlTypeChoice):
            if (shortcut.id in self.shortcutsSettingMap):
                if (self.steamAppId in self.shortcutsSettingMap[shortcut.id]):
                    shortcut.value = self.shortcutsSettingMap[shortcut.id][self.steamAppId]
                else:
                    shortcut.value = str(self._exeProgram2(self, shortcut.current, -1))
            else:
                shortcut.value = str(self._exeProgram2(self, shortcut.current, -1))

    shortcutsItemMap = {}
    shortcutsItemPath = HOME_DIR + "/.config/GameAssist/items.json"
    
    def serializeShortcuts(self, small = False):
        res = {}

        def checkAndAssign(item, key, value):
            if (value != ''):
                item[key] = value

        for k,v in self.shortcutsItemMap.items():
            if (small):
                item = { "name": v.name, "type": v.type }

                # common
                checkAndAssign(item, "cmd", v.cmd)
                checkAndAssign(item, "desc", v.desc)
                checkAndAssign(item, "group", v.group)
                if (v.timeout != '1000'):
                    checkAndAssign(item, "timeout", v.timeout)

                if (v.type != ControlTypeButton):
                    checkAndAssign(item, "current", v.current)

                if (v.type == ControlTypeButton): # button
                    checkAndAssign(item, "name1", v.name1)
                    checkAndAssign(item, "cmd1", v.cmd1)
                    checkAndAssign(item, "name2", v.name2)
                    checkAndAssign(item, "cmd2", v.cmd2)
                elif (v.type == ControlTypeToggle): # toggle
                    checkAndAssign(item, "cmd1", v.cmd1)
                elif (v.type == ControlTypeSlider): # slider
                    item["min"] = v.min
                    item["max"] = v.max
                    item["step"] = v.step
                    item["scale"] = v.scale
                    checkAndAssign(item, "suffix", v.suffix)
                elif (v.type == ControlTypeGroup): # group
                    checkAndAssign(item, "cmd1", v.cmd1)
                elif (v.type == ControlTypeChoice): #choice
                    checkAndAssign(item, "name1", v.name1)
                    checkAndAssign(item, "cmd1", v.cmd1)
                    checkAndAssign(item, "name2", v.name2)
                    checkAndAssign(item, "cmd2", v.cmd2)
                    checkAndAssign(item, "name3", v.name3)
                    checkAndAssign(item, "cmd3", v.cmd3)
                    checkAndAssign(item, "name4", v.name4)
                    checkAndAssign(item, "cmd4", v.cmd4)
                    checkAndAssign(item, "name5", v.name5)
                    checkAndAssign(item, "cmd5", v.cmd5)
                    checkAndAssign(item, "name6", v.name6)
                    checkAndAssign(item, "cmd6", v.cmd6)

                res[k] = item

            else:
                res[k] = { "id": v.id, "position": v.position, "name": v.name, "type": v.type, "cmd": v.cmd, "desc": v.desc, 
                            "group": v.group, "timeout": v.timeout, "current": v.current, "checked": v.checked,
                            "min": v.min, "max": v.max, "step": v.step, "scale": v.scale, "value": v.value, "suffix": v.suffix,
                            "name1": v.name1, "cmd1": v.cmd1, "name2": v.name2, "cmd2": v.cmd2, "name3": v.name3, "cmd3": v.cmd3,
                            "name4": v.name4, "cmd4": v.cmd4, "name5": v.name5, "cmd5": v.cmd5, "name6": v.name6, "cmd6": v.cmd6 }

        return res

    def saveShortcuts(self):
        res = self.serializeShortcuts(self, True)
        jDat = json.dumps(res, indent=4)

        with open(self.shortcutsItemPath, "w") as outfile:
            outfile.write(jDat)

    def _loadShortcuts(self):
        log("Analyzing Shortcuts JSON")
            
        if (exists(self.shortcutsItemPath)):
            try:
                with open(self.shortcutsItemPath, "r") as file:
                    Map = {}
                    shortcutsDict = json.load(file)
                    position = 1

                    for k,v in shortcutsDict.items():
#                        log(f"Adding shortcut {v['name']}")
                        v['id'] = k
                        v['position'] = position
                        Map[k] = Shortcut(v)
                        self.getSetting(self, Map[k])
#                        log(f"Added shortcut {v['name']}")
                        position = position + 1

                    self.shortcutsItemMap = Map

            except Exception as e:
                log(f"Exception while loadShortcuts: {e}") # error reading json
                self._makeDefItems(self)
        else:
            self._makeDefItems(self)

    def _setShortcuts(self, shortcuts):
        Map = {}

        for shortcut in shortcuts:
            Map[shortcut['id']] = Shortcut(shortcut)

        self.shortcutsItemMap = Map

        self.saveShortcuts(self)

    def _modShortcut(self, shortcut):
        if (shortcut['id'] in self.shortcutsItemMap):
            item = Shortcut(shortcut)
            self.setSetting(self, item)
        else:
            log(f"Shortcut {shortcut['name']} does not exist")

    def _exeShortcut(self, shortcut):
        try:
            if (shortcut.type == ControlTypeToggle or shortcut.type == ControlTypeGroup):
                if (shortcut.checked == 0):
                    self._runProgram(self, shortcut.cmd)
                elif (shortcut.checked == 1):
                    self._runProgram(self, shortcut.cmd1)
            elif (shortcut.type == ControlTypeSlider):
                if (float(shortcut.value) >= 0):
                    cmd = shortcut.cmd.replace("$v$", str(float(shortcut.value) * float(shortcut.scale)));
                    self._runProgram(self, cmd)
            elif (shortcut.type == ControlTypeChoice):
                idx = int(shortcut.value)
                if (idx == 0):
                    self._runProgram(self, shortcut.cmd1)
                elif (idx == 1):
                    self._runProgram(self, shortcut.cmd2)
                elif (idx == 2):
                    self._runProgram(self, shortcut.cmd3)
                elif (idx == 3):
                    self._runProgram(self, shortcut.cmd4)
                elif (idx == 4):
                    self._runProgram(self, shortcut.cmd5)
                elif (idx == 5):
                    self._runProgram(self, shortcut.cmd6)
                    
        except Exception as e:
            log(f"Exception while exe shortcuts: {e}")

    def _runShortcuts(self, group):
        try:
            map = { }
            for k,v in self.shortcutsItemMap.items():
                if (v.type == ControlTypeGroup and v.checked == 1): # group
                    map[v.group] = True

            for k,v in self.shortcutsItemMap.items():
                if (group != ""):
                    if (v.type != ControlTypeGroup and v.group == group):
                        self._exeShortcut(self, v)
                elif (v.type == ControlTypeGroup):
                    self._exeShortcut(self, v)
                else: # not group                
                    if (v.group == ""):
                        self._exeShortcut(self, v)
                    elif (v.group in map):
                        self._exeShortcut(self, v)
        except Exception as e:
            log(f"Exception while _runShortcuts: {e}") 

    def _makeDefItems(self):
        if not os.path.exists(os.path.dirname(self.shortcutsItemPath)):
            os.mkdir(os.path.dirname(self.shortcutsItemPath))

        data = {
            "00000000-0000-0000-0000-000000000000": {
                "name": TransLang(PRESET_HIBERNATE_NAME),
                "type": 1,
                "cmd": "sudo systemctl hibernate",
                "name1": TransLang(PRESET_SUSPEND_NAME),
                "cmd1": "sudo systemctl suspend",
            },
            "00000000-0000-0000-0000-000000000001": {
                "name": TransLang(PRESET_TDP_NAME),
                "type": 4,
                "desc": TransLang(PRESET_TDP_DESC),
                "group": "GroupTDP",
                "timeout": "0",
                "cmd": "/usr/share/GameAssist/resetTDP.sh",
            },
            "00000000-0000-0000-0000-000000000002": {
                "name": TransLang(PRESET_CPU_POWER_NAME),
                "type": 3,
                "group": "GroupTDP",
                "min": "5",
                "max": "28",
                "step": "1",
                "scale": "1",
                "suffix": TransLang(PRESET_CPU_POWER_UNIT),
                "cmd": "/usr/share/GameAssist/setTDP.sh $v$",
            },
            "00000000-0000-0000-0000-000000000003": {
                "name": "7W",
                "type": 1,
                "cmd": "/usr/share/GameAssist/setTDP.sh 7",
                "group": "GroupTDP",
                "name1": "9W",
                "cmd1": "/usr/share/GameAssist/setTDP.sh 9",
                "name2": "12W",
                "cmd2": "/usr/share/GameAssist/setTDP.sh 12"
            },
            "00000000-0000-0000-0000-000000000004": {
                "name": "15W",
                "type": 1,
                "cmd": "/usr/share/GameAssist/setTDP.sh 15",
                "group": "GroupTDP",
                "name1": "20W",
                "cmd1": "/usr/share/GameAssist/setTDP.sh 20",
                "name2": "25W",
                "cmd2": "/usr/share/GameAssist/setTDP.sh 25"
            },
            "00000000-0000-0000-0000-000000000005": {
                "name": TransLang(PRESET_GPU_CLOCK_NAME),
                "type": 4,
                "desc": TransLang(PRESET_GPU_CLOCK_DESC),
                "group": "Group GPU CLOCK",
                "timeout": "0",
                "cmd": "/usr/share/GameAssist/resetGPU.sh"
            },
            "00000000-0000-0000-0000-000000000006": {
                "name": TransLang(PRESET_GPU_CLOCK),
                "type": 3,
                "group": "Group GPU CLOCK",
                "min": "300",
                "max": "1800",
                "step": "100",
                "scale": "1",
                "suffix": " MHz",
                "cmd": "/usr/share/GameAssist/setGPU.sh $v$"
            },
            "00000000-0000-0000-0000-000000000007": {
                "name": TransLang(PRESET_CPU_CLOCK_NAME),
                "type": 4,
                "desc": TransLang(PRESET_CPU_CLOCK_DESC),
                "group": "Group CPU CLOCK",
                "timeout": "0",
                "cmd": "/usr/share/GameAssist/resetCPU.sh"
            },
            "00000000-0000-0000-0000-000000000008": {
                "name": TransLang(PRESET_CPU_CLOCK_MAX),
                "type": 3,
                "group": "Group CPU CLOCK",
                "min": "1000",
                "max": "4000",
                "step": "100",
                "scale": "1",
                "suffix": " MHz",
                "cmd": "/usr/share/GameAssist/setCPU.sh $v$"
            },
            "00000000-0000-0000-0000-000000000009": {
                "name": TransLang(PRESET_CPU_ADV_NAME),
                "type": 4,
                "desc": TransLang(PRESET_CPU_ADV_DESC),
                "group": "Advance CPU",
                "timeout": "0",
                "cmd": "/usr/share/GameAssist/resetAdvCPU.sh"
            },
            "00000000-0000-0000-0000-000000000010": {
                "name": TransLang(PRESET_SMT_NAME),
                "type": 2,
                "desc": TransLang(PRESET_SMT_DESC),
                "group": "Advance CPU",
                "cmd": "/usr/share/GameAssist/setSMT.sh off",
                "cmd1": "/usr/share/GameAssist/setSMT.sh on",
                "current": "/usr/share/GameAssist/getSMT.sh"
            },
            "00000000-0000-0000-0000-000000000011": {
                "name": TransLang(PRESET_BOOST_NAME),
                "type": 2,
                "desc": TransLang(PRESET_BOOST_DESC),
                "group": "Advance CPU",
                "cmd": "/usr/share/GameAssist/setBOOST.sh 0",
                "cmd1": "/usr/share/GameAssist/setBOOST.sh 1",
                "current": "/usr/share/GameAssist/getBOOST.sh"
            },            
            "00000000-0000-0000-0000-000000000012": {
                "name": TransLang(PRESET_POLICY_NAME),
                "type": 5,
                "group": "Advance CPU",
                "name1": TransLang(PRESET_POLICY_POWERSAVE),
                "cmd1": "/usr/share/GameAssist/setPOLICY.sh 0",
                "name2": TransLang(PRESET_POLICY_BALANCE),
                "cmd2": "/usr/share/GameAssist/setPOLICY.sh 1",
                "name3": TransLang(PRESET_POLICY_PERFORMANCE),
                "cmd3": "/usr/share/GameAssist/setPOLICY.sh 2",
                "current": "/usr/share/GameAssist/getPOLICY.sh"
            }
        }
        with open(self.shortcutsItemPath, "w") as file:
            json.dump(data, file, indent=4)

    # Normal methods: can be called from JavaScript using call_plugin_function("signature", argument)
    async def setSteamAppId(self, appId):
        self.steamAppId = appId

    async def setGlobalSetting(self, key, value):
        self._setGlobalSetting(self, key, value)
 
    async def getGlobalSetting(self, key):
        return self._getGlobalSetting(self, key)

    async def getShortcuts(self):
        self._loadShortcuts(self)
        return self.serializeShortcuts(self)

    async def defGetShortcuts(self):
        self._makeDefItems(self)
        self._loadShortcuts(self)
        return self.serializeShortcuts(self)

    async def setShortcuts(self, shortcuts):
        self._setShortcuts(self, shortcuts)

    async def runShortcuts(self, group):
        self._runShortcuts(self, group)

    async def modShortcut(self, shortcut):
        self._modShortcut(self, shortcut)

    async def runProgram(self, cmd):
        return self._runProgram(self, cmd)

    async def exeProgram(self, cmd):
        return self._exeProgram(self, cmd)

    async def setLocale(self, loc):
        global GlobalLocale
        GlobalLocale = loc
        self._setGlobalSetting(self, "Lang", loc)

    async def getLocale(self):
        global GlobalLocale
        loc = GlobalLocale
        if (loc == ""):
            loc = locale.getlocale()[0]
        return loc

    async def logPrint(self, logStr):
        log(f"{logStr}") # error reading json

    HandyGCCS_PATH = "/etc/handygccs/handygccs.conf"
    HandyGCCS = None
    def loadHandyGCCS(self):
        self.HandyGCCS = configparser.ConfigParser()
        if os.path.exists(self.HandyGCCS_PATH):
            self.HandyGCCS.read(self.HandyGCCS_PATH)

    async def existHandyGCCS(self):
        return os.path.exists(self.HandyGCCS_PATH)

    async def getHandyGCCS(self, key):
        try:
            Button_Map = self.HandyGCCS["Button Map"]
            return Button_Map[key]
        except Exception as e:
            log(f"getHandyGCCS error {e}")
            return ""

    HandyGCCS_TEMP_PATH = HOME_DIR + "/.config/GameAssist/handygccs.conf"
    async def setHandyGCCS(self, key, value):
        try:
            Button_Map = self.HandyGCCS["Button Map"]
            Button_Map["version"] = "1.2"
            Button_Map[key] = value
            with open(self.HandyGCCS_TEMP_PATH, 'w') as config_file:
                self.HandyGCCS.write(config_file)
            self._runProgram(self, "/usr/share/GameAssist/applyHandyGCCS.sh")
        except Exception as e:
            log(f"setHandyGCCS error {e}")

    GetCpuTempFunc = None
    GetFanValueTypeFunc = None
    GetFanValueFunc = None
    UpdateFanControlFunc = None
    SetFanControlManualFunc = None

    def setFanControlManual(self, manual):
        try:
            return self.SetFanControlManualFunc(manual)
        except Exception as e:
            log(f"Exception setFanControlManual: {e}")
        return -1            

    async def getCpuTemp(self):
        try:
            return self.GetCpuTempFunc()
        except Exception as e:
            log(f"Exception getCpuTemp: {e}")
        return 0

    async def getFanValueType(self):
        try:
            return self.GetFanValueTypeFunc()
        except Exception as e:
            log(f"Exception getFanValueType: {e}")
        return -1

    async def getFanValue(self):
        try:
            return self.GetFanValueFunc()
        except Exception as e:
            log(f"Exception getFanValue: {e}")
        return -1            

    CUSTOM_FAN_CURVE = "CustomFanCurve"
    customFanControl = False
    async def getCustomFanControl(self):
        return self.customFanControl

    async def setCustomFanControl(self, custom):
        self.customFanControl = custom
        if (custom):
            self._setGlobalSetting(self, self.CUSTOM_FAN_CURVE, "1")
        else:
            self._setGlobalSetting(self, self.CUSTOM_FAN_CURVE, "0")

    LILEAR_FAN_CURVE = "LinearFanCurve"
    linearFanControl = True
    async def getLinearFanControl(self):
        return self.linearFanControl

    async def setLinearFanControl(self, linear):
        self.linearFanControl = linear
        if (linear):
            self._setGlobalSetting(self, self.LILEAR_FAN_CURVE, "1")
        else:
            self._setGlobalSetting(self, self.LILEAR_FAN_CURVE, "0")

    fanItems = [ ]
    fanItemsPath = HOME_DIR + "/.config/GameAssist/fanItems.json"
    fanItemsChanged = False
    async def setFanCurveItems(self, items):
        self.fanItems = items
        self.fanItemsChanged = True
        jDat = json.dumps(items, indent=4)
        with open(self.fanItemsPath, "w") as outfile:
            outfile.write(jDat)

    async def getFanCurveItems(self):
        return self.fanItems

    runningFanControl = False
    async def fanControlTask(self):
        customFanControl = False
        self.setFanControlManual(self, 0)  # default is auto
        while self.runningFanControl:
            try:
                if (self.fanItemsChanged or customFanControl != self.customFanControl):
                    self.fanItemsChanged = False
                    customFanControl = self.customFanControl;
                    if (customFanControl):
                        self.setFanControlManual(self, 1)
                    else:
                        self.setFanControlManual(self, 0)

                if (customFanControl):
                    if (self.fanItems == None or len(self.fanItems) < 1):
                        self.setFanControlManual(self, 0)
                    else:
                        cpuTemp = self.GetCpuTempFunc()
                        nextTemp = 30
                        nextSpeed = 30
                        nowTemp = 30
                        nowSpeed = 30

                        fanItems = self.fanItems.copy()
                        fanItems.append({ 'x': 1, 'y': 1 })
                        for idx, item in enumerate(fanItems):
                            nextTemp = 30 + item['x'] * 70
                            nextSpeed = 30 + item['y'] * 70
                            if (nextTemp > cpuTemp):
                                break
                            nowTemp = nextTemp
                            nowSpeed = nextSpeed

                        if (self.linearFanControl):
                            difTemp = nextTemp - nowTemp
                            difSpeed = nextSpeed - nowSpeed
                            if (difTemp > 0):
                                nowSpeed = nowSpeed + difSpeed * (cpuTemp - nowTemp) / difTemp

                        if (nowSpeed < 30):
                            nowSpeed = 30
                        # log(f"UpdateFanControlFunc:  {nowSpeed} cpu temp: {cpuTemp} now temp: {nowTemp}")
                        self.UpdateFanControlFunc(int(nowSpeed))

            except Exception as e:
                log(f"Exception fanControlTask: {e}")
            await asyncio.sleep(1)
        self.setFanControlManual(self, 0)  # default is auto

    def loadGameAssistModule(self):
        try:
            GameAssistModule = ctypes.cdll.LoadLibrary("/usr/share/GameAssist/GameAssist.so")
            InitModelFunc = GameAssistModule.InitModel
            if (InitModelFunc() >= 0):
                self.GetCpuTempFunc = GameAssistModule.GetCpuTemp                
                self.GetFanValueTypeFunc = GameAssistModule.GetFanValueType
                self.GetFanValueFunc = GameAssistModule.GetFanValue
                self.UpdateFanControlFunc = GameAssistModule.UpdateFanControl
                self.SetFanControlManualFunc = GameAssistModule.SetFanControlManual
                self.runningFanControl = True
                if (self._getGlobalSetting(self, self.CUSTOM_FAN_CURVE) == "1"):
                    self.customFanControl = True
                if (self._getGlobalSetting(self, self.LILEAR_FAN_CURVE) == "0"):
                    self.linearFanControl = False
                if (exists(self.fanItemsPath)):
                    try:
                        with open(self.fanItemsPath, "r") as file:
                            self.fanItems = json.load(file)
                    except Exception as e:
                        log(f"Exception fanItemOpen: {e}")

                asyncio.create_task(self.fanControlTask(self))
                log("Success load Game Assist module")
            else:
                log("Cannot init Game Assist module")
        except Exception as e:
            log(f"Exception Game Assist module: {e}")
 
    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        global Initialized
        global GlobalLocale
        if Initialized:
            return
        
        Initialized = True

        log("Initializing Plugin")

        get_user()

        self.loadSetting(self)
        GlobalLocale = self._getGlobalSetting(self, "Lang")

        if not os.path.exists(self.shortcutsItemPath):
            self._makeDefItems(self)

        self.loadHandyGCCS(self)

        self.loadGameAssistModule(self)

    async def _unload(self):
        runningFanControl = False

#aa = Plugin()
#aa._makeDefItems()

#aa._getGlobalSetting("useGameProfile-2844161208")
#aa.loadSetting()
#aa._setGlobalSetting("test", True)

#bb = aa._exeShortcut("/usr/share/GameAssist/getSMT.sh")
#print(bb)
#aa._loadShortcuts()
#bb = {}
#cc = Shortcut(bb)
#aa.setSetting(cc)

#aa._makeDefItems()
#res=aa.serializeShortcuts(True)
#jDat = json.dumps(res, indent=4)
#shortcutsItemPath = "/home/deck/.config/GameAssist/items.json"
#with open(shortcutsItemPath, "w") as outfile:
#    outfile.write(jDat)

#aa._runShortcut("echo off | sudo tee /sys/devices/system/cpu/smt/control")

# cat /sys/devices/system/cpu/present
# cat /sys/devices/system/cpu/offline
# cat /sys/devices/system/cpu/online
# echo 0 | sudo tee /sys/devices/system/cpu/cpu12/online

#p=subprocess.run("/home/deck/homebrew/plugins/GameAssist/bin/setTDP2.sh", shell=True, stdout = subprocess.PIPE, stderr=subprocess.PIPE)
#print(f"p.stdout {p.stdout}")
#print(f"p.stderr {p.stderr}")
#subprocess.call("/home/deck/homebrew/plugins/GameAssist/bin/setTDP2.sh", shell=True, stderr=subprocess.STDOUT, executable="/bin/bash")
