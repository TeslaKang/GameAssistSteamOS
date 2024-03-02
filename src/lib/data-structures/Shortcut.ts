export class ControlType {
    static BUTTON: number = 1;
    static TOGGLE: number = 2;
    static SLIDER: number = 3;
    static GROUP: number = 4;    
    static CHOICE: number = 5;
};

export class Shortcut {
    // common
    id: string;
    position: number;    
    type: number;
    timeout: string;
    name: string;
    cmd: string;
    desc: string;
    group: string;
    current: string;

    // button
    name1: string;
    cmd1: string;
    name2: string;
    cmd2: string;
    name3: string;
    cmd3: string;
    name4: string;
    cmd4: string;
    name5: string;
    cmd5: string;
    name6: string;
    cmd6: string;

    // toggle
    checked: number
    cmdCheck: string;

    // slider
    min: string
    max: string;
    step: string;
    scale: string;
    value: string;
    suffix: string;

    constructor(id: string, name: string, cmd: string, position: number) {
        // common
        this.id = id;
        this.position = position;
        this.type = ControlType.BUTTON;
        this.timeout = '1000';
        this.name = name;
        this.cmd = cmd;
        this.desc = '';
        this.group = '';
        this.current = '';

        // button
        this.name1 = '';
        this.cmd1 = '';
        this.name2 = '';
        this.cmd2 = '';
        this.name3 = '';
        this.cmd3 = '';
        this.name4 = '';
        this.cmd4 = '';
        this.name5 = '';
        this.cmd5 = '';
        this.name6 = '';
        this.cmd6 = '';

        // toggle
        this.checked = -1;
        this.cmdCheck = '';

        // slider
        this.min = '1';
        this.max = '100';
        this.step = '1';
        this.scale = '1';
        this.value = '1';
        this.suffix = '';
    }
}

export function GetControlType(selectedOption: number | null) {
    if (selectedOption == 2) return ControlType.TOGGLE;
    else if (selectedOption == 3) return ControlType.SLIDER;
    else if (selectedOption == 4) return ControlType.GROUP;
    else if (selectedOption == 5) return ControlType.CHOICE;
    else return ControlType.BUTTON;
}

