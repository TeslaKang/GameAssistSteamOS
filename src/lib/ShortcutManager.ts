import { PyInterop } from "../PyInterop";
import { LANG } from "../lib/data-structures/Shortcut";
import { createElement } from "react";
import { ConfirmModal, showModal } from "decky-frontend-lib";

export class ShortcutManager {
    private static tdpConfirmation: Promise<boolean> | undefined;

    static async confirmTdp(): Promise<boolean> {
        if (this.tdpConfirmation) return this.tdpConfirmation;
        const confirmation = this.checkTdp();
        this.tdpConfirmation = confirmation;
        try {
            return await confirmation;
        } finally {
            if (this.tdpConfirmation === confirmation) this.tdpConfirmation = undefined;
        }
    }

    private static async checkTdp(): Promise<boolean> {
        try {
            const res = await PyInterop.getTdpStatus();
            if (!res.success) return false;
            if (!res.result.available) {
                PyInterop.toast("TDP", "이 기기에서 사용할 수 있는 TDP 제어 수단을 찾지 못했습니다.");
                return false;
            }
            if (!res.result.hhd || res.result.acknowledged) return true;
            return await new Promise<boolean>((resolve) => {
                let settled = false;
                const cancel = () => { if (!settled) { settled = true; resolve(false); } };
                showModal(createElement(ConfirmModal, {
                    strTitle: "TDP 제어 충돌 경고",
                    strOKButtonText: "확인 후 계속",
                    strCancelButtonText: "취소",
                    bDisableBackgroundDismiss: true,
                    bHideCloseIcon: true,
                    onOK: () => {
                        if (settled) return;
                        settled = true;
                        PyInterop.setGlobalSetting("hhdTdpWarningAcknowledged", "1")
                            .then(saved => resolve(saved.success)).catch(() => resolve(false));
                    },
                    onCancel: cancel,
                    onEscKeypress: cancel,
                }, "HHD가 실행 중입니다. HHD와 GameAssist가 동시에 TDP를 조절하면 설정이 덮어써질 수 있습니다. 계속 진행하시겠습니까? 확인하면 이 경고는 다시 표시하지 않습니다."));
            });
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async launchShortcut(cmd: string, title: string): Promise<boolean> {
        if (/(?:set|reset|get)TDP\.sh\b/.test(cmd) && !await this.confirmTdp()) return false;
        const res = await PyInterop.runProgram(cmd);
        const status = typeof res.result == "boolean" && (res.result as boolean);
        
        if (!status) {
            PyInterop.toast(title, LANG.TOAST_ERROR);
        }
        return status;
    }
}
