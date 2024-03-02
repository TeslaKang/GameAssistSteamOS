import { PyInterop } from "../PyInterop";
import { LANG } from "../lib/data-structures/Shortcut";

export class ShortcutManager {

    static async launchShortcut(cmd: string, title: string): Promise<boolean> {
        const res = await PyInterop.runProgram(cmd);
        const status = typeof res.result == "boolean" && (res.result as boolean);
        
        if (!status) {
            PyInterop.toast(title, LANG.TOAST_ERROR);
        }
        return status;
    }
}