export class LANG {
    static GAME_ASSIST_: string = "Game Assist";
    static GAME_ASSIST: string = LANG.GAME_ASSIST_;
    static PROFILE_TITLE_: string = "Performance Setting";
    static PROFILE_TITLE: string = LANG.PROFILE_TITLE_;
    static PROFILE_DEFAULT_: string = "Default";
    static PROFILE_DEFAULT: string = LANG.PROFILE_DEFAULT_;
    static PROFILE_USING_: string = "Using {0} Profile";
    static PROFILE_USING: string = LANG.PROFILE_USING_;
    static PROFILE_USE_GAME_: string = "Use Game Profile";
    static PROFILE_USE_GAME: string = LANG.PROFILE_USE_GAME_;
    static ITEM_MANAGER_TITLE_: string = "Setting/Manager Items";
    static ITEM_MANAGER_TITLE: string = LANG.ITEM_MANAGER_TITLE_;
    static ITEM_MANAGER_SETTING_: string = "Setting";
    static ITEM_MANAGER_SETTING: string = LANG.ITEM_MANAGER_SETTING_
    static ITEM_MANAGER_ADD_: string = "Item Add";
    static ITEM_MANAGER_ADD: string = LANG.ITEM_MANAGER_ADD_
    static ITEM_MANAGER_EDIT_: string = "Item Edit";
    static ITEM_MANAGER_EDIT: string = LANG.ITEM_MANAGER_EDIT_;
    static ITEM_MANAGER_HANDY_: string = "HandyGCCS Setting";
    static ITEM_MANAGER_HANDY: string = LANG.ITEM_MANAGER_HANDY_;
    static ITEM_MANAGER_ABOUT_: string = "About";
    static ITEM_MANAGER_ABOUT: string = LANG.ITEM_MANAGER_ABOUT_;
    static SETTING_LANG_AUTO_: string = "Auto Detect";
    static SETTING_LANG_AUTO: string = LANG.SETTING_LANG_AUTO_;
    static TOAST_SUCCESS_: string = "Success";
    static TOAST_SUCCESS: string = LANG.TOAST_SUCCESS_;
    static TOAST_ERROR_: string = "Error";
    static TOAST_ERROR: string = LANG.TOAST_ERROR_;
    static TOAST_SAVE_: string = "Save";
    static TOAST_SAVE: string = LANG.TOAST_SAVE_;
    static REORDER_SAVE_: string = "Save Order";
    static REORDER_SAVE: string = LANG.REORDER_SAVE_;
    static REORDER_EDIT_: string = "Reorder";
    static REORDER_EDIT: string = LANG.REORDER_EDIT_;
    static MANAGER_ITEM_ACTION_: string = "Action";
    static MANAGER_ITEM_ACTION: string = LANG.MANAGER_ITEM_ACTION_;
    static MANAGER_ITEM_EDIT_: string = "Edit";
    static MANAGER_ITEM_EDIT: string = LANG.MANAGER_ITEM_EDIT_;
    static MANAGER_ITEM_DEL_: string = "Delete";
    static MANAGER_ITEM_DEL: string = LANG.MANAGER_ITEM_DEL_;
    static MANAGER_ITEM_DEL_QUERY_: string = "Are you want to delete";
    static MANAGER_ITEM_DEL_QUERY: string = LANG.MANAGER_ITEM_DEL_QUERY_;
    static MANAGER_ITEM_DESC_: string = "You can order or edit or delete item.";
    static MANAGER_ITEM_DESC: string = LANG.MANAGER_ITEM_DESC_;
    static MANAGER_ITEM_INIT_: string = "Item reset to default";
    static MANAGER_ITEM_INIT: string = LANG.MANAGER_ITEM_INIT_;
    static MANAGER_ITEM_LOADING_: string = "Loading...";
    static MANAGER_ITEM_LOADING: string = LANG.MANAGER_ITEM_LOADING_;
    static ITEM_TYPE_BUTTON_: string = "Button";
    static ITEM_TYPE_BUTTON: string = LANG.ITEM_TYPE_BUTTON_;
    static ITEM_TYPE_TOGGLE_: string = "Toggle";
    static ITEM_TYPE_TOGGLE: string = LANG.ITEM_TYPE_TOGGLE_;
    static ITEM_TYPE_SLIDER_: string = "Slider";
    static ITEM_TYPE_SLIDER: string = LANG.ITEM_TYPE_SLIDER_;
    static ITEM_TYPE_GROUP_: string = "Group";
    static ITEM_TYPE_GROUP: string = LANG.ITEM_TYPE_GROUP_;
    static ITEM_TYPE_CHOICE_: string = "Choice";
    static ITEM_TYPE_CHOICE: string = LANG.ITEM_TYPE_CHOICE_;
    static ITEM_UI_TYPE_: string = "UI Type";
    static ITEM_UI_TYPE: string = LANG.ITEM_UI_TYPE_;
    static ITEM_UI_SELECT_: string = "Select Type";
    static ITEM_UI_SELECT: string = LANG.ITEM_UI_SELECT_;
    static ITEM_UI_NAME_: string = "Name";
    static ITEM_UI_NAME: string = LANG.ITEM_UI_NAME_;
    static ITEM_UI_DESC_: string = "Description";
    static ITEM_UI_DESC: string = LANG.ITEM_UI_DESC_;
    static ITEM_UI_GROUP_: string = "Group Name";
    static ITEM_UI_GROUP: string = LANG.ITEM_UI_GROUP_;
    static ITEM_UI_CMD_ON_: string = "On Bash Command";
    static ITEM_UI_CMD_ON: string = LANG.ITEM_UI_CMD_ON_;
    static ITEM_UI_CMD_OFF_: string = "Off Bash Command";
    static ITEM_UI_CMD_OFF: string = LANG.ITEM_UI_CMD_OFF_;
    static ITEM_UI_MIN_: string = "Min Value";
    static ITEM_UI_MIN: string = LANG.ITEM_UI_MIN_;
    static ITEM_UI_MAX_: string = "Max Value";
    static ITEM_UI_MAX: string = LANG.ITEM_UI_MAX_;
    static ITEM_UI_STEP_: string = "Step Value";
    static ITEM_UI_STEP: string = LANG.ITEM_UI_STEP_;
    static ITEM_UI_SCALE_: string = "Scale Value";
    static ITEM_UI_SCALE: string = LANG.ITEM_UI_SCALE_;
    static ITEM_UI_UNIT_: string = "Unit";
    static ITEM_UI_UNIT: string = LANG.ITEM_UI_UNIT_;
    static ITEM_UI_VALUE_: string = "Bash Command($v$ is value)";
    static ITEM_UI_VALUE: string = LANG.ITEM_UI_VALUE_;
    static ITEM_UI_CMD_: string = "Bash Command";
    static ITEM_UI_CMD: string = LANG.ITEM_UI_CMD_;
    static ITEM_UI_NAME1_: string = "First Name";
    static ITEM_UI_NAME1: string = LANG.ITEM_UI_NAME1_;
    static ITEM_UI_CMD1_: string = "First Bash Command";
    static ITEM_UI_CMD1: string = LANG.ITEM_UI_CMD1_;
    static ITEM_UI_NAME2_: string = "Second Name";
    static ITEM_UI_NAME2: string = LANG.ITEM_UI_NAME2_;
    static ITEM_UI_CMD2_: string = "Second Bash Command";
    static ITEM_UI_CMD2: string = LANG.ITEM_UI_CMD2_;
    static ITEM_UI_NAME3_: string = "Third Name";
    static ITEM_UI_NAME3: string = LANG.ITEM_UI_NAME3_;
    static ITEM_UI_CMD3_: string = "Third Bash Command";
    static ITEM_UI_CMD3: string = LANG.ITEM_UI_CMD3_;
    static ITEM_UI_NAME4_: string = "Forth Name";
    static ITEM_UI_NAME4: string = LANG.ITEM_UI_NAME4_;
    static ITEM_UI_CMD4_: string = "Forth Bash Command";
    static ITEM_UI_CMD4: string = LANG.ITEM_UI_CMD4_;
    static ITEM_UI_NAME5_: string = "Fifth Name";
    static ITEM_UI_NAME5: string = LANG.ITEM_UI_NAME5_;
    static ITEM_UI_CMD5_: string = "Fifth Bash Command";
    static ITEM_UI_CMD5: string = LANG.ITEM_UI_CMD5_;
    static ITEM_UI_NAME6_: string = "Sixth Name";
    static ITEM_UI_NAME6: string = LANG.ITEM_UI_NAME6_;
    static ITEM_UI_CMD6_: string = "Sixth Bash Command";
    static ITEM_UI_CMD6: string = LANG.ITEM_UI_CMD6_;
    static ITEM_UI_DELAY_: string = "Delay Time(ms)";
    static ITEM_UI_DELAY: string = LANG.ITEM_UI_DELAY_;
    static ITEM_UI_CURRENT_: string = "Current Bash Command";
    static ITEM_UI_CURRENT: string = LANG.ITEM_UI_CURRENT_;
    static ITEM_UI_SAVE_: string = "Save";
    static ITEM_UI_SAVE: string = LANG.ITEM_UI_SAVE_;
    static ITEM_UI_EDITING_: string = "Editing: ";
    static ITEM_UI_EDITING: string = LANG.ITEM_UI_EDITING_;
    static ABOUT_ITEM1_: string = "Game Assist was created to easily configure system power settings in SteamOS.";
    static ABOUT_ITEM1: string = LANG.ABOUT_ITEM1_;
    static ABOUT_ITEM2_: string = "It works well with the default presets, but you can create new ones or edit/delete them if you want.";
    static ABOUT_ITEM2: string = LANG.ABOUT_ITEM2_;
    static ABOUT_ITEM3_: string = "Each item operates by executing bash commands.";
    static ABOUT_ITEM3: string = LANG.ABOUT_ITEM3_;
    static ABOUT_ITEM4_: string = "For further details, please refer to the basic items.";
    static ABOUT_ITEM4: string = LANG.ABOUT_ITEM4_;
    static ABOUT_ITEM5_: string = "Author: Hwarang, Donation: https://www.paypal.me/teslakang";
    static ABOUT_ITEM5: string = LANG.ABOUT_ITEM5_;
    static ABOUT_ITEM6_: string = "This program refers to bash-shortcuts(https://github.com/Tormak9970/bash-shortcuts) and Fanstic(https://github.com/NGnius/Fantastic).";
    static ABOUT_ITEM6: string = LANG.ABOUT_ITEM6_;
    static FAN_SPEED_: string = "Current Fan Speed";
    static FAN_SPEED: string = LANG.FAN_SPEED_;
    static FAN_TEMPER_: string = "Current Temperature";
    static FAN_TEMPER: string = LANG.FAN_TEMPER_;
    static FAN_CURVE_: string = "Custom Fan Curve";
    static FAN_CURVE: string = LANG.FAN_CURVE_;
    static FAN_CURVE_DESC_: string = "Overrides Default fan curve";
    static FAN_CURVE_DESC: string = LANG.FAN_CURVE_DESC_;
    static FAN_LINEAR_: string = "Linear Interpolation";
    static FAN_LINEAR: string = LANG.FAN_LINEAR_;
    static FAN_LINEAR_DESC_: string = "Pretends a straight line connects points";
    static FAN_LINEAR_DESC: string = LANG.FAN_LINEAR_DESC_;

