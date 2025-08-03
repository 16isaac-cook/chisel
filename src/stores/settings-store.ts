import { Store } from "@tanstack/react-store";
import { LazyStore } from "@tauri-apps/plugin-store";

const isClient = typeof window !== "undefined";
const isTauri = isClient && "__TAURI__" in window;

const fileName = "settings.json";

const lazyStore = isTauri ? new LazyStore(fileName) : null;

type Theme = "light" | "dark" | "system";

interface AppSettings {
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

export const settingsStore = new Store(defaultSettings);

function getSidebarStateFromCookie(): "collapsed" | "expanded" {
	if (typeof document === "undefined") return "expanded";

	const raw = document.cookie
		.split("; ")
		.find((row) => row.startsWith("sidebar-state="));

	if (!raw) return "expanded";

	const value = raw.split("=")[1];
	return value === "collapsed" ? "collapsed" : "expanded";
}

export async function loadSettings() {
	console.log("loading");
	let loadedSettings: Partial<AppSettings> = {};

	if (isTauri && lazyStore) {
		const currentVal = (await lazyStore.get("currentVal")) as AppSettings;

		if (currentVal && typeof currentVal === "object") {
			loadedSettings = {
				...defaultSettings,
				...currentVal,
				uiState: {
					...defaultSettings.uiState,
					...(currentVal.uiState ?? {}),
				},
			};
		}
	} else {
		for (const key of Object.keys(defaultSettings)) {
			const value = localStorage.getItem(key);
			if (value !== null) {
				loadedSettings[key as keyof AppSettings] = JSON.parse(value);
			}
		}
		loadedSettings = {
			...defaultSettings,
			...loadedSettings,
			uiState: {
				...defaultSettings.uiState,
				...(loadedSettings.uiState ?? {}),
			},
		};
	}

	if (
		!loadedSettings.uiState ||
		!["collapsed", "expanded"].includes(loadedSettings.uiState.sidebar)
	) {
		const sidebarState = getSidebarStateFromCookie();
		loadedSettings.uiState = {
			...loadedSettings.uiState,
			sidebar: sidebarState,
		};
	}

	settingsStore.setState(() => loadedSettings as AppSettings);
}

settingsStore.subscribe((settings) => {
	const sidebarState = settings.currentVal.uiState?.sidebar ?? "expanded";
	document.cookie = `sidebar-state=${sidebarState}; path=/; max-age=31536000; SameSite=Lax`;

	if (isTauri && lazyStore) {
		lazyStore.set("currentVal", settings.currentVal);
		lazyStore.save().catch((e) => {
			console.error("failed to save settings", e);
		});
	} else {
		for (const [key, value] of Object.entries(settings.currentVal)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}
});
