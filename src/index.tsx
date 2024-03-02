import {
    DialogButton,
    ToggleField,
    Field,
    Focusable,
    definePlugin,
    gamepadDialogClasses,
    PanelSection,
    PanelSectionRow,
    quickAccessControlsClasses,
    Router,
    ServerAPI,
    SidebarNavigation,
    staticClasses,
    LifetimeNotification,
    SteamAppOverview
  } from "decky-frontend-lib";  

import { VFC, Fragment, useState } from "react";
import { IoApps } from "react-icons/io5";
import { Setting } from "./components/shortcuts-manager/Setting";
import { HandyGCCS } from "./components/shortcuts-manager/HandyGCCS";
import { About } from "./components/shortcuts-manager/About";
import { AddShortcut } from "./components/shortcuts-manager/AddShortcut";
import { ShortcutLauncher } from "./components/ShortcutLanucher";
import { FanControl } from "./components/canvas";
import { ManageShortcuts } from "./components/shortcuts-manager/ManageShortcuts";
  
import { PyInterop } from "./PyInterop";
import { Shortcut, LANG } from "./lib/data-structures/Shortcut";
import { ShortcutsContextProvider, ShortcutsState, useShortcutsState } from "./state/ShortcutsState";
import { SteamController } from "./lib/Utils";
  
// https://chinsun9.github.io/2021/02/17/react%EC%97%90%EC%84%9C-Map%EC%9D%84-state%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%A0-%EB%95%8C/
// https://songzzi.github.io/2021/11/21/react-2/
  
const StringFormat = (str: string, ...args: string[]) =>
    str.replace(/{(\d+)}/g, (_match, index) => args[index] || '')

const ShortcutsContent: VFC = () => {
    const { shortcuts, setShortcuts, shortcutsList, gameAppId, gameDisplayName, visibleMap,
        sliderUpdateMap, updateStateMap } = useShortcutsState();

    if (Object.values(shortcuts as ShortcutsDictionary).length === 0) {
        PyInterop.getShortcuts().then(res => {
            setShortcuts(res.result as ShortcutsDictionary, false);
            updateStateMap();
        });
    }

    const [useGameProfile, setUseGameProfile] = useState<boolean>(false);    
    const [PROFILE_TITLE, setProfileTitle] = useState<string>(LANG.PROFILE_TITLE);
    const [PROFILE_DESC, setProfileDesc] = useState<string>(StringFormat(LANG.PROFILE_USING, LANG.PROFILE_DEFAULT));
    const [PROFILE_USE_GAME, setProfileGame] = useState<string>(LANG.PROFILE_USE_GAME);
    let gameProfileSetting = <></>;
    let keyUseGameProfile = "__useGameProfile";

    visibleMap.set(keyUseGameProfile, useGameProfile);
    sliderUpdateMap.set("100", setProfileTitle);
    sliderUpdateMap.set("101", setProfileDesc);
    sliderUpdateMap.set("102", setProfileGame);
    if (gameAppId != "") {
        let keyName = "useGameProfile-" + gameAppId;
        PyInterop.getGlobalSetting(keyName).then((res) => {
            if (typeof res.result == "string") {
                let use = (res.result as string) == "1";

                setUseGameProfile(use);
                visibleMap.set(keyUseGameProfile, use);
                if (use) setProfileDesc(StringFormat(LANG.PROFILE_USING, gameDisplayName));
            }
        });

        gameProfileSetting = <ToggleField 
            checked = {useGameProfile}
            label = {PROFILE_USE_GAME}
            onChange = {(value: boolean) => {
                setUseGameProfile(value);
                PyInterop.setGlobalSetting(keyName, value == true ? "1" : "0");
                PyInterop.setSteamAppId(value ? gameAppId : "0");
                PyInterop.getShortcuts().then(res => {
                    setShortcuts(res.result as ShortcutsDictionary, false);
                    updateStateMap();
                    PyInterop.runShortcuts("");
                });
            }}
        />;
    }

    const [fanValueType, setFanValueType] = useState<number>(-1);
    PyInterop.getFanValueType().then(res => {
        if (res.success) setFanValueType(res.result as number);
    });

    return (
        <>
            <style>{`
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
                .styleColumn .${quickAccessControlsClasses.PanelSection} {
                    padding: 0px;
                }
                .styleColumn .${gamepadDialogClasses.FieldChildren} {
                    margin: 0px 16px;
                }
                .styleColumn .${gamepadDialogClasses.FieldDescription} {
                    margin-left: 16px;
                    margin-right: 16px;
                }
                .styleColumn .${gamepadDialogClasses.FieldLabel} {
                    margin-left: 16px;
                    margin-right: 16px;
                }  
            `}</style>
            <div className = "styleColumn">
                <PanelSection>
                    <PanelSectionRow>
                        <Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
                            <DialogButton style = {{ width: '100%', minWidth: 0 }} onClick = {() => { Router.CloseSideMenus(); Router.Navigate("/GameAssist-nav"); }} >
                                <i><b>{LANG.ITEM_MANAGER_TITLE}</b></i>
                            </DialogButton>
                        </Focusable>
                    </PanelSectionRow>
                    <Field
                        label = {PROFILE_TITLE}
                        description = {PROFILE_DESC}
                    />
                    {gameProfileSetting}
                    {
                        shortcutsList.map((item: Shortcut) => (
                            <ShortcutLauncher shortcut = {item} />
                        ))
                    }
                    {fanValueType >= 0 && 
                        <FanControl type = {fanValueType} />
                    }
                </PanelSection>
            </div>
        </>
    );
};

