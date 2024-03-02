import { PanelSectionRow, ButtonItem, ToggleField, SliderField, Focusable, DialogButton } from "decky-frontend-lib";
import { Fragment, useState } from "react";
import { Shortcut } from "../lib/data-structures/Shortcut";
import { ControlType } from "../lib/data-structures/Shortcut";
import { useShortcutsState } from "../state/ShortcutsState";
import { ShortcutManager } from "../lib/ShortcutManager";
import { PyInterop } from "../PyInterop";

function getLaunchCommand(shortcut: Shortcut, index: number) {
    var cmd = shortcut.cmd;

    if (shortcut.type == ControlType.GROUP && shortcut.checked) cmd = shortcut.cmd1;
    else if (shortcut.type == ControlType.TOGGLE && shortcut.checked) cmd = shortcut.cmd1;
    else if (shortcut.type == ControlType.SLIDER) {
        let val = parseFloat(shortcut.value);
        let scale = parseFloat(shortcut.scale);
        let str = String(val * scale);

        cmd = cmd.replace(/\$v\$/gi, str);
    }
    else if (shortcut.type == ControlType.BUTTON) {
        if (index == 1) cmd = shortcut.cmd1;
        else if (index == 2) cmd = shortcut.cmd2;
    }
    else if (shortcut.type == ControlType.CHOICE) {
        if (index == 0) cmd = shortcut.cmd1;
        else if (index == 1) cmd = shortcut.cmd2;
        else if (index == 2) cmd = shortcut.cmd3;
        else if (index == 3) cmd = shortcut.cmd4;
        else if (index == 4) cmd = shortcut.cmd5;
        else if (index == 5) cmd = shortcut.cmd6;
    }

    return cmd;
}

function getTitle(shortcut: Shortcut, index: number) {
    let title = shortcut.name;

    if (shortcut.type == ControlType.GROUP || shortcut.type == ControlType.TOGGLE) {
        if (shortcut.checked) title = title + ' on';
        else title = title + ' off';
    }
    else if (shortcut.type == ControlType.SLIDER) {
        title = title + ' ' + shortcut.value + shortcut.suffix;
    }
    else if (shortcut.type == ControlType.BUTTON) {
        if (index == 1) title = shortcut.name1;
        else if (index == 2) title = shortcut.name2;
    }
    else if (shortcut.type == ControlType.CHOICE) {
        if (index == 0) title = shortcut.name1;
        else if (index == 1) title = shortcut.name2;
        else if (index == 2) title = shortcut.name3;
        else if (index == 3) title = shortcut.name4;
        else if (index == 4) title = shortcut.name5;
        else if (index == 5) title = shortcut.name6;
    }
    return title;
}

async function runShortcut(cmd: string, title: string) {
    ShortcutManager.launchShortcut(cmd, title);
}

var timerID: any = undefined;

function LaunchShortcut(cmd: string, title: string) {
    timerID = undefined;
    runShortcut(cmd, title);
}

function parseValue(num: string, def: number = -1) {
    let ret = parseFloat(num);

    if (ret == Number.NaN) ret = 0;
    if (ret < 0 && def >= 0) ret = def;
    return ret;
}

