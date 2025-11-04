import { SettingsContext } from "@context/settings-context";
import {
    type AppSettings,
    defaultSettings,
    loadSettings,
    persistSettings,
    type Theme,
} from "@store/settings-store";
import { type ReactNode, useCallback, useEffect, useState } from "react";

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadSettings()
            .then((loadedSettings) => {
                setSettings(loadedSettings);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error("Failed to load settings:", error);
                setIsLoaded(true);
            });
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        persistSettings(settings);
    }, [settings, isLoaded]);

    const setTheme = useCallback((theme: Theme) => {
        setSettings((prev) => ({
            ...prev,
            theme,
        }));
    }, []);

    const toggleSidebar = useCallback(() => {
        setSettings((prev) => ({
            ...prev,
            uiState: {
                ...prev.uiState,
                sidebar:
                    prev.uiState.sidebar === "collapsed"
                        ? "expanded"
                        : "collapsed",
            },
        }));
    }, []);

    const setSidebar = useCallback((open: boolean) => {
        setSettings((prev) => ({
            ...prev,
            uiState: {
                ...prev.uiState,
                sidebar: open ? "expanded" : "collapsed",
            },
        }));
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setTheme,
                toggleSidebar,
                setSidebar,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
