import { createContext, FC, useContext, useEffect, useState } from "react";
import { Shortcut, ControlType } from "../lib/data-structures/Shortcut"
import { ReorderableEntry } from "decky-frontend-lib";
import { PyInterop } from "../PyInterop";

interface PublicShortcutsState {
    shortcuts: ShortcutsDictionary;
    shortcutsList: Shortcut[];
    reorderableShortcuts: ReorderableEntry<Shortcut>[];
    gameAppId: string;
    gameDisplayName: string;
    visibleMap: Map<string, boolean>;
    sliderGroupMap: Map<string, Shortcut>;
    sliderUpdateMap: Map<string, Function>;
}

interface PublicShortcutsContext extends PublicShortcutsState {
    setShortcuts(shortcuts: ShortcutsDictionary, isSave: boolean): void;
    setGameAppId(gameAppId: string): void;
    setGameDisplayName(gameDisplayName: string): void;
    setVisibleMap(visibleMap: Map<string, boolean>): void;
    updateStateMap(): void;
    updateAll(): void;
}

export class ShortcutsState {
    private shortcuts: ShortcutsDictionary = {};
    private shortcutsList: Shortcut[] = [];
    private reorderableShortcuts: ReorderableEntry<Shortcut>[] = [];
    private gameAppId: string = "";
    private gameDisplayName: string = "";
    private visibleMap: Map<string, boolean> = new Map<string, boolean>;
    private sliderGroupMap: Map<string, Shortcut> = new Map<string, Shortcut>; 
    private sliderUpdateMap: Map<string, Function> = new Map<string, Function>; 

    public eventBus = new EventTarget();

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
        }
    }

    setGameAppId(gameAppId: string): void {
        this.gameAppId = gameAppId;    
        this.forceUpdate();
    }

    setGameDisplayName(gameDisplayName: string): void {
        this.gameDisplayName = gameDisplayName;    
        this.forceUpdate();
    }

    setVisibleMap(visibleMap: Map<string, boolean>): void {
        this.visibleMap = visibleMap;
        this.forceUpdate();
    }

    updateStateMap(): void {
        let visMap = new Map<string, boolean>();

        for (let i = 0; i < this.shortcutsList.length; i++) {
            if (this.shortcutsList[i].type == ControlType.SLIDER && this.shortcutsList[i].group != "") {
                this.sliderGroupMap.set(this.shortcutsList[i].group, this.shortcutsList[i]);
            }
            if (this.shortcutsList[i].type == ControlType.GROUP && this.shortcutsList[i].group != "") {
                visMap.set(this.shortcutsList[i].group, this.shortcutsList[i].checked == 1);
            }
            if (this.shortcutsList[i].type == ControlType.SLIDER || this.shortcutsList[i].type == ControlType.CHOICE) {
                let sliderUpdate = this.sliderUpdateMap.get(this.shortcutsList[i].id);
                if (sliderUpdate != undefined) sliderUpdate(parseFloat(this.shortcutsList[i].value));
            }            
        }
        this.setVisibleMap(visMap);
    }

    updateAll(): void {
        this.forceUpdate();
    }

    setShortcuts(shortcuts: ShortcutsDictionary, isSave: boolean): void {
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
                }
            }

            this.reorderableShortcuts.sort((a, b) => a.position - b.position);

            if (isSave) PyInterop.setShortcuts(this.shortcutsList);
        }

        this.forceUpdate();
    }
    
    private forceUpdate(): void {
        this.eventBus.dispatchEvent(new Event("stateUpdate"));
    }
}

const ShortcutsContext = createContext<PublicShortcutsContext>(null as any);
export const useShortcutsState = () => useContext(ShortcutsContext);

interface ProviderProps {
    shortcutsStateClass: ShortcutsState
}

export const ShortcutsContextProvider: FC<ProviderProps> = ({
    children,
    shortcutsStateClass }) => {
    const [publicState, setPublicState] = useState<PublicShortcutsState>({
        ...shortcutsStateClass.getPublicState()
    });

    useEffect(() => {
        function onUpdate() {
            setPublicState({ ...shortcutsStateClass.getPublicState() });
        }

        shortcutsStateClass.eventBus.addEventListener("stateUpdate", onUpdate);

        return () => {
            shortcutsStateClass.eventBus.removeEventListener("stateUpdate", onUpdate);
        }
    }, []);

    const setShortcuts = (shortcuts: ShortcutsDictionary, isSave: boolean) => {
        shortcutsStateClass.setShortcuts(shortcuts, isSave);
    }

    const setGameAppId = (gameAppId: string) => {
        shortcutsStateClass.setGameAppId(gameAppId);
    }

    const setGameDisplayName = (gameDisplayName: string) => {
        shortcutsStateClass.setGameDisplayName(gameDisplayName);
    }

    const setVisibleMap = (visibleMap: Map<string, boolean>) => {
        shortcutsStateClass.setVisibleMap(visibleMap);
    }    

    const updateStateMap = () => {
        shortcutsStateClass.updateStateMap();
    }

    const updateAll = () => {
        shortcutsStateClass.updateAll();
    }

    return (
        <ShortcutsContext.Provider
            value={{
                ...publicState,
                setShortcuts,
                setGameAppId,
                setGameDisplayName,
                setVisibleMap,
                updateStateMap,
                updateAll,
            }}
        >
            {children}
        </ShortcutsContext.Provider>
    )
}
