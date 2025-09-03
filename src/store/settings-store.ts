import { LazyStore } from "@tauri-apps/plugin-store";
import { assign, setup } from "xstate";

const isClient = typeof window !== "undefined";
const isTauri = isClient && "__TAURI__" in window;

const fileName = "settings.json";

const lazyStore = isTauri ? new LazyStore(fileName) : null;

export type Theme = "light" | "dark" | "system";

export interface AppSettings {
    theme: Theme;
    uiState: {
        sidebar: "collapsed" | "expanded";
    };
}

const defaultSettings: AppSettings = {
    theme: "system",
    uiState: {
        sidebar: "expanded",
    },
};

type Event =
    | { type: "SET_THEME"; theme: Theme }
    | { type: "SET_SIDEBAR"; sidebar: "collapsed" | "expanded" };

function getSidebarStateFromCookie(): "collapsed" | "expanded" {
    if (!isClient) return "expanded";

    const raw = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar-state="));

    if (!raw) return "expanded";

    const value = raw.split("=")[1];
    return value === "collapsed" ? "collapsed" : "expanded";
}

export const settingsMachine = setup({
    types: {
        context: {} as AppSettings,
        events: {} as Event,
    },
}).createMachine({
    context: defaultSettings,
    initial: "Idle",
    states: {
        Idle: {
            on: {
                SET_THEME: {
                    target: "Idle",
                    actions: assign(({ event }) => ({
                        theme: event.theme,
                    })),
                },
                SET_SIDEBAR: {
                    target: "Idle",
                    actions: assign(({ context, event }) => ({
                        uiState: { ...context.uiState, sidebar: event.sidebar },
                    })),
                },
            },
        },
    },
});

export async function loadSettings(send: (event: Event) => void) {
    let loaded: AppSettings | null = null;

    if (isTauri && lazyStore) {
        const current = (await lazyStore.get(
            "currentVal",
        )) as AppSettings | null;
        if (current) {
            loaded = current;
        }
    }

    if (!loaded && isClient) {
        const raw = localStorage.getItem("settings");
        if (raw) {
            loaded = JSON.parse(raw) as AppSettings;
        }
    }

    if (!loaded) {
        loaded = defaultSettings;
    }

    if (
        !loaded.uiState ||
        !["collapsed", "expanded"].includes(loaded.uiState.sidebar)
    ) {
        loaded.uiState = {
            ...loaded.uiState,
            sidebar: getSidebarStateFromCookie(),
        };
    }

    send({ type: "SET_THEME", theme: loaded.theme });
    send({ type: "SET_SIDEBAR", sidebar: loaded.uiState.sidebar });
}

export function persistSettings(context: AppSettings) {
    const safeContext: AppSettings = {
        theme: context.theme ?? "system",
        uiState: {
            sidebar: context.uiState?.sidebar ?? "expanded",
        },
    };

    if (isClient) {
        document.cookie = `sidebar-state=${safeContext.uiState.sidebar}; path=/; max-age=31536000; SameSite=Lax`;
        localStorage.setItem("settings", JSON.stringify(safeContext));
    }

    if (isTauri && lazyStore) {
        lazyStore
            .set("currentVal", safeContext)
            .then(() => lazyStore.save())
            .catch(console.error);
    }
}
