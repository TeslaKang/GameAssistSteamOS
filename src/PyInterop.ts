import { ServerAPI, ServerResponse } from "decky-frontend-lib";
import { Shortcut } from "./lib/data-structures/Shortcut";

export class PyInterop {
    private static serverAPI: ServerAPI;

    static setServer(serv: ServerAPI) {
        this.serverAPI = serv;
    }

    static async setSteamAppId(appId: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{appId: string}, void>("setSteamAppId", { appId: appId });
    }
    static async setGlobalSetting(key: string, value: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{key: string, value: string}, void>("setGlobalSetting", { key: key, value: value });
    }
    static async getGlobalSetting(key: string): Promise<ServerResponse<string>> {
        return await this.serverAPI.callPluginMethod<{key: string}, string>("getGlobalSetting", { key: key });
    }

    static async getShortcuts(): Promise<ServerResponse<ShortcutsDictionary>> {
        return await this.serverAPI.callPluginMethod<{}, ShortcutsDictionary>("getShortcuts", {});
    }
    static async defGetShortcuts(): Promise<ServerResponse<ShortcutsDictionary>> {
        return await this.serverAPI.callPluginMethod<{}, ShortcutsDictionary>("defGetShortcuts", {});
    }
    static async setShortcuts(shortcuts: Shortcut[]): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{shortcuts: Shortcut[]}, void>("setShortcuts", { shortcuts: shortcuts });
    }
    static async runShortcuts(group: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{group: string}, void>("runShortcuts", { group: group });
    }
    static async modShortcut(shortcut: Shortcut): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{shortcut: Shortcut}, void>("modShortcut", { shortcut: shortcut });
    }
    static async runProgram(cmd: string): Promise<ServerResponse<boolean>> {
        return await this.serverAPI.callPluginMethod<{cmd: string}, boolean>("runProgram", { cmd: cmd });
    }
    static async exeProgram(cmd: string): Promise<ServerResponse<string>> {
        return await this.serverAPI.callPluginMethod<{cmd: string}, string>("exeProgram", { cmd: cmd });
    }
    static async setLocale(loc: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{loc: string}, void>("setLocale", { loc: loc });
    }
    static async getLocale(): Promise<ServerResponse<string>> {
        return await this.serverAPI.callPluginMethod<{}, string>("getLocale", {});
    }   
    static async logPrint(logStr: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{logStr: string}, void>("logPrint", { logStr: logStr });
    }
    static async existHandyGCCS(): Promise<ServerResponse<boolean>> {
        return await this.serverAPI.callPluginMethod<{}, boolean>("existHandyGCCS", {});
    }
    static async getHandyGCCS(key: string): Promise<ServerResponse<string>> {
        return await this.serverAPI.callPluginMethod<{key: string}, string>("getHandyGCCS", { key: key });
    }   
    static async setHandyGCCS(key: string, value: string): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{key: string, value: string}, void>("setHandyGCCS", { key: key, value: value });
    }

    static async getCpuTemp(): Promise<ServerResponse<number>> {
        return await this.serverAPI.callPluginMethod<{}, number>("getCpuTemp", {});
    }
    static async getFanValueType(): Promise<ServerResponse<number>> {
        return await this.serverAPI.callPluginMethod<{}, number>("getFanValueType", {});
    }
    static async getFanValue(): Promise<ServerResponse<number>> {
        return await this.serverAPI.callPluginMethod<{}, number>("getFanValue", {});
    }
    static async getCustomFanControl(): Promise<ServerResponse<boolean>> {
        return await this.serverAPI.callPluginMethod<{}, boolean>("getCustomFanControl", {});
    }
    static async setCustomFanControl(custom: boolean): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{custom: boolean}, void>("setCustomFanControl", { custom: custom });
    }
    static async getLinearFanControl(): Promise<ServerResponse<boolean>> {
        return await this.serverAPI.callPluginMethod<{}, boolean>("getLinearFanControl", {});
    }
    static async setLinearFanControl(linear: boolean): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{linear: boolean}, void>("setLinearFanControl", { linear: linear });
    }   
    static async setFanCurveItems(items: FanCurveItems): Promise<ServerResponse<void>> {
        return await this.serverAPI.callPluginMethod<{items: FanCurveItems}, void>("setFanCurveItems", { items: items });
    }   
    static async getFanCurveItems(): Promise<ServerResponse<FanCurveItems>> {
        return await this.serverAPI.callPluginMethod<{}, FanCurveItems>("getFanCurveItems", {});
    }   

    static toast(title: string, message: string) {
        return (() => {
            try {
                return this.serverAPI.toaster.toast({
                    title: title,
                    body: message,
                    duration: 1500,
                });
            } catch (e) {
                console.log("Toaster Error", e);
            }
        })();
    }
}