const ShortcutsManagerRouter: VFC = () => {
    const [ITEM_MANAGER_TITLE, setTitle] = useState<string>(LANG.ITEM_MANAGER_TITLE);
    const [ITEM_MANAGER_SETTING, setSetting] = useState<string>(LANG.ITEM_MANAGER_SETTING);    
    const [ITEM_MANAGER_ADD, setAdd] = useState<string>(LANG.ITEM_MANAGER_ADD);
    const [ITEM_MANAGER_EDIT, setEdit] = useState<string>(LANG.ITEM_MANAGER_EDIT);
    const [ITEM_MANAGER_HANDY, setHandy] = useState<string>(LANG.ITEM_MANAGER_HANDY);
    const [ITEM_MANAGER_ABOUT, setAbout] = useState<string>(LANG.ITEM_MANAGER_ABOUT);
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
            else setProfileDesc(StringFormat(LANG.PROFILE_USING, LANG.PROFILE_DEFAULT));
        }
        if (setProfileTitle != undefined) setProfileTitle(LANG.PROFILE_TITLE);        
        if (setProfileGame != undefined) setProfileGame(LANG.PROFILE_USE_GAME);        
    }

    const page0 = {
        title: ITEM_MANAGER_SETTING,
        content: <Setting onChange={onChange} />,
        route: "/GameAssist-nav/setting",                    
    };
    const page1 = {
        title: ITEM_MANAGER_ADD,
        content: <AddShortcut />,
        route: "/GameAssist-nav/add",
    };
    const page2 = {
        title: ITEM_MANAGER_EDIT,
        content: <ManageShortcuts />,
        route: "/GameAssist-nav/manage",
    };
    const page3 = {
        title: ITEM_MANAGER_HANDY,
        content: <HandyGCCS />,
        route: "/GameAssist-nav/handyGCCS",
    };
    const page4 = {
        title: ITEM_MANAGER_ABOUT,
        content: <About />,
        route: "/GameAssist-nav/about",
    };

    const [pages, setPages] = useState<number[]>([0, 1, 2, 4]);
    PyInterop.existHandyGCCS().then(res => {
        if (res.success) {
            if (res.result as boolean) {
                if (pages.length == 4) setPages([0, 1, 2, 3, 4]);
            }
        }
    });

    return (
        <SidebarNavigation
            title = {ITEM_MANAGER_TITLE}
            showTitle
            pages = {pages?.map((value: number, _index: number) => {
                if (value == 0) return page0;
                else if (value == 1) return page1;
                else if (value == 2) return page2;
                else if (value == 3) return page3;
                return page4;
            })}
        />
    );
};
  
export default definePlugin((serverApi: ServerAPI) => {
    PyInterop.setServer(serverApi);

    PyInterop.getLocale().then(res => {
        if (res.success) {
            let loc = res.result as string;

            LANG.setLocale(loc);
        }
    });

    const state = new ShortcutsState();

    function setGameRunning(currGameAppId: string, appId: number) {
        const gameAppId = appId.toString();
    
        if (currGameAppId != gameAppId) {
            const overview = window.appStore.GetAppOverviewByAppID(appId);
            if (overview != undefined && overview != null) {
                const ov = overview as SteamAppOverview;

                state.setGameDisplayName(ov.display_name);
            }
            state.setGameAppId(gameAppId);

            let keyName = "useGameProfile-" + gameAppId;
            PyInterop.getGlobalSetting(keyName).then((res) => {
                if (typeof res.result == "string" && (res.result as string) == "1") {
                    PyInterop.setSteamAppId(gameAppId);
                    PyInterop.getShortcuts().then(res => {
                        state.setShortcuts(res.result as ShortcutsDictionary, false);
                        state.updateStateMap();
                        PyInterop.runShortcuts("");
                    });
                }
            });
        }
    }

    let MainRunningApp = Router.MainRunningApp;
    if (MainRunningApp != null && MainRunningApp != undefined) {
        const currGameAppId = state.getPublicState().gameAppId;

        if (currGameAppId == "") {
            let appid = MainRunningApp.appid;
            const appId = parseInt(appid);

            setGameRunning(currGameAppId, appId);
        }
    }

    SteamController.registerForAllAppLifetimeNotifications((appId: number, data: LifetimeNotification) => {
        const currGameAppId = state.getPublicState().gameAppId;

        if (data.bRunning) setGameRunning(currGameAppId, appId);
        else if (currGameAppId != "") {
            PyInterop.setSteamAppId("0"); 
            state.setGameAppId("");
            state.setGameDisplayName("");

            PyInterop.getShortcuts().then(res => {
                state.setShortcuts(res.result as ShortcutsDictionary, false);
                state.updateStateMap();
                PyInterop.runShortcuts("");
            });
        }
    });

    serverApi.routerHook.addRoute("/GameAssist-nav", () => (
        <ShortcutsContextProvider shortcutsStateClass = {state}>
            <ShortcutsManagerRouter />
        </ShortcutsContextProvider>
    ));
  
    return {
        title: <div className = {staticClasses.Title}>{LANG.GAME_ASSIST}</div>,
        content: (
            <ShortcutsContextProvider shortcutsStateClass = {state}>
                <ShortcutsContent />
            </ShortcutsContextProvider>
        ),
        icon: <IoApps />,
        onDismount() {
            serverApi.routerHook.removeRoute("/GameAssist-nav");
        },
        alwaysRender: true
    };
});