    static LocalizeEng(): void {
        LANG.GAME_ASSIST = LANG.GAME_ASSIST_;
        LANG.PROFILE_TITLE = LANG.PROFILE_TITLE_;
        LANG.PROFILE_DEFAULT = LANG.PROFILE_DEFAULT_;
        LANG.PROFILE_USING = LANG.PROFILE_USING_;
        LANG.PROFILE_USE_GAME = LANG.PROFILE_USE_GAME_;
        LANG.ITEM_MANAGER_TITLE = LANG.ITEM_MANAGER_TITLE_;
        LANG.ITEM_MANAGER_SETTING = LANG.ITEM_MANAGER_SETTING_
        LANG.ITEM_MANAGER_ADD = LANG.ITEM_MANAGER_ADD_
        LANG.ITEM_MANAGER_EDIT = LANG.ITEM_MANAGER_EDIT_;
        LANG.ITEM_MANAGER_HANDY = LANG.ITEM_MANAGER_HANDY_;
        LANG.ITEM_MANAGER_ABOUT = LANG.ITEM_MANAGER_ABOUT_;
        LANG.SETTING_LANG_AUTO = LANG.SETTING_LANG_AUTO_;
        LANG.TOAST_SUCCESS = LANG.TOAST_SUCCESS_;
        LANG.TOAST_ERROR = LANG.TOAST_ERROR_;
        LANG.TOAST_SAVE = LANG.TOAST_SAVE_;
        LANG.REORDER_SAVE = LANG.REORDER_SAVE_;
        LANG.REORDER_EDIT = LANG.REORDER_EDIT_;
        LANG.MANAGER_ITEM_ACTION = LANG.MANAGER_ITEM_ACTION_;
        LANG.MANAGER_ITEM_EDIT = LANG.MANAGER_ITEM_EDIT_;
        LANG.MANAGER_ITEM_DEL = LANG.MANAGER_ITEM_DEL_;
        LANG.MANAGER_ITEM_DEL_QUERY = LANG.MANAGER_ITEM_DEL_QUERY_;
        LANG.MANAGER_ITEM_DESC = LANG.MANAGER_ITEM_DESC_;
        LANG.MANAGER_ITEM_INIT = LANG.MANAGER_ITEM_INIT_;
        LANG.MANAGER_ITEM_LOADING = LANG.MANAGER_ITEM_LOADING_;
        LANG.ITEM_TYPE_BUTTON = LANG.ITEM_TYPE_BUTTON_;
        LANG.ITEM_TYPE_TOGGLE = LANG.ITEM_TYPE_TOGGLE_;
        LANG.ITEM_TYPE_SLIDER = LANG.ITEM_TYPE_SLIDER_;
        LANG.ITEM_TYPE_GROUP = LANG.ITEM_TYPE_GROUP_;
        LANG.ITEM_TYPE_CHOICE = LANG.ITEM_TYPE_CHOICE_;
        LANG.ITEM_UI_TYPE = LANG.ITEM_UI_TYPE_;
        LANG.ITEM_UI_SELECT = LANG.ITEM_UI_SELECT_;
        LANG.ITEM_UI_NAME = LANG.ITEM_UI_NAME_;
        LANG.ITEM_UI_DESC = LANG.ITEM_UI_DESC_;
        LANG.ITEM_UI_GROUP = LANG.ITEM_UI_GROUP_;
        LANG.ITEM_UI_CMD_ON = LANG.ITEM_UI_CMD_ON_;
        LANG.ITEM_UI_CMD_OFF = LANG.ITEM_UI_CMD_OFF_;
        LANG.ITEM_UI_MIN = LANG.ITEM_UI_MIN_;
        LANG.ITEM_UI_MAX = LANG.ITEM_UI_MAX_;
        LANG.ITEM_UI_STEP = LANG.ITEM_UI_STEP_;
        LANG.ITEM_UI_SCALE = LANG.ITEM_UI_SCALE_;
        LANG.ITEM_UI_UNIT = LANG.ITEM_UI_UNIT_;
        LANG.ITEM_UI_VALUE = LANG.ITEM_UI_VALUE_;
        LANG.ITEM_UI_CMD = LANG.ITEM_UI_CMD_;
        LANG.ITEM_UI_NAME1 = LANG.ITEM_UI_NAME1_;
        LANG.ITEM_UI_CMD1 = LANG.ITEM_UI_CMD1_;
        LANG.ITEM_UI_NAME2 = LANG.ITEM_UI_NAME2_;
        LANG.ITEM_UI_CMD2 = LANG.ITEM_UI_CMD2_;
        LANG.ITEM_UI_NAME3 = LANG.ITEM_UI_NAME3_;
        LANG.ITEM_UI_CMD3 = LANG.ITEM_UI_CMD3_;
        LANG.ITEM_UI_NAME4 = LANG.ITEM_UI_NAME4_;
        LANG.ITEM_UI_CMD4 = LANG.ITEM_UI_CMD4_;
        LANG.ITEM_UI_NAME5 = LANG.ITEM_UI_NAME5_;
        LANG.ITEM_UI_CMD5 = LANG.ITEM_UI_CMD5_;
        LANG.ITEM_UI_NAME6 = LANG.ITEM_UI_NAME6_;
        LANG.ITEM_UI_CMD6 = LANG.ITEM_UI_CMD6_;
        LANG.ITEM_UI_DELAY = LANG.ITEM_UI_DELAY_;
        LANG.ITEM_UI_CURRENT = LANG.ITEM_UI_CURRENT_;
        LANG.ITEM_UI_SAVE = LANG.ITEM_UI_SAVE_;
        LANG.ITEM_UI_EDITING = LANG.ITEM_UI_EDITING_;
        LANG.ABOUT_ITEM1 = LANG.ABOUT_ITEM1_;
        LANG.ABOUT_ITEM2 = LANG.ABOUT_ITEM2_;
        LANG.ABOUT_ITEM3 = LANG.ABOUT_ITEM3_;
        LANG.ABOUT_ITEM4 = LANG.ABOUT_ITEM4_;
        LANG.ABOUT_ITEM5 = LANG.ABOUT_ITEM5_;
        LANG.ABOUT_ITEM6 = LANG.ABOUT_ITEM6_;
        LANG.FAN_SPEED = LANG.FAN_SPEED_;
        LANG.FAN_TEMPER = LANG.FAN_TEMPER_;
        LANG.FAN_CURVE = LANG.FAN_CURVE_;
        LANG.FAN_CURVE_DESC = LANG.FAN_CURVE_DESC_;
        LANG.FAN_LINEAR = LANG.FAN_LINEAR_;
        LANG.FAN_LINEAR_DESC = LANG.FAN_LINEAR_DESC_;   
    }

