(function (deckyFrontendLib, React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

  var __assign = window && window.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __rest = window && window.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };
  function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
      return React__default["default"].createElement(node.tag, __assign({
        key: i
      }, node.attr), Tree2Element(node.child));
    });
  }
  function GenIcon(data) {
    // eslint-disable-next-line react/display-name
    return function (props) {
      return React__default["default"].createElement(IconBase, __assign({
        attr: __assign({}, data.attr)
      }, props), Tree2Element(data.child));
    };
  }
  function IconBase(props) {
    var elem = function (conf) {
      var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return React__default["default"].createElement("svg", __assign({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: __assign(__assign({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && React__default["default"].createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
      return elem(conf);
    }) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function IoApps (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M104 160a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 312a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 464a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56z"}}]})(props);
  }

  class PyInterop {
      static setServer(serv) {
          this.serverAPI = serv;
      }
      static async setSteamAppId(appId) {
          return await this.serverAPI.callPluginMethod("setSteamAppId", { appId: appId });
      }
      static async setGlobalSetting(key, value) {
          return await this.serverAPI.callPluginMethod("setGlobalSetting", { key: key, value: value });
      }
      static async getGlobalSetting(key) {
          return await this.serverAPI.callPluginMethod("getGlobalSetting", { key: key });
      }
      static async getShortcuts() {
          return await this.serverAPI.callPluginMethod("getShortcuts", {});
      }
      static async defGetShortcuts() {
          return await this.serverAPI.callPluginMethod("defGetShortcuts", {});
      }
      static async setShortcuts(shortcuts) {
          return await this.serverAPI.callPluginMethod("setShortcuts", { shortcuts: shortcuts });
      }
      static async runShortcuts(group) {
          return await this.serverAPI.callPluginMethod("runShortcuts", { group: group });
      }
      static async modShortcut(shortcut) {
          return await this.serverAPI.callPluginMethod("modShortcut", { shortcut: shortcut });
      }
      static async runProgram(cmd) {
          return await this.serverAPI.callPluginMethod("runProgram", { cmd: cmd });
      }
      static async exeProgram(cmd) {
          return await this.serverAPI.callPluginMethod("exeProgram", { cmd: cmd });
      }
      static async setLocale(loc) {
          return await this.serverAPI.callPluginMethod("setLocale", { loc: loc });
      }
      static async getLocale() {
          return await this.serverAPI.callPluginMethod("getLocale", {});
      }
      static async logPrint(logStr) {
          return await this.serverAPI.callPluginMethod("logPrint", { logStr: logStr });
      }
      static async existHandyGCCS() {
          return await this.serverAPI.callPluginMethod("existHandyGCCS", {});
      }
      static async getHandyGCCS(key) {
          return await this.serverAPI.callPluginMethod("getHandyGCCS", { key: key });
      }
      static async setHandyGCCS(key, value) {
          return await this.serverAPI.callPluginMethod("setHandyGCCS", { key: key, value: value });
      }
      static async getCpuTemp() {
          return await this.serverAPI.callPluginMethod("getCpuTemp", {});
      }
      static async getFanValueType() {
          return await this.serverAPI.callPluginMethod("getFanValueType", {});
      }
      static async getFanValue() {
          return await this.serverAPI.callPluginMethod("getFanValue", {});
      }
      static async getCustomFanControl() {
          return await this.serverAPI.callPluginMethod("getCustomFanControl", {});
      }
      static async setCustomFanControl(custom) {
          return await this.serverAPI.callPluginMethod("setCustomFanControl", { custom: custom });
      }
      static async getLinearFanControl() {
          return await this.serverAPI.callPluginMethod("getLinearFanControl", {});
      }
      static async setLinearFanControl(linear) {
          return await this.serverAPI.callPluginMethod("setLinearFanControl", { linear: linear });
      }
      static async setFanCurveItems(items) {
          return await this.serverAPI.callPluginMethod("setFanCurveItems", { items: items });
      }
      static async getFanCurveItems() {
          return await this.serverAPI.callPluginMethod("getFanCurveItems", {});
      }
      static toast(title, message) {
          return (() => {
              try {
                  return this.serverAPI.toaster.toast({
                      title: title,
                      body: message,
                      duration: 1500,
                  });
              }
              catch (e) {
                  console.log("Toaster Error", e);
              }
          })();
      }
  }

  class ControlType {
  }
  ControlType.BUTTON = 1;
  ControlType.TOGGLE = 2;
  ControlType.SLIDER = 3;
  ControlType.GROUP = 4;
  ControlType.CHOICE = 5;
  class Shortcut {
      constructor(id, name, cmd, position) {
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
  function GetControlType(selectedOption) {
      if (selectedOption == 2)
          return ControlType.TOGGLE;
      else if (selectedOption == 3)
          return ControlType.SLIDER;
      else if (selectedOption == 4)
          return ControlType.GROUP;
      else if (selectedOption == 5)
          return ControlType.CHOICE;
      else
          return ControlType.BUTTON;
  }
  class LANG {
      static LocalizeEng() {
          LANG.GAME_ASSIST = LANG.GAME_ASSIST_;
          LANG.PROFILE_TITLE = LANG.PROFILE_TITLE_;
          LANG.PROFILE_DEFAULT = LANG.PROFILE_DEFAULT_;
          LANG.PROFILE_USING = LANG.PROFILE_USING_;
          LANG.PROFILE_USE_GAME = LANG.PROFILE_USE_GAME_;
          LANG.ITEM_MANAGER_TITLE = LANG.ITEM_MANAGER_TITLE_;
          LANG.ITEM_MANAGER_SETTING = LANG.ITEM_MANAGER_SETTING_;
          LANG.ITEM_MANAGER_ADD = LANG.ITEM_MANAGER_ADD_;
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
      static LocalizeKor() {
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
      static setLocale(locale) {
          if (locale.indexOf("ko") >= 0 || locale.indexOf("KR") >= 0)
              LANG.LocalizeKor();
          else
              LANG.LocalizeEng();
      }
  }
  LANG.GAME_ASSIST_ = "Game Assist";
  LANG.GAME_ASSIST = LANG.GAME_ASSIST_;
  LANG.PROFILE_TITLE_ = "Performance Setting";
  LANG.PROFILE_TITLE = LANG.PROFILE_TITLE_;
  LANG.PROFILE_DEFAULT_ = "Default";
  LANG.PROFILE_DEFAULT = LANG.PROFILE_DEFAULT_;
  LANG.PROFILE_USING_ = "Using {0} Profile";
  LANG.PROFILE_USING = LANG.PROFILE_USING_;
  LANG.PROFILE_USE_GAME_ = "Use Game Profile";
  LANG.PROFILE_USE_GAME = LANG.PROFILE_USE_GAME_;
  LANG.ITEM_MANAGER_TITLE_ = "Setting/Manager Items";
  LANG.ITEM_MANAGER_TITLE = LANG.ITEM_MANAGER_TITLE_;
  LANG.ITEM_MANAGER_SETTING_ = "Setting";
  LANG.ITEM_MANAGER_SETTING = LANG.ITEM_MANAGER_SETTING_;
  LANG.ITEM_MANAGER_ADD_ = "Item Add";
  LANG.ITEM_MANAGER_ADD = LANG.ITEM_MANAGER_ADD_;
  LANG.ITEM_MANAGER_EDIT_ = "Item Edit";
  LANG.ITEM_MANAGER_EDIT = LANG.ITEM_MANAGER_EDIT_;
  LANG.ITEM_MANAGER_HANDY_ = "HandyGCCS Setting";
  LANG.ITEM_MANAGER_HANDY = LANG.ITEM_MANAGER_HANDY_;
  LANG.ITEM_MANAGER_ABOUT_ = "About";
  LANG.ITEM_MANAGER_ABOUT = LANG.ITEM_MANAGER_ABOUT_;
  LANG.SETTING_LANG_AUTO_ = "Auto Detect";
  LANG.SETTING_LANG_AUTO = LANG.SETTING_LANG_AUTO_;
  LANG.TOAST_SUCCESS_ = "Success";
  LANG.TOAST_SUCCESS = LANG.TOAST_SUCCESS_;
  LANG.TOAST_ERROR_ = "Error";
  LANG.TOAST_ERROR = LANG.TOAST_ERROR_;
  LANG.TOAST_SAVE_ = "Save";
  LANG.TOAST_SAVE = LANG.TOAST_SAVE_;
  LANG.REORDER_SAVE_ = "Save Order";
  LANG.REORDER_SAVE = LANG.REORDER_SAVE_;
  LANG.REORDER_EDIT_ = "Reorder";
  LANG.REORDER_EDIT = LANG.REORDER_EDIT_;
  LANG.MANAGER_ITEM_ACTION_ = "Action";
  LANG.MANAGER_ITEM_ACTION = LANG.MANAGER_ITEM_ACTION_;
  LANG.MANAGER_ITEM_EDIT_ = "Edit";
  LANG.MANAGER_ITEM_EDIT = LANG.MANAGER_ITEM_EDIT_;
  LANG.MANAGER_ITEM_DEL_ = "Delete";
  LANG.MANAGER_ITEM_DEL = LANG.MANAGER_ITEM_DEL_;
  LANG.MANAGER_ITEM_DEL_QUERY_ = "Are you want to delete";
  LANG.MANAGER_ITEM_DEL_QUERY = LANG.MANAGER_ITEM_DEL_QUERY_;
  LANG.MANAGER_ITEM_DESC_ = "You can order or edit or delete item.";
  LANG.MANAGER_ITEM_DESC = LANG.MANAGER_ITEM_DESC_;
  LANG.MANAGER_ITEM_INIT_ = "Item reset to default";
  LANG.MANAGER_ITEM_INIT = LANG.MANAGER_ITEM_INIT_;
  LANG.MANAGER_ITEM_LOADING_ = "Loading...";
  LANG.MANAGER_ITEM_LOADING = LANG.MANAGER_ITEM_LOADING_;
  LANG.ITEM_TYPE_BUTTON_ = "Button";
  LANG.ITEM_TYPE_BUTTON = LANG.ITEM_TYPE_BUTTON_;
  LANG.ITEM_TYPE_TOGGLE_ = "Toggle";
  LANG.ITEM_TYPE_TOGGLE = LANG.ITEM_TYPE_TOGGLE_;
  LANG.ITEM_TYPE_SLIDER_ = "Slider";
  LANG.ITEM_TYPE_SLIDER = LANG.ITEM_TYPE_SLIDER_;
  LANG.ITEM_TYPE_GROUP_ = "Group";
  LANG.ITEM_TYPE_GROUP = LANG.ITEM_TYPE_GROUP_;
  LANG.ITEM_TYPE_CHOICE_ = "Choice";
  LANG.ITEM_TYPE_CHOICE = LANG.ITEM_TYPE_CHOICE_;
  LANG.ITEM_UI_TYPE_ = "UI Type";
  LANG.ITEM_UI_TYPE = LANG.ITEM_UI_TYPE_;
  LANG.ITEM_UI_SELECT_ = "Select Type";
  LANG.ITEM_UI_SELECT = LANG.ITEM_UI_SELECT_;
  LANG.ITEM_UI_NAME_ = "Name";
  LANG.ITEM_UI_NAME = LANG.ITEM_UI_NAME_;
  LANG.ITEM_UI_DESC_ = "Description";
  LANG.ITEM_UI_DESC = LANG.ITEM_UI_DESC_;
  LANG.ITEM_UI_GROUP_ = "Group Name";
  LANG.ITEM_UI_GROUP = LANG.ITEM_UI_GROUP_;
  LANG.ITEM_UI_CMD_ON_ = "On Bash Command";
  LANG.ITEM_UI_CMD_ON = LANG.ITEM_UI_CMD_ON_;
  LANG.ITEM_UI_CMD_OFF_ = "Off Bash Command";
  LANG.ITEM_UI_CMD_OFF = LANG.ITEM_UI_CMD_OFF_;
  LANG.ITEM_UI_MIN_ = "Min Value";
  LANG.ITEM_UI_MIN = LANG.ITEM_UI_MIN_;
  LANG.ITEM_UI_MAX_ = "Max Value";
  LANG.ITEM_UI_MAX = LANG.ITEM_UI_MAX_;
  LANG.ITEM_UI_STEP_ = "Step Value";
  LANG.ITEM_UI_STEP = LANG.ITEM_UI_STEP_;
  LANG.ITEM_UI_SCALE_ = "Scale Value";
  LANG.ITEM_UI_SCALE = LANG.ITEM_UI_SCALE_;
  LANG.ITEM_UI_UNIT_ = "Unit";
  LANG.ITEM_UI_UNIT = LANG.ITEM_UI_UNIT_;
  LANG.ITEM_UI_VALUE_ = "Bash Command($v$ is value)";
  LANG.ITEM_UI_VALUE = LANG.ITEM_UI_VALUE_;
  LANG.ITEM_UI_CMD_ = "Bash Command";
  LANG.ITEM_UI_CMD = LANG.ITEM_UI_CMD_;
  LANG.ITEM_UI_NAME1_ = "First Name";
  LANG.ITEM_UI_NAME1 = LANG.ITEM_UI_NAME1_;
  LANG.ITEM_UI_CMD1_ = "First Bash Command";
  LANG.ITEM_UI_CMD1 = LANG.ITEM_UI_CMD1_;
  LANG.ITEM_UI_NAME2_ = "Second Name";
  LANG.ITEM_UI_NAME2 = LANG.ITEM_UI_NAME2_;
  LANG.ITEM_UI_CMD2_ = "Second Bash Command";
  LANG.ITEM_UI_CMD2 = LANG.ITEM_UI_CMD2_;
  LANG.ITEM_UI_NAME3_ = "Third Name";
  LANG.ITEM_UI_NAME3 = LANG.ITEM_UI_NAME3_;
  LANG.ITEM_UI_CMD3_ = "Third Bash Command";
  LANG.ITEM_UI_CMD3 = LANG.ITEM_UI_CMD3_;
  LANG.ITEM_UI_NAME4_ = "Forth Name";
  LANG.ITEM_UI_NAME4 = LANG.ITEM_UI_NAME4_;
  LANG.ITEM_UI_CMD4_ = "Forth Bash Command";
  LANG.ITEM_UI_CMD4 = LANG.ITEM_UI_CMD4_;
  LANG.ITEM_UI_NAME5_ = "Fifth Name";
  LANG.ITEM_UI_NAME5 = LANG.ITEM_UI_NAME5_;
  LANG.ITEM_UI_CMD5_ = "Fifth Bash Command";
  LANG.ITEM_UI_CMD5 = LANG.ITEM_UI_CMD5_;
  LANG.ITEM_UI_NAME6_ = "Sixth Name";
  LANG.ITEM_UI_NAME6 = LANG.ITEM_UI_NAME6_;
  LANG.ITEM_UI_CMD6_ = "Sixth Bash Command";
  LANG.ITEM_UI_CMD6 = LANG.ITEM_UI_CMD6_;
  LANG.ITEM_UI_DELAY_ = "Delay Time(ms)";
  LANG.ITEM_UI_DELAY = LANG.ITEM_UI_DELAY_;
  LANG.ITEM_UI_CURRENT_ = "Current Bash Command";
  LANG.ITEM_UI_CURRENT = LANG.ITEM_UI_CURRENT_;
  LANG.ITEM_UI_SAVE_ = "Save";
  LANG.ITEM_UI_SAVE = LANG.ITEM_UI_SAVE_;
  LANG.ITEM_UI_EDITING_ = "Editing: ";
  LANG.ITEM_UI_EDITING = LANG.ITEM_UI_EDITING_;
  LANG.ABOUT_ITEM1_ = "Game Assist was created to easily configure system power settings in SteamOS.";
  LANG.ABOUT_ITEM1 = LANG.ABOUT_ITEM1_;
  LANG.ABOUT_ITEM2_ = "It works well with the default presets, but you can create new ones or edit/delete them if you want.";
  LANG.ABOUT_ITEM2 = LANG.ABOUT_ITEM2_;
  LANG.ABOUT_ITEM3_ = "Each item operates by executing bash commands.";
  LANG.ABOUT_ITEM3 = LANG.ABOUT_ITEM3_;
  LANG.ABOUT_ITEM4_ = "For further details, please refer to the basic items.";
  LANG.ABOUT_ITEM4 = LANG.ABOUT_ITEM4_;
  LANG.ABOUT_ITEM5_ = "Author: Hwarang, Donation: https://www.paypal.me/teslakang";
  LANG.ABOUT_ITEM5 = LANG.ABOUT_ITEM5_;
  LANG.ABOUT_ITEM6_ = "This program refers to bash-shortcuts(https://github.com/Tormak9970/bash-shortcuts) and Fanstic(https://github.com/NGnius/Fantastic).";
  LANG.ABOUT_ITEM6 = LANG.ABOUT_ITEM6_;
  LANG.FAN_SPEED_ = "Current Fan Speed";
  LANG.FAN_SPEED = LANG.FAN_SPEED_;
  LANG.FAN_TEMPER_ = "Current Temperature";
  LANG.FAN_TEMPER = LANG.FAN_TEMPER_;
  LANG.FAN_CURVE_ = "Custom Fan Curve";
  LANG.FAN_CURVE = LANG.FAN_CURVE_;
  LANG.FAN_CURVE_DESC_ = "Overrides Default fan curve";
  LANG.FAN_CURVE_DESC = LANG.FAN_CURVE_DESC_;
  LANG.FAN_LINEAR_ = "Linear Interpolation";
  LANG.FAN_LINEAR = LANG.FAN_LINEAR_;
  LANG.FAN_LINEAR_DESC_ = "Pretends a straight line connects points";
  LANG.FAN_LINEAR_DESC = LANG.FAN_LINEAR_DESC_;

  class ShortcutsState {
      constructor() {
          this.shortcuts = {};
          this.shortcutsList = [];
          this.reorderableShortcuts = [];
          this.gameAppId = "";
          this.gameDisplayName = "";
          this.visibleMap = new Map;
          this.sliderGroupMap = new Map;
          this.sliderUpdateMap = new Map;
          this.eventBus = new EventTarget();
      }
      getPublicState() {
          return {
              "shortcuts": this.shortcuts,
              "shortcutsList": this.shortcutsList,
              "reorderableShortcuts": this.reorderableShortcuts,
              "gameAppId": this.gameAppId,
              "gameDisplayName": this.gameDisplayName,
              "visibleMap": this.visibleMap,
              "sliderGroupMap": this.sliderGroupMap,
              "sliderUpdateMap": this.sliderUpdateMap
          };
      }
      setGameAppId(gameAppId) {
          this.gameAppId = gameAppId;
          this.forceUpdate();
      }
      setGameDisplayName(gameDisplayName) {
          this.gameDisplayName = gameDisplayName;
          this.forceUpdate();
      }
      setVisibleMap(visibleMap) {
          this.visibleMap = visibleMap;
          this.forceUpdate();
      }
      updateStateMap() {
          let visMap = new Map();
          for (let i = 0; i < this.shortcutsList.length; i++) {
              if (this.shortcutsList[i].type == ControlType.SLIDER && this.shortcutsList[i].group != "") {
                  this.sliderGroupMap.set(this.shortcutsList[i].group, this.shortcutsList[i]);
              }
              if (this.shortcutsList[i].type == ControlType.GROUP && this.shortcutsList[i].group != "") {
                  visMap.set(this.shortcutsList[i].group, this.shortcutsList[i].checked == 1);
              }
              if (this.shortcutsList[i].type == ControlType.SLIDER || this.shortcutsList[i].type == ControlType.CHOICE) {
                  let sliderUpdate = this.sliderUpdateMap.get(this.shortcutsList[i].id);
                  if (sliderUpdate != undefined)
                      sliderUpdate(parseFloat(this.shortcutsList[i].value));
              }
          }
          this.setVisibleMap(visMap);
      }
      updateAll() {
          this.forceUpdate();
      }
      setShortcuts(shortcuts, isSave) {
          if (shortcuts != null) {
              this.shortcuts = shortcuts;
              this.shortcutsList = Object.values(this.shortcuts).sort((a, b) => a.position - b.position);
              this.reorderableShortcuts = [];
              for (let i = 0; i < this.shortcutsList.length; i++) {
                  const shortcut = this.shortcutsList[i];
                  this.reorderableShortcuts[i] = {
                      "position": shortcut.position,
                      "label": shortcut.name,
                      "data": shortcut
                  };
              }
              this.reorderableShortcuts.sort((a, b) => a.position - b.position);
              if (isSave)
                  PyInterop.setShortcuts(this.shortcutsList);
          }
          this.forceUpdate();
      }
      forceUpdate() {
          this.eventBus.dispatchEvent(new Event("stateUpdate"));
      }
  }
  const ShortcutsContext = React.createContext(null);
  const useShortcutsState = () => React.useContext(ShortcutsContext);
  const ShortcutsContextProvider = ({ children, shortcutsStateClass }) => {
      const [publicState, setPublicState] = React.useState({
          ...shortcutsStateClass.getPublicState()
      });
      React.useEffect(() => {
          function onUpdate() {
              setPublicState({ ...shortcutsStateClass.getPublicState() });
          }
          shortcutsStateClass.eventBus.addEventListener("stateUpdate", onUpdate);
          return () => {
              shortcutsStateClass.eventBus.removeEventListener("stateUpdate", onUpdate);
          };
      }, []);
      const setShortcuts = (shortcuts, isSave) => {
          shortcutsStateClass.setShortcuts(shortcuts, isSave);
      };
      const setGameAppId = (gameAppId) => {
          shortcutsStateClass.setGameAppId(gameAppId);
      };
      const setGameDisplayName = (gameDisplayName) => {
          shortcutsStateClass.setGameDisplayName(gameDisplayName);
      };
      const setVisibleMap = (visibleMap) => {
          shortcutsStateClass.setVisibleMap(visibleMap);
      };
      const updateStateMap = () => {
          shortcutsStateClass.updateStateMap();
      };
      const updateAll = () => {
          shortcutsStateClass.updateAll();
      };
      return (window.SP_REACT.createElement(ShortcutsContext.Provider, { value: {
              ...publicState,
              setShortcuts,
              setGameAppId,
              setGameDisplayName,
              setVisibleMap,
              updateStateMap,
              updateAll,
          } }, children));
  };

  function Setting(props) {
      const { updateAll } = useShortcutsState();
      const [selectedOption, setSelectOption] = React.useState(1);
      const options = [
          {
              data: 1,
              label: LANG.SETTING_LANG_AUTO,
          },
          {
              data: 2,
              label: "한국어",
          },
          {
              data: 3,
              label: "English",
          },
      ];
      PyInterop.getLocale().then(res => {
          if (res.success) {
              let loc = res.result;
              if (loc.indexOf("ko") >= 0 || loc.indexOf("KR") >= 0)
                  setSelectOption(2);
              else if (loc.indexOf("en") >= 0 || loc.indexOf("US") >= 0)
                  setSelectOption(3);
          }
      });
      function setLanguage(num) {
          let Lang = "";
          if (num == 1)
              Lang = "";
          else if (num == 2)
              Lang = "ko_KR";
          else if (num == 3)
              Lang = "en_US";
          PyInterop.setLocale(Lang);
          LANG.setLocale(Lang);
          props.onChange();
          updateAll();
      }
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
			.scoper .${deckyFrontendLib.quickAccessControlsClasses.PanelSection} {
				width: inherit;
				height: inherit;
				padding: 0px;
			}
		`),
          window.SP_REACT.createElement("div", { className: "scoper" },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.DropdownItem, { rgOptions: options, label: "Language", strDefaultLabel: "Select language", selectedOption: selectedOption, onChange: (data) => { setLanguage(data.data); } }))))));
  }

  function HandyGCCS() {
      let buttonCommands = ["ALT_TAB", "ESC", "KILL", "MODE", "OPEN_CHIMERA", "OSK", "OSK_DE", "OSK_NES",
          "QAM", "QAM_NES", "SCR", "TOGGLE_PERFORMANCE", "TOGGLE_MOUSE", "TOGGLE_GYRO"];
      const buttonOptions = [
          {
              data: 0,
              label: "ALT + TAB",
          },
          {
              data: 1,
              label: "ESC",
          },
          {
              data: 2,
              label: "KILL",
          },
          {
              data: 3,
              label: "MODE",
          },
          {
              data: 4,
              label: "Open Chimera",
          },
          {
              data: 5,
              label: "OSK(On Screen Keyboard)",
          },
          {
              data: 6,
              label: "OSK_DE",
          },
          {
              data: 7,
              label: "OSK_NES",
          },
          {
              data: 8,
              label: "QAM(Quick Access Menu)",
          },
          {
              data: 9,
              label: "QAM_NES",
          },
          {
              data: 10,
              label: "SCR(Screen Capture)",
          },
          {
              data: 11,
              label: "Toggle Performance",
          },
          {
              data: 12,
              label: "Toggle Mouse(currently don't work)",
          },
          {
              data: 13,
              label: "Toggle Gyro(currently don't work)",
          },
      ];
      const [buttonState, setButtonState] = React.useState([]);
      if (buttonState.length == 0) {
          for (let i = 0; i < 9; i++) {
              PyInterop.getHandyGCCS("button" + (i + 1).toString()).then(res => {
                  if (res.success) {
                      let cmd = res.result;
                      let idx = buttonCommands.indexOf(cmd);
                      buttonState.push(idx);
                      setButtonState([...buttonState]);
                  }
              });
          }
      }
      function setButton(idx, num) {
          PyInterop.setHandyGCCS("button" + (idx + 1).toString(), buttonCommands[num]);
      }
      const dropdownButton = buttonState?.map((_value, index) => (window.SP_REACT.createElement(deckyFrontendLib.DropdownItem, { rgOptions: buttonOptions, label: "Button " + (index + 1).toString(), strDefaultLabel: "Select Action", selectedOption: buttonState[index], onChange: (data) => { setButton(index, data.data); } })));
      let powerCommands = ["HIBERNATE", "SHUTDOWN", "SUSPEND", "SUSPEND_THEN_HIBERNATE"];
      const powerOptions = [
          {
              data: 0,
              label: "Hibernate",
          },
          {
              data: 1,
              label: "Shutdown",
          },
          {
              data: 2,
              label: "Suspend",
          },
          {
              data: 3,
              label: "Suspend then hibernate",
          },
      ];
      const [powerState, setPowerState] = React.useState([]);
      const powerKey = ["power_button", "lid_switch"];
      const powerLabel = ["Power Button", "LID Switch"];
      if (buttonState.length == 0) { // for fix sync problem
          for (let i = 0; i < 2; i++) {
              PyInterop.getHandyGCCS(powerKey[i]).then(res => {
                  if (res.success) {
                      let cmd = res.result;
                      let idx = powerCommands.indexOf(cmd);
                      powerState.push(idx);
                      setPowerState([...powerState]);
                  }
              });
          }
      }
      function setPower(idx, num) {
          PyInterop.setHandyGCCS(powerKey[idx], powerCommands[num]);
      }
      const dropdownPower = powerState?.map((_value, index) => (window.SP_REACT.createElement(deckyFrontendLib.DropdownItem, { rgOptions: powerOptions, label: powerLabel[index], strDefaultLabel: "Select Action", selectedOption: powerState[index], onChange: (data) => { setPower(index, data.data); } })));
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
				.scoper .${deckyFrontendLib.quickAccessControlsClasses.PanelSection} {
					width: inherit;
					height: inherit;
					padding: 0px;
				}
			`),
          window.SP_REACT.createElement("div", { className: "scoper" },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, dropdownButton)),
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, dropdownPower)))));
  }

  function About() {
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("div", null, LANG.ABOUT_ITEM1),
          window.SP_REACT.createElement("div", null,
              window.SP_REACT.createElement("h3", null, LANG.ABOUT_ITEM2),
              window.SP_REACT.createElement("div", null, LANG.ABOUT_ITEM3),
              window.SP_REACT.createElement("div", null, LANG.ABOUT_ITEM4)),
          window.SP_REACT.createElement("br", null),
          window.SP_REACT.createElement("div", null, LANG.ABOUT_ITEM5),
          window.SP_REACT.createElement("br", null),
          window.SP_REACT.createElement("div", null, LANG.ABOUT_ITEM6)));
  }

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  const byteToHex = [];

  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }

  function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native = {
    randomUUID
  };

  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }

    options = options || {};
    const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return unsafeStringify(rnds);
  }

  function AddShortcut() {
      const { shortcuts, setShortcuts, shortcutsList } = useShortcutsState();
      const [ableToSave, setAbleToSave] = React.useState(false);
      const [selectedOption, setSelectedOption] = React.useState(1);
      const [name, setName] = React.useState("");
      const [desc, setDesc] = React.useState("");
      const [group, setGroup] = React.useState("");
      const [timeout, setTimeout] = React.useState("1000");
      const [current, setCurrent] = React.useState("");
      const [cmd, setCmd] = React.useState("");
      const [name1, setName1] = React.useState("");
      const [cmd1, setCmd1] = React.useState("");
      const [name2, setName2] = React.useState("");
      const [cmd2, setCmd2] = React.useState("");
      const [name3, setName3] = React.useState("");
      const [cmd3, setCmd3] = React.useState("");
      const [name4, setName4] = React.useState("");
      const [cmd4, setCmd4] = React.useState("");
      const [name5, setName5] = React.useState("");
      const [cmd5, setCmd5] = React.useState("");
      const [name6, setName6] = React.useState("");
      const [cmd6, setCmd6] = React.useState("");
      const [minValue, setMinValue] = React.useState("1");
      const [maxValue, setMaxValue] = React.useState("100");
      const [stepValue, setStepValue] = React.useState("1");
      const [scaleValue, setScaleValue] = React.useState("1");
      const [suffix, setSuffix] = React.useState("");
      const options = [
          {
              data: 1,
              label: LANG.ITEM_TYPE_BUTTON,
          },
          {
              data: 2,
              label: LANG.ITEM_TYPE_TOGGLE,
          },
          {
              data: 3,
              label: LANG.ITEM_TYPE_SLIDER,
          },
          {
              data: 4,
              label: LANG.ITEM_TYPE_GROUP,
          },
          {
              data: 5,
              label: LANG.ITEM_TYPE_CHOICE,
          },
      ];
      const [ITEM_UI_TYPE] = React.useState(LANG.ITEM_UI_TYPE);
      const [ITEM_UI_SELECT] = React.useState(LANG.ITEM_UI_SELECT);
      const [ITEM_UI_NAME] = React.useState(LANG.ITEM_UI_NAME);
      const [ITEM_UI_DESC] = React.useState(LANG.ITEM_UI_DESC);
      const [ITEM_UI_GROUP] = React.useState(LANG.ITEM_UI_GROUP);
      const [ITEM_UI_CMD_ON] = React.useState(LANG.ITEM_UI_CMD_ON);
      const [ITEM_UI_CMD_OFF] = React.useState(LANG.ITEM_UI_CMD_OFF);
      const [ITEM_UI_MIN] = React.useState(LANG.ITEM_UI_MIN);
      const [ITEM_UI_MAX] = React.useState(LANG.ITEM_UI_MAX);
      const [ITEM_UI_STEP] = React.useState(LANG.ITEM_UI_STEP);
      const [ITEM_UI_SCALE] = React.useState(LANG.ITEM_UI_SCALE);
      const [ITEM_UI_UNIT] = React.useState(LANG.ITEM_UI_UNIT);
      const [ITEM_UI_VALUE] = React.useState(LANG.ITEM_UI_VALUE);
      const [ITEM_UI_NAME1] = React.useState(LANG.ITEM_UI_NAME1);
      const [ITEM_UI_CMD1] = React.useState(LANG.ITEM_UI_CMD1);
      const [ITEM_UI_NAME2] = React.useState(LANG.ITEM_UI_NAME2);
      const [ITEM_UI_CMD2] = React.useState(LANG.ITEM_UI_CMD2);
      const [ITEM_UI_NAME3] = React.useState(LANG.ITEM_UI_NAME3);
      const [ITEM_UI_CMD3] = React.useState(LANG.ITEM_UI_CMD3);
      const [ITEM_UI_NAME4] = React.useState(LANG.ITEM_UI_NAME4);
      const [ITEM_UI_CMD4] = React.useState(LANG.ITEM_UI_CMD4);
      const [ITEM_UI_NAME5] = React.useState(LANG.ITEM_UI_NAME5);
      const [ITEM_UI_CMD5] = React.useState(LANG.ITEM_UI_CMD5);
      const [ITEM_UI_NAME6] = React.useState(LANG.ITEM_UI_NAME6);
      const [ITEM_UI_CMD6] = React.useState(LANG.ITEM_UI_CMD6);
      const [ITEM_UI_CMD] = React.useState(LANG.ITEM_UI_CMD);
      const [ITEM_UI_DELAY] = React.useState(LANG.ITEM_UI_DELAY);
      const [ITEM_UI_CURRENT] = React.useState(LANG.ITEM_UI_CURRENT);
      function saveShortcut() {
          let newShort = new Shortcut(v4(), name, cmd, shortcutsList.length + 1);
          // common
          newShort.type = GetControlType(selectedOption);
          newShort.desc = desc;
          newShort.group = group;
          newShort.timeout = timeout;
          newShort.current = current;
          // button
          newShort.name1 = name1;
          newShort.cmd1 = cmd1;
          newShort.name2 = name2;
          newShort.cmd2 = cmd2;
          newShort.name3 = name3;
          newShort.cmd3 = cmd3;
          newShort.name4 = name4;
          newShort.cmd4 = cmd4;
          newShort.name5 = name5;
          newShort.cmd5 = cmd5;
          newShort.name6 = name6;
          newShort.cmd6 = cmd6;
          // toggle
          newShort.checked = -1;
          // slider
          newShort.min = minValue;
          newShort.max = maxValue;
          newShort.step = stepValue;
          newShort.scale = scaleValue;
          newShort.value = "-1";
          newShort.suffix = suffix;
          setName("");
          setDesc("");
          setGroup("");
          setTimeout("");
          setCurrent("");
          setCmd("");
          setName1("");
          setCmd1("");
          setName2("");
          setCmd2("");
          setMinValue("1");
          setMaxValue("100");
          setStepValue("1");
          setScaleValue("1");
          setSuffix("");
          PyInterop.toast(LANG.TOAST_SUCCESS, LANG.TOAST_SAVE);
          const ref = { ...shortcuts };
          ref[newShort.id] = newShort;
          setShortcuts(ref, true);
      }
      React.useEffect(() => {
          let type = GetControlType(selectedOption);
          if (type == ControlType.BUTTON)
              setAbleToSave(name != "" && cmd != ""); // button
          else if (type == ControlType.TOGGLE)
              setAbleToSave(name != "" && cmd != "" && cmd1 != ""); // toggle
          else if (type == ControlType.SLIDER)
              setAbleToSave(name != "" && cmd != ""); // slider
          else if (type == ControlType.GROUP)
              setAbleToSave(name != "" && group != ""); // group
          else if (type == ControlType.CHOICE)
              setAbleToSave(name != "" && name1 != ""); // choice
          else
              setAbleToSave(false); // none
      }, [selectedOption, name, group, cmd, cmd1]);
      let type = GetControlType(selectedOption);
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
			.scoper .${deckyFrontendLib.quickAccessControlsClasses.PanelSection} {
				width: inherit;
				height: inherit;
				padding: 0px;
			}
		`),
          window.SP_REACT.createElement("div", { className: "scoper" },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.DropdownItem, { rgOptions: options, label: ITEM_UI_TYPE, strDefaultLabel: ITEM_UI_SELECT, selectedOption: selectedOption, onChange: (data) => { setSelectedOption(data.data); } })),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name, onChange: (e) => { setName(e?.target.value); } }) })),
                  type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
                      window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_DESC, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: desc, onChange: (e) => { setDesc(e?.target.value); } }) }))
                      : null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_GROUP, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: group, onChange: (e) => { setGroup(e?.target.value); } }) })),
                  type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
                      window.SP_REACT.createElement(React.Fragment, null,
                          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD_OFF, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })),
                          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD_ON, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) })))
                      : type == ControlType.SLIDER ? // Slider
                          window.SP_REACT.createElement(React.Fragment, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_MIN, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: minValue, onChange: (e) => { setMinValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_MAX, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: maxValue, onChange: (e) => { setMaxValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_STEP, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: stepValue, onChange: (e) => { setStepValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_SCALE, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: scaleValue, onChange: (e) => { setScaleValue(e?.target.value); } }) }))),
                              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_UNIT, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: suffix, onChange: (e) => { setSuffix(e?.target.value); } }) })),
                              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_VALUE, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })))
                          : type == ControlType.CHOICE ? // Choice
                              window.SP_REACT.createElement(React.Fragment, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME1, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name1, onChange: (e) => { setName1(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD1, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name2, onChange: (e) => { setName2(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd2, onChange: (e) => { setCmd2(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name3, onChange: (e) => { setName3(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd3, onChange: (e) => { setCmd3(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME4, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name4, onChange: (e) => { setName4(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD4, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd4, onChange: (e) => { setCmd4(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME5, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name5, onChange: (e) => { setName5(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD5, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd5, onChange: (e) => { setCmd5(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME6, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name6, onChange: (e) => { setName6(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD6, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd6, onChange: (e) => { setCmd6(e?.target.value); } }) }))))
                              :
                                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) }),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name1, onChange: (e) => { setName1(e?.target.value); } }) })),
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) }))),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name2, onChange: (e) => { setName2(e?.target.value); } }) })),
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd2, onChange: (e) => { setCmd2(e?.target.value); } }) })))),
                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_DELAY, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: timeout, onChange: (e) => { setTimeout(e?.target.value); } }) }),
                  type != ControlType.BUTTON ? // not Button
                      window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CURRENT, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: current, onChange: (e) => { setCurrent(e?.target.value); } }) }))
                      : null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: saveShortcut, disabled: !ableToSave, bottomSeparator: 'none' }, LANG.ITEM_UI_SAVE))))));
  }

  class ShortcutManager {
      static async launchShortcut(cmd, title) {
          const res = await PyInterop.runProgram(cmd);
          const status = typeof res.result == "boolean" && res.result;
          if (!status) {
              PyInterop.toast(title, LANG.TOAST_ERROR);
          }
          return status;
      }
  }

  function getLaunchCommand(shortcut, index) {
      var cmd = shortcut.cmd;
      if (shortcut.type == ControlType.GROUP && shortcut.checked)
          cmd = shortcut.cmd1;
      else if (shortcut.type == ControlType.TOGGLE && shortcut.checked)
          cmd = shortcut.cmd1;
      else if (shortcut.type == ControlType.SLIDER) {
          let val = parseFloat(shortcut.value);
          let scale = parseFloat(shortcut.scale);
          let str = String(val * scale);
          cmd = cmd.replace(/\$v\$/gi, str);
      }
      else if (shortcut.type == ControlType.BUTTON) {
          if (index == 1)
              cmd = shortcut.cmd1;
          else if (index == 2)
              cmd = shortcut.cmd2;
      }
      else if (shortcut.type == ControlType.CHOICE) {
          if (index == 0)
              cmd = shortcut.cmd1;
          else if (index == 1)
              cmd = shortcut.cmd2;
          else if (index == 2)
              cmd = shortcut.cmd3;
          else if (index == 3)
              cmd = shortcut.cmd4;
          else if (index == 4)
              cmd = shortcut.cmd5;
          else if (index == 5)
              cmd = shortcut.cmd6;
      }
      return cmd;
  }
  function getTitle(shortcut, index) {
      let title = shortcut.name;
      if (shortcut.type == ControlType.GROUP || shortcut.type == ControlType.TOGGLE) {
          if (shortcut.checked)
              title = title + ' on';
          else
              title = title + ' off';
      }
      else if (shortcut.type == ControlType.SLIDER) {
          title = title + ' ' + shortcut.value + shortcut.suffix;
      }
      else if (shortcut.type == ControlType.BUTTON) {
          if (index == 1)
              title = shortcut.name1;
          else if (index == 2)
              title = shortcut.name2;
      }
      else if (shortcut.type == ControlType.CHOICE) {
          if (index == 0)
              title = shortcut.name1;
          else if (index == 1)
              title = shortcut.name2;
          else if (index == 2)
              title = shortcut.name3;
          else if (index == 3)
              title = shortcut.name4;
          else if (index == 4)
              title = shortcut.name5;
          else if (index == 5)
              title = shortcut.name6;
      }
      return title;
  }
  async function runShortcut(cmd, title) {
      ShortcutManager.launchShortcut(cmd, title);
  }
  var timerID = undefined;
  function LaunchShortcut(cmd, title) {
      timerID = undefined;
      runShortcut(cmd, title);
  }
  function parseValue(num, def = -1) {
      let ret = parseFloat(num);
      if (ret == Number.NaN)
          ret = 0;
      if (ret < 0 && def >= 0)
          ret = def;
      return ret;
  }
  function RunShortcut(shortcut, sliderGroupMap, sliderUpdateMap, index = 0) {
      let cmd = getLaunchCommand(shortcut, index);
      if (cmd.length > 0) {
          let title = getTitle(shortcut, index);
          let timeout = parseValue(shortcut.timeout, 1000);
          if (shortcut.timeout.length == 0 || timeout <= 0) {
              LaunchShortcut(cmd, title);
          }
          else {
              if (timerID != undefined)
                  clearTimeout(timerID);
              timerID = setTimeout(LaunchShortcut, timeout, cmd, title);
          }
          if (shortcut.type == ControlType.BUTTON && shortcut.group != "") {
              let shortCut = sliderGroupMap.get(shortcut.group);
              if (shortCut != undefined) {
                  let value = shortCut.value;
                  if (index == 2)
                      value = String(parseValue(shortcut.name2, parseValue(shortCut.value, 0)));
                  else if (index == 1)
                      value = String(parseValue(shortcut.name1, parseValue(shortCut.value, 0)));
                  else
                      value = String(parseValue(shortcut.name, parseValue(shortCut.value, 0)));
                  if (value != shortCut.value) {
                      shortCut.value = value;
                      PyInterop.modShortcut(shortCut);
                      let sliderUpdate = sliderUpdateMap.get(shortcut.group);
                      if (sliderUpdate != undefined) {
                          sliderUpdate(parseFloat(shortCut.value));
                      }
                  }
              }
          }
      }
  }
  function ShortcutLauncher(props) {
      const { visibleMap, setVisibleMap, sliderGroupMap, sliderUpdateMap } = useShortcutsState();
      if (props.shortcut.type == ControlType.GROUP) {
          return (window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { checked: props.shortcut.checked == 1, label: props.shortcut.name, description: props.shortcut.desc, onChange: (value) => {
                  props.shortcut.checked = value ? 1 : 0;
                  PyInterop.modShortcut(props.shortcut);
                  RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                  if (value)
                      PyInterop.runShortcuts(props.shortcut.group);
                  let newMap = new Map(visibleMap);
                  newMap.set(props.shortcut.group, value);
                  setVisibleMap(newMap);
              } }));
      }
      else if (props.shortcut.group == "" || visibleMap.get(props.shortcut.group) == true) {
          if (props.shortcut.type == ControlType.TOGGLE) {
              return (window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { checked: props.shortcut.checked == 1, label: props.shortcut.name, description: props.shortcut.desc, onChange: (value) => {
                      props.shortcut.checked = value ? 1 : 0;
                      PyInterop.modShortcut(props.shortcut);
                      RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                  } }));
          }
          else if (props.shortcut.type == ControlType.SLIDER) {
              const [sliderValue, setSliderValue] = React.useState(parseValue(props.shortcut.value, parseValue(props.shortcut.min) + Math.round((parseValue(props.shortcut.max) - parseFloat(props.shortcut.min)) / 2)));
              sliderUpdateMap.set(props.shortcut.id, setSliderValue);
              if (props.shortcut.group != "")
                  sliderUpdateMap.set(props.shortcut.group, setSliderValue);
              return (window.SP_REACT.createElement(deckyFrontendLib.SliderField, { label: props.shortcut.name, valueSuffix: props.shortcut.suffix, value: sliderValue, step: parseFloat(props.shortcut.step), min: parseFloat(props.shortcut.min), max: parseFloat(props.shortcut.max), showValue: true, onChange: (value) => {
                      if (props.shortcut.value != String(value)) {
                          props.shortcut.value = String(value);
                          setSliderValue(value);
                          PyInterop.modShortcut(props.shortcut);
                          RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                      }
                  } }));
          }
          else if (props.shortcut.type == ControlType.CHOICE) {
              let notchCount = 0;
              let notchLabel = new Array(0);
              let items = [props.shortcut.name1, props.shortcut.name2, props.shortcut.name3, props.shortcut.name4,
                  props.shortcut.name5, props.shortcut.name6];
              for (let i = 0; i < 6; i++) {
                  if (items[i] != '') {
                      let item = {
                          notchIndex: i,
                          label: items[i],
                          value: i
                      };
                      notchLabel = notchLabel.concat(item);
                      notchCount++;
                  }
                  else
                      break;
              }
              const [sliderValue, setSliderValue] = React.useState(parseValue(props.shortcut.value));
              sliderUpdateMap.set(props.shortcut.id, setSliderValue);
              if (props.shortcut.group != "")
                  sliderUpdateMap.set(props.shortcut.group, setSliderValue);
              return (window.SP_REACT.createElement(deckyFrontendLib.SliderField, { label: props.shortcut.name, valueSuffix: props.shortcut.suffix, min: 0, max: notchCount - 1, value: sliderValue, notchCount: notchCount, notchLabels: notchLabel, showValue: false, onChange: (value) => {
                      if (props.shortcut.value != String(value)) {
                          props.shortcut.value = String(value);
                          setSliderValue(value);
                          PyInterop.modShortcut(props.shortcut);
                          RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, value);
                      }
                  } }));
          }
          else {
              let buttonCount = 1;
              if (props.shortcut.name1 != '')
                  buttonCount++;
              if (props.shortcut.name2 != '')
                  buttonCount++;
              if (buttonCount == 1) {
                  return (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: () => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap) }, props.shortcut.name)));
              }
              else {
                  let percent = 100 / buttonCount;
                  let btn0 = window.SP_REACT.createElement(React.Fragment, null);
                  let btn1 = window.SP_REACT.createElement(React.Fragment, null);
                  let btn2 = window.SP_REACT.createElement(React.Fragment, null);
                  btn0 = window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { style: { width: { percent } + '%', minWidth: 0 }, onClick: () => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap) }, props.shortcut.name);
                  if (props.shortcut.name1 != '') {
                      btn1 = window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { style: { width: { percent } + '%', minWidth: 0 }, onClick: () => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, 1) }, props.shortcut.name1);
                  }
                  if (props.shortcut.name2 != '') {
                      btn2 = window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { style: { width: { percent } + '%', minWidth: 0 }, onClick: () => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, 2) }, props.shortcut.name2);
                  }
                  return (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, "flow-childen": "horizontal" },
                          btn0,
                          btn1,
                          btn2)));
              }
          }
      }
      return null;
  }

  // from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  const Canvas = (props) => {
      const { draw, options, ...rest } = props;
      //const { context, ...moreConfig } = options;
      const canvasRef = useCanvas(draw);
      return window.SP_REACT.createElement("canvas", { ref: canvasRef, ...rest });
  };
  var canvasFan = null;
  const useCanvas = (draw) => {
      const canvasRef = React.useRef(null);
      React.useEffect(() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          let frameCount = 0;
          let animationFrameId;
          const render = () => {
              frameCount++;
              draw(context, frameCount);
              animationFrameId = window.requestAnimationFrame(render);
          };
          render();
          return () => {
              window.cancelAnimationFrame(animationFrameId);
          };
      }, [draw]);
      canvasFan = canvasRef;
      return canvasRef;
  };
  const POINT_SIZE = 13;
  var periodicHook = null;
  function FanControl(valueType) {
      const [firstTime, setFirstTime] = React.useState(true);
      const [enabledGlobal, setEnableInternal] = React.useState(false);
      const [interpolGlobal, setInterpolInternal] = React.useState(true);
      const [curveGlobal, setCurveInternal] = React.useState([]);
      const [temperatureGlobal, setTemperature] = React.useState(0);
      const [fanRpmGlobal, setFanRpm] = React.useState(0);
      function setEnable(enable) {
          setEnableInternal(enable);
          PyInterop.setCustomFanControl(enable);
      }
      function setInterpol(enable) {
          setInterpolInternal(enable);
          PyInterop.setLinearFanControl(enable);
      }
      function setCurve(items) {
          items.sort((n1, n2) => n1.x - n2.x);
          for (let i = 0; i < items.length; i++) {
              if (items[i].x < 0)
                  items[i].x = 0;
              if (items[i].x > 1)
                  items[i].x = 1;
              if (items[i].y < 0)
                  items[i].y = 0;
              if (items[i].y > 1)
                  items[i].y = 1;
          }
          setCurveInternal(items);
          PyInterop.setFanCurveItems(items);
      }
      function setEnableSafe(enable) {
          if (enable != null) {
              setEnableInternal(enable);
          }
      }
      function setInterpolSafe(enable) {
          if (enable != null) {
              setInterpolInternal(enable);
          }
      }
      function setCurveSafe(items) {
          if (items != null && Array.isArray(items)) {
              setCurveInternal(items);
          }
      }
      function onClickCanvas(e) {
          //PyInterop.logPrint("canvas click1 ");
          if (canvasFan == null) {
              //PyInterop.logPrint("is null ");
              return;
          }
          const rect = canvasFan.current.getBoundingClientRect();
          //PyInterop.logPrint("Target dimensions1 " + rect.width.toString() + "x" + rect.height.toString());
          //PyInterop.logPrint("canvas click2 " + e.clientX.toString() + ", " + e.clientY.toString());
          const realEvent = e.nativeEvent;
          //PyInterop.logPrint("Canvas click @ (" + realEvent.layerX.toString() + ", " + realEvent.layerY.toString() + ")");
          const target = e.currentTarget;
          //PyInterop.logPrint("Target dimensions " + target.width.toString() + "x" + target.height.toString());
          const clickX = realEvent.clientX - rect.left;
          const clickY = realEvent.clientY - rect.top;
          for (let i = 0; i < curveGlobal.length; i++) {
              const curvePoint = curveGlobal[i];
              const pointX = curvePoint.x * target.width;
              if (pointX + POINT_SIZE > clickX && pointX - POINT_SIZE < clickX) {
                  const pointY = (1 - curvePoint.y) * target.height;
                  //console.log("Clicked on point " + i.toString());
                  if (pointY + 4 > clickY && pointY - 4 < clickY)
                      curveGlobal.splice(i, 1);
                  else {
                      curvePoint.y = 1 - (clickY / target.height);
                      curveGlobal[i] = curvePoint;
                  }
                  setCurve([...curveGlobal]);
                  return;
              }
          }
          //console.log("Adding new point");
          let xx = clickX / target.width;
          xx = parseInt((xx * 14).toFixed(0)) / 14.0;
          let yy = 1 - (clickY / target.height);
          //PyInterop.logPrint("x : " + xx.toString() + " y: " + yy.toString());
          curveGlobal.push({ x: xx, y: yy });
          setCurve([...curveGlobal]);
      }
      function drawCanvas(ctx, frameCount) {
          if (frameCount % 100 > 1) {
              return;
          }
          const width = ctx.canvas.width;
          const height = ctx.canvas.height;
          ctx.strokeStyle = "#1a9fff";
          ctx.fillStyle = "#1a9fff";
          ctx.lineWidth = 2;
          ctx.lineJoin = "round";
          //ctx.beginPath();
          ctx.clearRect(0, 0, width, height);
          /*ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
          ctx.moveTo(110, 75);
          ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
          ctx.moveTo(65, 65);
          ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
          ctx.moveTo(95, 65);
          ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye*/
          //ctx.beginPath();
          //ctx.moveTo(0, height);
          // graph helper lines
          ctx.beginPath();
          ctx.strokeStyle = "#093455";
          //ctx.fillStyle = "#093455";
          const totalLines = 6;
          const lineDistance = 1 / (totalLines + 1);
          for (let i = 1; i <= totalLines; i++) {
              ctx.moveTo(lineDistance * i * width, 0);
              ctx.lineTo(lineDistance * i * width, height);
              ctx.moveTo(0, lineDistance * i * height);
              ctx.lineTo(width, lineDistance * i * height);
          }
          ctx.stroke();
          //ctx.fill();
          ctx.beginPath();
          ctx.strokeStyle = "#1a9fff";
          ctx.fillStyle = "#1a9fff";
          // axis labels
          ctx.textAlign = "center";
          ctx.rotate(-Math.PI / 2);
          ctx.fillText("Fan RPM", -height / 2, 12); // Y axis is rotated 90 degrees
          ctx.rotate(Math.PI / 2);
          ctx.fillText("Temperature", width / 2, height - 4);
          // graph data labels
          ctx.textAlign = "start"; // default
          ctx.fillText("30", 2, height - 2);
          ctx.fillText("100%", 2, 9);
          ctx.textAlign = "right";
          ctx.fillText("100°C", width - 2, height - 2);
          ctx.moveTo(0, height);
          if (interpolGlobal) {
              //ctx.beginPath();
              for (let i = 0; i < curveGlobal.length; i++) {
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  ctx.lineTo(canvasWidth, canvasHeight);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
              }
              ctx.lineTo(width, 0);
              //ctx.moveTo(width, 0);
          }
          else {
              //ctx.beginPath();
              for (let i = 0; i < curveGlobal.length - 1; i++) {
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  const canvasHeight2 = (1 - curveGlobal[i + 1].y) * height;
                  const canvasWidth2 = curveGlobal[i + 1].x * width;
                  //ctx.lineTo(canvasWidth, canvasHeight);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.lineTo(canvasWidth2, canvasHeight);
                  ctx.moveTo(canvasWidth2, canvasHeight);
                  ctx.lineTo(canvasWidth2, canvasHeight2);
              }
              if (curveGlobal.length > 0) {
                  const i = curveGlobal.length - 1;
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  //ctx.lineTo(width, 0);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.lineTo(width, canvasHeight);
                  //ctx.moveTo(width, canvasHeight);
                  //ctx.lineTo(width, 0);
                  const canvasHeight2 = (1 - curveGlobal[0].y) * height;
                  const canvasWidth2 = curveGlobal[0].x * width;
                  ctx.moveTo(canvasWidth2, canvasHeight2);
                  ctx.lineTo(canvasWidth2, height);
              }
              //ctx.moveTo(width, 0);
          }
          ctx.stroke();
          ctx.fill();
          //console.debug("Rendered fan graph canvas frame", frameCount);
          //console.debug("Drew canvas with " + curveGlobal.length.toString() + " points; " + width.toString() + "x" + height.toString());
          //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          //ctx.fillStyle = '#000000';
          //ctx.beginPath();
          //ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
          //ctx.fill();  
      }
      if (firstTime) {
          setFirstTime(false);
          PyInterop.getCustomFanControl().then(res => {
              if (res.success) {
                  try {
                      setEnableSafe(res.result);
                  }
                  catch (e) {
                  }
              }
          });
          PyInterop.getLinearFanControl().then(res => {
              if (res.success) {
                  try {
                      setInterpolSafe(res.result);
                  }
                  catch (e) {
                  }
              }
          });
          PyInterop.getFanCurveItems().then(res => {
              if (res.success) {
                  try {
                      setCurveSafe(res.result);
                  }
                  catch (e) {
                  }
              }
          });
          if (periodicHook != null) {
              clearInterval(periodicHook);
          }
          periodicHook = setInterval(function () {
              PyInterop.getCpuTemp().then(res => {
                  if (res.success)
                      setTemperature(res.result);
                  else
                      setTemperature(0);
              });
              PyInterop.getFanValue().then(res => {
                  if (res.success)
                      setFanRpm(res.result);
                  else
                      setFanRpm(0);
              });
          }, 1000);
      }
      let fanUnit = valueType.type == 2 ? " %" : " RPM";
      // TODO handle clicking on fan curve nodes
      return (window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
          valueType.type > 0 &&
              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: LANG.FAN_SPEED }, fanRpmGlobal.toFixed(0) + fanUnit)),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: LANG.FAN_TEMPER }, temperatureGlobal.toFixed(1) + " °C")),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: LANG.FAN_CURVE, description: LANG.FAN_CURVE_DESC, checked: enabledGlobal, onChange: (value) => {
                      setEnable(value);
                  } })),
          enabledGlobal &&
              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                  window.SP_REACT.createElement(Canvas, { draw: drawCanvas, width: 250, height: 220, style: {
                          "width": "250px",
                          "height": "220px",
                          "padding": "0px",
                          "border": "1px solid #1a9fff",
                          //"position":"relative",
                          "background-color": "#1a1f2c",
                          "border-radius": "4px",
                          //"margin":"auto",
                      }, onClick: (e) => onClickCanvas(e) })),
          enabledGlobal &&
              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                  window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: LANG.FAN_LINEAR, description: LANG.FAN_LINEAR_DESC, checked: interpolGlobal, onChange: (value) => {
                          setInterpol(value);
                      } }))));
  }

  /**
   * A component for creating reorderable lists.
   *
   * See an example implementation {@linkplain https://github.com/Tormak9970/Component-Testing-Plugin/blob/main/src/testing-window/ReorderableListTest.tsx here}.
   */
  function ReorderableList(props) {
      if (props.animate === undefined)
          props.animate = true;
      const [entryList, setEntryList] = React.useState(props.entries.sort((a, b) => a.position - b.position));
      const [reorderEnabled, setReorderEnabled] = React.useState(false);
      React.useEffect(() => {
          setEntryList(props.entries.sort((a, b) => a.position - b.position));
      }, [props.entries]);
      function toggleReorderEnabled() {
          let newReorderValue = !reorderEnabled;
          setReorderEnabled(newReorderValue);
          if (!newReorderValue) {
              props.onSave(entryList);
          }
      }
      function saveOnBackout(e) {
          const event = e;
          if (event.detail.button == deckyFrontendLib.GamepadButton.CANCEL && reorderEnabled) {
              setReorderEnabled(!reorderEnabled);
              props.onSave(entryList);
          }
      }
      const [REORDER_SAVE] = React.useState(LANG.REORDER_SAVE);
      const [REORDER_EDIT] = React.useState(LANG.REORDER_EDIT);
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("div", { style: {
                  width: 'inherit',
                  height: 'inherit',
                  flex: '1 1 1px',
                  scrollPadding: '48px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignContent: 'stretch',
              } },
              window.SP_REACT.createElement(deckyFrontendLib.Focusable, { onSecondaryButton: toggleReorderEnabled, onSecondaryActionDescription: reorderEnabled ? REORDER_SAVE : REORDER_EDIT, onClick: toggleReorderEnabled, onButtonDown: saveOnBackout }, entryList.map((entry) => (window.SP_REACT.createElement(ReorderableItem, { animate: props.animate, listData: entryList, entryData: entry, reorderEntryFunc: setEntryList, reorderEnabled: reorderEnabled, fieldProps: props.fieldProps }, props.interactables ? window.SP_REACT.createElement(props.interactables, { entry: entry }) : null)))))));
  }
  function ReorderableItem(props) {
      const [isSelected, _setIsSelected] = React.useState(false);
      const [isSelectedLastFrame, setIsSelectedLastFrame] = React.useState(false);
      const listEntries = props.listData;
      function onReorder(e) {
          if (!props.reorderEnabled)
              return;
          const event = e;
          const currentIdx = listEntries.findIndex((entryData) => entryData === props.entryData);
          const currentIdxValue = listEntries[currentIdx];
          if (currentIdx < 0)
              return;
          let targetPosition = -1;
          if (event.detail.button == deckyFrontendLib.GamepadButton.DIR_DOWN) {
              targetPosition = currentIdxValue.position + 1;
          }
          else if (event.detail.button == deckyFrontendLib.GamepadButton.DIR_UP) {
              targetPosition = currentIdxValue.position - 1;
          }
          if (targetPosition >= listEntries.length || targetPosition < 0)
              return;
          let otherToUpdate = listEntries.find((entryData) => entryData.position === targetPosition);
          if (!otherToUpdate)
              return;
          let currentPosition = currentIdxValue.position;
          currentIdxValue.position = otherToUpdate.position;
          otherToUpdate.position = currentPosition;
          props.reorderEntryFunc([...listEntries].sort((a, b) => a.position - b.position));
      }
      async function setIsSelected(val) {
          _setIsSelected(val);
          // Wait 3 frames, then set. I have no idea why, but if you dont wait long enough it doesn't work.
          for (let i = 0; i < 3; i++)
              await new Promise((res) => requestAnimationFrame(res));
          setIsSelectedLastFrame(val);
      }
      return (window.SP_REACT.createElement("div", { style: props.animate
              ? {
                  transition: isSelected || isSelectedLastFrame
                      ? ''
                      : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: !props.reorderEnabled || isSelected ? 'scale(1)' : 'scale(0.9)',
                  opacity: !props.reorderEnabled || isSelected ? 1 : 0.7,
              }
              : {} },
          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: props.entryData.label, ...props.fieldProps, focusable: !props.children, onButtonDown: onReorder, onGamepadBlur: () => setIsSelected(false), onGamepadFocus: () => setIsSelected(true) },
              window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', width: '100%', position: 'relative' } }, props.children))));
  }

  // THIS FILE IS AUTO GENERATED
  function FaEllipsisH (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"}}]})(props);
  }

  const EditModal = ({ closeModal, onConfirm = () => { }, shortcut, title = `${LANG.ITEM_UI_EDITING} ${shortcut.name}`, }) => {
      const [selectedOption, setSelectedOption] = React.useState(shortcut.type == ControlType.TOGGLE ? 2 : shortcut.type == ControlType.SLIDER ? 3 : shortcut.type == ControlType.GROUP ? 4 : shortcut.type == ControlType.CHOICE ? 5 : 1);
      const [name, setName] = React.useState(shortcut.name);
      const [desc, setDesc] = React.useState(shortcut.desc);
      const [group, setGroup] = React.useState(shortcut.group);
      const [timeout, setTimeout] = React.useState(shortcut.timeout);
      const [current, setCurrent] = React.useState(shortcut.current);
      const [cmd, setCmd] = React.useState(shortcut.cmd);
      const [name1, setName1] = React.useState(shortcut.name1);
      const [cmd1, setCmd1] = React.useState(shortcut.cmd1);
      const [name2, setName2] = React.useState(shortcut.name2);
      const [cmd2, setCmd2] = React.useState(shortcut.cmd2);
      const [name3, setName3] = React.useState(shortcut.name3);
      const [cmd3, setCmd3] = React.useState(shortcut.cmd3);
      const [name4, setName4] = React.useState(shortcut.name4);
      const [cmd4, setCmd4] = React.useState(shortcut.cmd4);
      const [name5, setName5] = React.useState(shortcut.name5);
      const [cmd5, setCmd5] = React.useState(shortcut.cmd5);
      const [name6, setName6] = React.useState(shortcut.name6);
      const [cmd6, setCmd6] = React.useState(shortcut.cmd6);
      const [minValue, setMinValue] = React.useState(String(shortcut.min));
      const [maxValue, setMaxValue] = React.useState(String(shortcut.max));
      const [stepValue, setStepValue] = React.useState(String(shortcut.step));
      const [scaleValue, setScaleValue] = React.useState(String(shortcut.scale));
      const [suffix, setSuffix] = React.useState(shortcut.suffix);
      const options = [
          {
              data: 1,
              label: LANG.ITEM_TYPE_BUTTON,
          },
          {
              data: 2,
              label: LANG.ITEM_TYPE_TOGGLE,
          },
          {
              data: 3,
              label: LANG.ITEM_TYPE_SLIDER,
          },
          {
              data: 4,
              label: LANG.ITEM_TYPE_GROUP,
          },
          {
              data: 5,
              label: LANG.ITEM_TYPE_CHOICE,
          },
      ];
      const [ITEM_UI_TYPE] = React.useState(LANG.ITEM_UI_TYPE);
      const [ITEM_UI_SELECT] = React.useState(LANG.ITEM_UI_SELECT);
      const [ITEM_UI_NAME] = React.useState(LANG.ITEM_UI_NAME);
      const [ITEM_UI_DESC] = React.useState(LANG.ITEM_UI_DESC);
      const [ITEM_UI_GROUP] = React.useState(LANG.ITEM_UI_GROUP);
      const [ITEM_UI_CMD_ON] = React.useState(LANG.ITEM_UI_CMD_ON);
      const [ITEM_UI_CMD_OFF] = React.useState(LANG.ITEM_UI_CMD_OFF);
      const [ITEM_UI_MIN] = React.useState(LANG.ITEM_UI_MIN);
      const [ITEM_UI_MAX] = React.useState(LANG.ITEM_UI_MAX);
      const [ITEM_UI_STEP] = React.useState(LANG.ITEM_UI_STEP);
      const [ITEM_UI_SCALE] = React.useState(LANG.ITEM_UI_SCALE);
      const [ITEM_UI_UNIT] = React.useState(LANG.ITEM_UI_UNIT);
      const [ITEM_UI_VALUE] = React.useState(LANG.ITEM_UI_VALUE);
      const [ITEM_UI_NAME1] = React.useState(LANG.ITEM_UI_NAME1);
      const [ITEM_UI_CMD1] = React.useState(LANG.ITEM_UI_CMD1);
      const [ITEM_UI_NAME2] = React.useState(LANG.ITEM_UI_NAME2);
      const [ITEM_UI_CMD2] = React.useState(LANG.ITEM_UI_CMD2);
      const [ITEM_UI_NAME3] = React.useState(LANG.ITEM_UI_NAME3);
      const [ITEM_UI_CMD3] = React.useState(LANG.ITEM_UI_CMD3);
      const [ITEM_UI_NAME4] = React.useState(LANG.ITEM_UI_NAME4);
      const [ITEM_UI_CMD4] = React.useState(LANG.ITEM_UI_CMD4);
      const [ITEM_UI_NAME5] = React.useState(LANG.ITEM_UI_NAME5);
      const [ITEM_UI_CMD5] = React.useState(LANG.ITEM_UI_CMD5);
      const [ITEM_UI_NAME6] = React.useState(LANG.ITEM_UI_NAME6);
      const [ITEM_UI_CMD6] = React.useState(LANG.ITEM_UI_CMD6);
      const [ITEM_UI_CMD] = React.useState(LANG.ITEM_UI_CMD);
      const [ITEM_UI_DELAY] = React.useState(LANG.ITEM_UI_DELAY);
      const [ITEM_UI_CURRENT] = React.useState(LANG.ITEM_UI_CURRENT);
      let type = GetControlType(selectedOption);
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement(deckyFrontendLib.ConfirmModal, { bAllowFullSize: true, onCancel: closeModal, onEscKeypress: closeModal, onOK: () => {
                  let updated = new Shortcut(shortcut.id, name, cmd, shortcut.position);
                  // common
                  updated.type = GetControlType(selectedOption);
                  updated.desc = desc;
                  updated.group = group;
                  updated.timeout = timeout;
                  updated.current = current;
                  // button
                  updated.name1 = name1;
                  updated.cmd1 = cmd1;
                  updated.name2 = name2;
                  updated.cmd2 = cmd2;
                  updated.name3 = name3;
                  updated.cmd3 = cmd3;
                  updated.name4 = name4;
                  updated.cmd4 = cmd4;
                  updated.name5 = name5;
                  updated.cmd5 = cmd5;
                  updated.name6 = name6;
                  updated.cmd6 = cmd6;
                  // toggle
                  updated.checked = shortcut.checked;
                  // slider
                  updated.min = minValue;
                  updated.max = maxValue;
                  updated.step = stepValue;
                  updated.scale = scaleValue;
                  updated.value = shortcut.value;
                  updated.suffix = suffix;
                  onConfirm(updated);
                  closeModal();
              } },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, { title: title },
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.DropdownItem, { rgOptions: options, label: ITEM_UI_TYPE, strDefaultLabel: ITEM_UI_SELECT, selectedOption: selectedOption, onChange: (data) => { setSelectedOption(data.data); } })),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name, onChange: (e) => { setName(e?.target.value); } }) })),
                  type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
                      window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_DESC, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: desc, onChange: (e) => { setDesc(e?.target.value); } }) }))
                      : null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_GROUP, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: group, onChange: (e) => { setGroup(e?.target.value); } }) })),
                  type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
                      window.SP_REACT.createElement(React.Fragment, null,
                          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD_OFF, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })),
                          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD_ON, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) })))
                      : type == ControlType.SLIDER ? // Slider
                          window.SP_REACT.createElement(React.Fragment, null,
                              window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_MIN, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: minValue, onChange: (e) => { setMinValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_MAX, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: maxValue, onChange: (e) => { setMaxValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_STEP, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: stepValue, onChange: (e) => { setStepValue(e?.target.value); } }) })),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '25%', minWidth: 0 } },
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_SCALE, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: scaleValue, onChange: (e) => { setScaleValue(e?.target.value); } }) }))),
                              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_UNIT, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: suffix, onChange: (e) => { setSuffix(e?.target.value); } }) })),
                              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_VALUE, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })))
                          : type == ControlType.CHOICE ? // Choice
                              window.SP_REACT.createElement(React.Fragment, null,
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME1, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name1, onChange: (e) => { setName1(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD1, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name2, onChange: (e) => { setName2(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd2, onChange: (e) => { setCmd2(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name3, onChange: (e) => { setName3(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd3, onChange: (e) => { setCmd3(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME4, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name4, onChange: (e) => { setName4(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD4, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd4, onChange: (e) => { setCmd4(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME5, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name5, onChange: (e) => { setName5(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD5, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd5, onChange: (e) => { setCmd5(e?.target.value); } }) }))),
                                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME6, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name6, onChange: (e) => { setName6(e?.target.value); } }) })),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD6, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd6, onChange: (e) => { setCmd6(e?.target.value); } }) }))))
                              :
                                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                                      window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) }),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name1, onChange: (e) => { setName1(e?.target.value); } }) })),
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD2, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd1, onChange: (e) => { setCmd1(e?.target.value); } }) }))),
                                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '30%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_NAME3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: name2, onChange: (e) => { setName2(e?.target.value); } }) })),
                                          window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { width: '70%', minWidth: 0 } },
                                              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CMD3, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: cmd2, onChange: (e) => { setCmd2(e?.target.value); } }) })))),
                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_DELAY, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { mustBeNumeric: true, label: '', value: timeout, onChange: (e) => { setTimeout(e?.target.value); } }) }),
                  type != ControlType.BUTTON ? // not Button
                      window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                          window.SP_REACT.createElement(deckyFrontendLib.Field, { label: ITEM_UI_CURRENT, description: window.SP_REACT.createElement(deckyFrontendLib.TextField, { label: '', value: current, onChange: (e) => { setCurrent(e?.target.value); } }) }))
                      : null))));
  };

  function ManageShortcuts() {
      const { shortcuts, setShortcuts, shortcutsList, reorderableShortcuts } = useShortcutsState();
      const count = React.useRef(0);
      const ActionButton = (props) => {
          function onAction(entryReference) {
              const shortcut = entryReference.data;
              deckyFrontendLib.showContextMenu(window.SP_REACT.createElement(deckyFrontendLib.Menu, { label: LANG.MANAGER_ITEM_ACTION },
                  window.SP_REACT.createElement(deckyFrontendLib.MenuItem, { onSelected: () => {
                          deckyFrontendLib.showModal(
                          // @ts-ignore
                          window.SP_REACT.createElement(EditModal, { onConfirm: (updated) => {
                                  let shorts = shortcuts;
                                  shorts[shortcut.id] = updated;
                                  setShortcuts(shorts, true);
                              }, shortcut: shortcut }));
                      } }, LANG.MANAGER_ITEM_EDIT),
                  window.SP_REACT.createElement(deckyFrontendLib.MenuItem, { onSelected: () => {
                          deckyFrontendLib.showModal(window.SP_REACT.createElement(deckyFrontendLib.ConfirmModal, { onOK: () => {
                                  let shorts = shortcuts;
                                  delete shorts[shortcut.id];
                                  setShortcuts(shorts, true);
                              }, bDestructiveWarning: true }, LANG.MANAGER_ITEM_DEL_QUERY));
                      } }, LANG.MANAGER_ITEM_DEL)), window);
          }
          return (window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { style: { height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }, onClick: () => onAction(props.entry), onOKButton: () => onAction(props.entry) },
              window.SP_REACT.createElement(FaEllipsisH, null)));
      };
      async function reloadDefault() {
          await PyInterop.defGetShortcuts().then((res) => {
              setShortcuts(res.result, false);
              if (res.success)
                  PyInterop.toast(LANG.TOAST_SUCCESS, LANG.MANAGER_ITEM_INIT);
          });
      }
      function onSave(entries) {
          const data = {};
          for (const entry of entries) {
              data[entry.data.id] = { ...entry.data, "position": entry.position };
          }
          setShortcuts(data, true);
      }
      const Interactables = (props) => {
          return (window.SP_REACT.createElement(React.Fragment, null,
              window.SP_REACT.createElement(ActionButton, { entry: props.entry })));
      };
      if (shortcutsList.length === 0 && count.current < 10) {
          reloadDefault();
          count.current++;
      }
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("div", { style: {
                  marginBottom: "5px"
              } }, LANG.MANAGER_ITEM_DESC),
          shortcutsList.length > 0 ? (window.SP_REACT.createElement(React.Fragment, null,
              window.SP_REACT.createElement(ReorderableList, { entries: reorderableShortcuts, onSave: onSave, interactables: Interactables }),
              window.SP_REACT.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: reloadDefault }, LANG.MANAGER_ITEM_INIT))) : (window.SP_REACT.createElement("div", { style: { width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" } }, LANG.MANAGER_ITEM_LOADING))));
  }

  class SteamController {
      static registerForAllAppLifetimeNotifications(callback) {
          return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data) => {
              callback(data.unAppID, data);
          });
      }
  }

  // https://chinsun9.github.io/2021/02/17/react%EC%97%90%EC%84%9C-Map%EC%9D%84-state%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%A0-%EB%95%8C/
  // https://songzzi.github.io/2021/11/21/react-2/
  const StringFormat = (str, ...args) => str.replace(/{(\d+)}/g, (_match, index) => args[index] || '');
  const ShortcutsContent = () => {
      const { shortcuts, setShortcuts, shortcutsList, gameAppId, gameDisplayName, visibleMap, sliderUpdateMap, updateStateMap } = useShortcutsState();
      if (Object.values(shortcuts).length === 0) {
          PyInterop.getShortcuts().then(res => {
              setShortcuts(res.result, false);
              updateStateMap();
          });
      }
      const [useGameProfile, setUseGameProfile] = React.useState(false);
      const [PROFILE_TITLE, setProfileTitle] = React.useState(LANG.PROFILE_TITLE);
      const [PROFILE_DESC, setProfileDesc] = React.useState(StringFormat(LANG.PROFILE_USING, LANG.PROFILE_DEFAULT));
      const [PROFILE_USE_GAME, setProfileGame] = React.useState(LANG.PROFILE_USE_GAME);
      let gameProfileSetting = window.SP_REACT.createElement(React.Fragment, null);
      let keyUseGameProfile = "__useGameProfile";
      visibleMap.set(keyUseGameProfile, useGameProfile);
      sliderUpdateMap.set("100", setProfileTitle);
      sliderUpdateMap.set("101", setProfileDesc);
      sliderUpdateMap.set("102", setProfileGame);
      if (gameAppId != "") {
          let keyName = "useGameProfile-" + gameAppId;
          PyInterop.getGlobalSetting(keyName).then((res) => {
              if (typeof res.result == "string") {
                  let use = res.result == "1";
                  setUseGameProfile(use);
                  visibleMap.set(keyUseGameProfile, use);
                  if (use)
                      setProfileDesc(StringFormat(LANG.PROFILE_USING, gameDisplayName));
              }
          });
          gameProfileSetting = window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { checked: useGameProfile, label: PROFILE_USE_GAME, onChange: (value) => {
                  setUseGameProfile(value);
                  PyInterop.setGlobalSetting(keyName, value == true ? "1" : "0");
                  PyInterop.setSteamAppId(value ? gameAppId : "0");
                  PyInterop.getShortcuts().then(res => {
                      setShortcuts(res.result, false);
                      updateStateMap();
                      PyInterop.runShortcuts("");
                  });
              } });
      }
      const [fanValueType, setFanValueType] = React.useState(-1);
      PyInterop.getFanValueType().then(res => {
          if (res.success)
              setFanValueType(res.result);
      });
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
                .styleColumn {
                    width: inherit;
                    height: inherit;
  
                    flex: 1 1 1px;
                    scroll-padding: 48px 0px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-content: stretch;
                }
                .styleColumn .${deckyFrontendLib.quickAccessControlsClasses.PanelSection} {
                    padding: 0px;
                }
                .styleColumn .${deckyFrontendLib.gamepadDialogClasses.FieldChildren} {
                    margin: 0px 16px;
                }
                .styleColumn .${deckyFrontendLib.gamepadDialogClasses.FieldDescription} {
                    margin-left: 16px;
                    margin-right: 16px;
                }
                .styleColumn .${deckyFrontendLib.gamepadDialogClasses.FieldLabel} {
                    margin-left: 16px;
                    margin-right: 16px;
                }  
            `),
          window.SP_REACT.createElement("div", { className: "styleColumn" },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, "flow-childen": "horizontal" },
                          window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { style: { width: '100%', minWidth: 0 }, onClick: () => { deckyFrontendLib.Router.CloseSideMenus(); deckyFrontendLib.Router.Navigate("/GameAssist-nav"); } },
                              window.SP_REACT.createElement("i", null,
                                  window.SP_REACT.createElement("b", null, LANG.ITEM_MANAGER_TITLE))))),
                  window.SP_REACT.createElement(deckyFrontendLib.Field, { label: PROFILE_TITLE, description: PROFILE_DESC }),
                  gameProfileSetting,
                  shortcutsList.map((item) => (window.SP_REACT.createElement(ShortcutLauncher, { shortcut: item }))),
                  fanValueType >= 0 &&
                      window.SP_REACT.createElement(FanControl, { type: fanValueType })))));
  };
  const ShortcutsManagerRouter = () => {
      const [ITEM_MANAGER_TITLE, setTitle] = React.useState(LANG.ITEM_MANAGER_TITLE);
      const [ITEM_MANAGER_SETTING, setSetting] = React.useState(LANG.ITEM_MANAGER_SETTING);
      const [ITEM_MANAGER_ADD, setAdd] = React.useState(LANG.ITEM_MANAGER_ADD);
      const [ITEM_MANAGER_EDIT, setEdit] = React.useState(LANG.ITEM_MANAGER_EDIT);
      const [ITEM_MANAGER_HANDY, setHandy] = React.useState(LANG.ITEM_MANAGER_HANDY);
      const [ITEM_MANAGER_ABOUT, setAbout] = React.useState(LANG.ITEM_MANAGER_ABOUT);
      const { gameAppId, gameDisplayName, visibleMap, sliderUpdateMap } = useShortcutsState();
      function onChange() {
          setTitle(LANG.ITEM_MANAGER_TITLE);
          setSetting(LANG.ITEM_MANAGER_SETTING);
          setAdd(LANG.ITEM_MANAGER_ADD);
          setEdit(LANG.ITEM_MANAGER_EDIT);
          setHandy(LANG.ITEM_MANAGER_HANDY);
          setAbout(LANG.ITEM_MANAGER_ABOUT);
          let setProfileTitle = sliderUpdateMap.get("100");
          let setProfileDesc = sliderUpdateMap.get("101");
          let setProfileGame = sliderUpdateMap.get("102");
          if (setProfileDesc != undefined) {
              let keyUseGameProfile = "__useGameProfile";
              let use = visibleMap.get(keyUseGameProfile);
              if (gameAppId != "" && use != undefined && use) {
                  let display = gameDisplayName;
                  setProfileDesc(StringFormat(LANG.PROFILE_USING, display));
              }
              else
                  setProfileDesc(StringFormat(LANG.PROFILE_USING, LANG.PROFILE_DEFAULT));
          }
          if (setProfileTitle != undefined)
              setProfileTitle(LANG.PROFILE_TITLE);
          if (setProfileGame != undefined)
              setProfileGame(LANG.PROFILE_USE_GAME);
      }
      const page0 = {
          title: ITEM_MANAGER_SETTING,
          content: window.SP_REACT.createElement(Setting, { onChange: onChange }),
          route: "/GameAssist-nav/setting",
      };
      const page1 = {
          title: ITEM_MANAGER_ADD,
          content: window.SP_REACT.createElement(AddShortcut, null),
          route: "/GameAssist-nav/add",
      };
      const page2 = {
          title: ITEM_MANAGER_EDIT,
          content: window.SP_REACT.createElement(ManageShortcuts, null),
          route: "/GameAssist-nav/manage",
      };
      const page3 = {
          title: ITEM_MANAGER_HANDY,
          content: window.SP_REACT.createElement(HandyGCCS, null),
          route: "/GameAssist-nav/handyGCCS",
      };
      const page4 = {
          title: ITEM_MANAGER_ABOUT,
          content: window.SP_REACT.createElement(About, null),
          route: "/GameAssist-nav/about",
      };
      const [pages, setPages] = React.useState([0, 1, 2, 4]);
      PyInterop.existHandyGCCS().then(res => {
          if (res.success) {
              if (res.result) {
                  if (pages.length == 4)
                      setPages([0, 1, 2, 3, 4]);
              }
          }
      });
      return (window.SP_REACT.createElement(deckyFrontendLib.SidebarNavigation, { title: ITEM_MANAGER_TITLE, showTitle: true, pages: pages?.map((value, _index) => {
              if (value == 0)
                  return page0;
              else if (value == 1)
                  return page1;
              else if (value == 2)
                  return page2;
              else if (value == 3)
                  return page3;
              return page4;
          }) }));
  };
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      PyInterop.setServer(serverApi);
      PyInterop.getLocale().then(res => {
          if (res.success) {
              let loc = res.result;
              LANG.setLocale(loc);
          }
      });
      const state = new ShortcutsState();
      function setGameRunning(currGameAppId, appId) {
          const gameAppId = appId.toString();
          if (currGameAppId != gameAppId) {
              const overview = window.appStore.GetAppOverviewByAppID(appId);
              if (overview != undefined && overview != null) {
                  const ov = overview;
                  state.setGameDisplayName(ov.display_name);
              }
              state.setGameAppId(gameAppId);
              let keyName = "useGameProfile-" + gameAppId;
              PyInterop.getGlobalSetting(keyName).then((res) => {
                  if (typeof res.result == "string" && res.result == "1") {
                      PyInterop.setSteamAppId(gameAppId);
                      PyInterop.getShortcuts().then(res => {
                          state.setShortcuts(res.result, false);
                          state.updateStateMap();
                          PyInterop.runShortcuts("");
                      });
                  }
              });
          }
      }
      let MainRunningApp = deckyFrontendLib.Router.MainRunningApp;
      if (MainRunningApp != null && MainRunningApp != undefined) {
          const currGameAppId = state.getPublicState().gameAppId;
          if (currGameAppId == "") {
              let appid = MainRunningApp.appid;
              const appId = parseInt(appid);
              setGameRunning(currGameAppId, appId);
          }
      }
      SteamController.registerForAllAppLifetimeNotifications((appId, data) => {
          const currGameAppId = state.getPublicState().gameAppId;
          if (data.bRunning)
              setGameRunning(currGameAppId, appId);
          else if (currGameAppId != "") {
              PyInterop.setSteamAppId("0");
              state.setGameAppId("");
              state.setGameDisplayName("");
              PyInterop.getShortcuts().then(res => {
                  state.setShortcuts(res.result, false);
                  state.updateStateMap();
                  PyInterop.runShortcuts("");
              });
          }
      });
      serverApi.routerHook.addRoute("/GameAssist-nav", () => (window.SP_REACT.createElement(ShortcutsContextProvider, { shortcutsStateClass: state },
          window.SP_REACT.createElement(ShortcutsManagerRouter, null))));
      return {
          title: window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, LANG.GAME_ASSIST),
          content: (window.SP_REACT.createElement(ShortcutsContextProvider, { shortcutsStateClass: state },
              window.SP_REACT.createElement(ShortcutsContent, null))),
          icon: window.SP_REACT.createElement(IoApps, null),
          onDismount() {
              serverApi.routerHook.removeRoute("/GameAssist-nav");
          },
          alwaysRender: true
      };
  });

  return index;

})(DFL, SP_REACT);
