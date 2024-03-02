type Unregisterer = {
    unregister: () => void;
}

type ShortcutsDictionary = {
    [key: string]: Shortcut;
}

type ShortcutLauncherProps = {
    shortcut: Shortcut;
}

type ShortcutSettingProps = {
    onChange: Function;
}

type FanValueTypeProps = {
    type: number;
}

type FanCurveItem = {
    x: number;
    y: number;
}
type FanCurveItems = FanCurveItem[]
