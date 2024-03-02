import { ConfirmModal, Menu, MenuItem, showContextMenu, showModal, ButtonItem, DialogButton } from "decky-frontend-lib";
import { Fragment, VFC, useRef } from "react";
import { PyInterop } from "../../PyInterop";
import { Shortcut, LANG } from "../../lib/data-structures/Shortcut";
import { ReorderableEntry, ReorderableList} from "../utils/ReorderableList";
import { FaEllipsisH } from "react-icons/fa"

import { EditModal } from "./EditModal";
import { useShortcutsState } from "../../state/ShortcutsState";

type ActionButtonProps<T> = {
    entry: ReorderableEntry<T>;
}

export function ManageShortcuts() {
    const { shortcuts, setShortcuts, shortcutsList, reorderableShortcuts } = useShortcutsState();
    const count = useRef(0);

    const ActionButton: VFC<ActionButtonProps<Shortcut>> = (props: ActionButtonProps<Shortcut>) => {
        function onAction(entryReference: ReorderableEntry<Shortcut>): void {
            const shortcut = entryReference.data as Shortcut;
            showContextMenu(
                <Menu label={LANG.MANAGER_ITEM_ACTION}>
                    <MenuItem onSelected={() => {
                        showModal(
                        // @ts-ignore
                            <EditModal onConfirm={(updated: Shortcut) => {
                                let shorts = shortcuts;
                                shorts[shortcut.id] = updated;
                                setShortcuts(shorts, true);
                            }} shortcut={shortcut} />
                        )
                    }}>{LANG.MANAGER_ITEM_EDIT}</MenuItem>
                    <MenuItem onSelected={() => {
                        showModal(
                            <ConfirmModal onOK={() => {
                                let shorts = shortcuts;
                                delete shorts[shortcut.id];
                                setShortcuts(shorts, true);
                            }} bDestructiveWarning={true}>
                            {LANG.MANAGER_ITEM_DEL_QUERY}
                        </ConfirmModal>
                    )}}>{LANG.MANAGER_ITEM_DEL}</MenuItem>
                </Menu>,
                window
            );    
        }

        return (
            <DialogButton style={{ height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }} onClick={() => onAction(props.entry)} onOKButton={() => onAction(props.entry)}>
              <FaEllipsisH />
            </DialogButton>
          );
    }

    async function reloadDefault() {
        await PyInterop.defGetShortcuts().then((res) => {
            setShortcuts(res.result as ShortcutsDictionary, false);
            if (res.success) PyInterop.toast(LANG.TOAST_SUCCESS, LANG.MANAGER_ITEM_INIT);
        });
    }

    function onSave(entries: ReorderableEntry<Shortcut>[]) {
        const data = {};

        for (const entry of entries) {
            data[entry.data!.id] = {...entry.data, "position": entry.position};
        }

        setShortcuts(data, true);
    }

    type InteractablesProps<T> = {
        entry: ReorderableEntry<T>;
    }

    const Interactables: VFC<InteractablesProps<Shortcut>> = (props:InteractablesProps<Shortcut>) => {
        return (
            <>
                <ActionButton entry={props.entry} />
            </>
        );
    }

    if (shortcutsList.length === 0 && count.current < 10) {
        reloadDefault();
        count.current++;
    }
    
    return (
        <>
            <div style={{
                marginBottom: "5px"
            }}>{LANG.MANAGER_ITEM_DESC}</div>
            {shortcutsList.length > 0 ? (
                <>
                    <ReorderableList<Shortcut> entries={reorderableShortcuts} onSave={onSave} interactables={Interactables}/>
                    <ButtonItem layout="below" onClick={reloadDefault} >
                        {LANG.MANAGER_ITEM_INIT}
                    </ButtonItem>
                </>
                ) : (
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px"}}>
                       {LANG.MANAGER_ITEM_LOADING}
                    </div>
                )
            }
        </>
    );
}
