import { SettingsContext } from "@context/settings-context";
import {
    loadSettings,
    persistSettings,
    settingsMachine,
    type Theme,
} from "@store/settings-store";
import { useActor } from "@xstate/react";
import { type ReactNode, useEffect, useState } from "react";

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [state, send] = useActor(settingsMachine);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadSettings(send)
            .then(() => setLoaded(true))
            .catch((e) => {
                console.error("Failed to load settings", e);
                setLoaded(true);
            });
    }, [send]);

    const setTheme = (theme: Theme) => send({ type: "SET_THEME", theme });
    const toggleSidebar = () =>
        send({
            type: "SET_SIDEBAR",
            sidebar:
                state.context.uiState.sidebar === "collapsed"
                    ? "expanded"
                    : "collapsed",
        });

    const setSidebar = (open: boolean) => {
        send({ type: "SET_SIDEBAR", sidebar: open ? "expanded" : "collapsed" });
    };

    useEffect(() => {
        if (!loaded) return;
        persistSettings(state.context);
    }, [state.context, loaded]);

    if (!loaded) return null;

    return (
        <SettingsContext.Provider
            value={{
                settings: state.context,
                setTheme,
                toggleSidebar,
                setSidebar,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