    static LocalizeKor(): void {
        LANG.GAME_ASSIST = "게임 도우미";
        LANG.PROFILE_TITLE = "성능 설정";
        LANG.PROFILE_DEFAULT = "기본";
        LANG.PROFILE_USING = "{0} 프로필 사용중";
        LANG.PROFILE_USE_GAME = "게임별 프로필 사용";
        LANG.ITEM_MANAGER_TITLE = "게임 도우미 설정/항목 관리";
        LANG.ITEM_MANAGER_SETTING = "설정";
        LANG.ITEM_MANAGER_ADD = "항목 추가";
        LANG.ITEM_MANAGER_EDIT = "항목 관리";
        LANG.ITEM_MANAGER_HANDY = "HandyGCCS 설정";
        LANG.ITEM_MANAGER_ABOUT = "게임 도우미 소개";
        LANG.SETTING_LANG_AUTO = "자동선택";
        LANG.TOAST_SUCCESS = "성공";
        LANG.TOAST_ERROR = "에러";
        LANG.TOAST_SAVE = "항목 저장";
        LANG.REORDER_SAVE = "순서 저장";
        LANG.REORDER_EDIT = "순서 바꾸기";
        LANG.MANAGER_ITEM_ACTION = "동작";
        LANG.MANAGER_ITEM_EDIT = "수정";
        LANG.MANAGER_ITEM_DEL = "삭제";
        LANG.MANAGER_ITEM_DEL_QUERY = "삭제 할까요?";
        LANG.MANAGER_ITEM_DESC = "항목을 이동하거나 수정/삭제 할 수 있습니다.";
        LANG.MANAGER_ITEM_INIT = "항목 초기화";
        LANG.MANAGER_ITEM_LOADING = "로딩중...";
        LANG.ITEM_TYPE_BUTTON = "버튼";
        LANG.ITEM_TYPE_TOGGLE = "토글";
        LANG.ITEM_TYPE_SLIDER = "슬라이더";
        LANG.ITEM_TYPE_GROUP = "그룹";
        LANG.ITEM_TYPE_CHOICE = "항목선택";
        LANG.ITEM_UI_TYPE = "UI 형태";
        LANG.ITEM_UI_SELECT = "형식 선택";
        LANG.ITEM_UI_NAME = "이름";
        LANG.ITEM_UI_DESC = "설명";
        LANG.ITEM_UI_GROUP = "그룹 이름";
        LANG.ITEM_UI_CMD_ON = "On Bash 명령어";
        LANG.ITEM_UI_CMD_OFF = "Off Bash 명령어";
        LANG.ITEM_UI_MIN = "최소값";
        LANG.ITEM_UI_MAX = "최대값";
        LANG.ITEM_UI_STEP = "단계값";
        LANG.ITEM_UI_SCALE = "배율값";
        LANG.ITEM_UI_UNIT = "단위";
        LANG.ITEM_UI_VALUE = "Bash 명령어($v$는 값)";
        LANG.ITEM_UI_CMD = "Bash 명령어";
        LANG.ITEM_UI_NAME1 = "첫번째 이름";
        LANG.ITEM_UI_CMD1 = "첫번째 Bash 명령어";
        LANG.ITEM_UI_NAME2 = "두번째 이름";
        LANG.ITEM_UI_CMD2 = "두번째 Bash 명령어";
        LANG.ITEM_UI_NAME3 = "세번째 이름";
        LANG.ITEM_UI_CMD3 = "세번째 Bash 명령어";
        LANG.ITEM_UI_NAME4 = "네번째 이름";
        LANG.ITEM_UI_CMD4 = "네번째 Bash 명령어";
        LANG.ITEM_UI_NAME5 = "다섯번째 이름";
        LANG.ITEM_UI_CMD5 = "다섯번째 Bash 명령어";
        LANG.ITEM_UI_NAME6 = "여섯번째 이름";
        LANG.ITEM_UI_CMD6 = "여섯번째 Bash 명령어";
        LANG.ITEM_UI_DELAY = "지연 시간(ms)";
        LANG.ITEM_UI_CURRENT = "현재 상태 명령어";
        LANG.ITEM_UI_SAVE = "저장";
        LANG.ITEM_UI_EDITING = "수정중: ";
        LANG.ABOUT_ITEM1 = "게임 도우미(Game Assist)는 스팀 OS에서 시스템 전력을 쉽게 설정하기 위해서 만들어졌습니다.";
        LANG.ABOUT_ITEM2 = "기본 프리셋으로 잘 동작하지만 원한다면 새로운 항목을 만들거나 수정/삭제할 수 있습니다.";
        LANG.ABOUT_ITEM3 = "각각의 항목은 bash 명령어를 실행하는 방식으로 동작합니다.";
        LANG.ABOUT_ITEM4 = "자세한 사항은 기본 항목을 참고하면 됩니다.";
        LANG.ABOUT_ITEM5 = "제작자: 화랑, 기부: https://www.paypal.me/teslakang";
        LANG.ABOUT_ITEM6 = "이 프로그램은 bash-shortcuts(https://github.com/Tormak9970/bash-shortcuts)과 Fanstic(https://github.com/NGnius/Fantastic)을 참고 했습니다.";
        LANG.FAN_SPEED = "현재 팬 속도";
        LANG.FAN_TEMPER = "현재 CPU 온도";
        LANG.FAN_CURVE = "수동 팬 속도 조절";
        LANG.FAN_CURVE_DESC = "기본 팬 곡선을 재정의합니다.";
        LANG.FAN_LINEAR = "선형 보간";
        LANG.FAN_LINEAR_DESC = "직선이 점을 연결하는 것처럼 가장합니다.";
    }

    static setLocale(locale: string): void {
        if (locale.indexOf("ko") >= 0 || locale.indexOf("KR") >= 0) LANG.LocalizeKor();
        else LANG.LocalizeEng();
    }
}
