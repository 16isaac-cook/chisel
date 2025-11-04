import { LazyStore } from "@tauri-apps/plugin-store";

const isClient = typeof window !== "undefined";
const isTauri = isClient && "__TAURI__" in window;

const STORAGE_KEY = "settings";
const STORE_FILE = "settings.json";

let lazyStore: LazyStore | null = null;

if (isTauri) {
    lazyStore = new LazyStore(STORE_FILE);
}

export type Theme = "light" | "dark" | "system";
export type SidebarState = "collapsed" | "expanded";

export interface AppSettings {
    theme: Theme;
    uiState: {
        sidebar: SidebarState;
    };
}

export const defaultSettings: AppSettings = {
    theme: "system",
    uiState: {
        sidebar: "expanded",
    },
};

function isValidTheme(value: unknown): value is Theme {
    return value === "light" || value === "dark" || value === "system";
}

function isValidSidebarState(value: unknown): value is SidebarState {
    return value === "collapsed" || value === "expanded";
}

function validateSettings(data: unknown): AppSettings {
    if (!data || typeof data !== "object") {
        return defaultSettings;
    }

    const obj = data as Partial<AppSettings>;

    const theme = isValidTheme(obj.theme) ? obj.theme : defaultSettings.theme;
    const sidebar =
        obj.uiState && isValidSidebarState(obj.uiState.sidebar)
            ? obj.uiState.sidebar
            : defaultSettings.uiState.sidebar;

    return {
        theme,
        uiState: {
            sidebar,
        },
    };
}

export async function loadSettings(): Promise<AppSettings> {
    try {
        if (isTauri && lazyStore) {
            const stored = await lazyStore.get<AppSettings>(STORAGE_KEY);
            if (stored) {
                return validateSettings(stored);
            }
        }

        if (isClient) {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return validateSettings(parsed);
            }
        }
    } catch (error) {
        console.error("Failed to load settings:", error);
    }

    return defaultSettings;
}

export async function persistSettings(settings: AppSettings): Promise<void> {
    try {
        const validated = validateSettings(settings);

        if (isClient) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
        }

        if (isTauri && lazyStore) {
            await lazyStore.set(STORAGE_KEY, validated);
            await lazyStore.save();
        }
    } catch (error) {
        console.error("Failed to persist settings:", error);
    }
}
