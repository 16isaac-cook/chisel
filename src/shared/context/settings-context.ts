import { createContext, useContext } from "react";
import { type AppSettings, type Theme } from "@store/settings-store";

export interface SettingsContextType {
    settings: AppSettings;
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
    setSidebar: (open: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettingsStore() {
    const ctx = useContext(SettingsContext);
    if (!ctx)
        throw new Error(
            "useSettingsStore must be used within SettingsProvider",
        );
    return ctx;
}