function RunShortcut(shortcut: Shortcut, sliderGroupMap: Map<string, Shortcut>, sliderUpdateMap: Map<string, Function>, index: number = 0) {
    let cmd = getLaunchCommand(shortcut, index);

    if (cmd.length > 0) {
        let title = getTitle(shortcut, index);
        let timeout = parseValue(shortcut.timeout, 1000);

        if (shortcut.timeout.length == 0 || timeout <= 0) {
            LaunchShortcut(cmd, title);
        }
        else {
            if (timerID != undefined) clearTimeout(timerID);
            timerID = setTimeout(LaunchShortcut, timeout, cmd, title);
        }
        if (shortcut.type == ControlType.BUTTON && shortcut.group != "") {
            let shortCut = sliderGroupMap.get(shortcut.group);

            if (shortCut != undefined) {
                let value = shortCut.value;
                
                if (index == 2) value = String(parseValue(shortcut.name2, parseValue(shortCut.value, 0)));
                else if (index == 1) value = String(parseValue(shortcut.name1, parseValue(shortCut.value, 0)));
                else value = String(parseValue(shortcut.name, parseValue(shortCut.value, 0)));
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

export function ShortcutLauncher(props: ShortcutLauncherProps) {
    const { visibleMap, setVisibleMap, sliderGroupMap, sliderUpdateMap } = useShortcutsState();

    if (props.shortcut.type == ControlType.GROUP) {
        return (
            <ToggleField
                checked = {props.shortcut.checked == 1}
                label = {props.shortcut.name}
                description = {props.shortcut.desc}
                onChange = {(value: boolean) => {
                    props.shortcut.checked = value ? 1 : 0;
                    PyInterop.modShortcut(props.shortcut);
                    RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                    if (value) PyInterop.runShortcuts(props.shortcut.group);

                    let newMap = new Map<string, boolean>(visibleMap);
                    newMap.set(props.shortcut.group, value);
                    setVisibleMap(newMap);
                }}
            />
        );
    }
    else if (props.shortcut.group == "" || visibleMap.get(props.shortcut.group) == true) {
        if (props.shortcut.type == ControlType.TOGGLE) {
            return (
                <ToggleField
                    checked = {props.shortcut.checked == 1}
                    label = {props.shortcut.name}
                    description = {props.shortcut.desc}
                    onChange = {(value: boolean) => {
                        props.shortcut.checked = value ? 1 : 0;
                        PyInterop.modShortcut(props.shortcut);
                        RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                    }}
                />
            );
        }
        else if (props.shortcut.type == ControlType.SLIDER) {
            const [sliderValue, setSliderValue] = useState<number>(parseValue(props.shortcut.value, parseValue(props.shortcut.min) + Math.round((parseValue(props.shortcut.max) - parseFloat(props.shortcut.min)) / 2)));       
            sliderUpdateMap.set(props.shortcut.id, setSliderValue);
            if (props.shortcut.group != "") sliderUpdateMap.set(props.shortcut.group, setSliderValue);
            return (
                <SliderField
                    label = {props.shortcut.name}
                    valueSuffix = {props.shortcut.suffix}
                    value = {sliderValue}
                    step = {parseFloat(props.shortcut.step)}
                    min = {parseFloat(props.shortcut.min)}
                    max = {parseFloat(props.shortcut.max)}
                    showValue = {true}
                    onChange = {(value: number) => {
                        if (props.shortcut.value != String(value)) {
                            props.shortcut.value = String(value);
                            setSliderValue(value);
                            PyInterop.modShortcut(props.shortcut);
                            RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap);
                        }
                    }}
                />
            );
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
                    }
                    notchLabel = notchLabel.concat(item);
                    notchCount++;
                }
                else break;
            }

            const [sliderValue, setSliderValue] = useState<number>(parseValue(props.shortcut.value));
            sliderUpdateMap.set(props.shortcut.id, setSliderValue);
            if (props.shortcut.group != "") sliderUpdateMap.set(props.shortcut.group, setSliderValue);
            return (
                <SliderField
                    label = {props.shortcut.name}
                    valueSuffix = {props.shortcut.suffix}
                    min = {0}
                    max = {notchCount - 1}
                    value = {sliderValue}
                    notchCount = {notchCount}
                    notchLabels = {notchLabel}
                    showValue = {false}
                    onChange = {(value: number) => {
                        if (props.shortcut.value != String(value)) {
                            props.shortcut.value = String(value);
                            setSliderValue(value);
                            PyInterop.modShortcut(props.shortcut);
                            RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, value);
                        }
                    }}
                />
            );
        }
        else {
            let buttonCount = 1;

            if (props.shortcut.name1 != '') buttonCount++;
            if (props.shortcut.name2 != '') buttonCount++;
            if (buttonCount == 1) {
                return (   
                    <PanelSectionRow>
                        <ButtonItem layout="below" onClick={() => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap)}>
                            {props.shortcut.name}
                        </ButtonItem>
                    </PanelSectionRow>
                );    
            }
            else {
                let percent = 100 / buttonCount;
                let btn0 = <></>;
                let btn1 = <></>;
                let btn2 = <></>;

                btn0 = <DialogButton style={{ width: {percent} + '%', minWidth: 0 }} onClick={() => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap)} >
                            {props.shortcut.name}
                        </DialogButton>;
                if (props.shortcut.name1 != '') {
                    btn1 = <DialogButton style={{ width: {percent} + '%', minWidth: 0 }} onClick={() => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, 1)} >
                                {props.shortcut.name1}
                            </DialogButton>
                }
                if (props.shortcut.name2 != '') {
                    btn2 = <DialogButton style={{ width: {percent} + '%', minWidth: 0 }} onClick={() => RunShortcut(props.shortcut, sliderGroupMap, sliderUpdateMap, 2)} >
                                {props.shortcut.name2}
                            </DialogButton>
                }

                return (
                    <PanelSectionRow>
                        <Focusable style={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}} flow-childen="horizontal" >                        
                            {btn0}
                            {btn1}
                            {btn2}
                        </Focusable>
                    </PanelSectionRow>
                );
            }
        }
    }
    return null;    
}
