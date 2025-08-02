import { Store } from "@tanstack/react-store";
import { AppSettings } from "@/shared/types/types";
import { LazyStore } from "@tauri-apps/plugin-store";

const isClient = typeof window !== "undefined";
const isTauri = isClient && "__TAURI__" in window;

const fileName = "settings.json";

const lazyStore = isTauri ? new LazyStore(fileName) : null;

const defaultSettings: AppSettings = {
	theme: "system",
};

export const settingsStore = new Store(defaultSettings);

export async function loadSettings() {
	if (isTauri && lazyStore) {
		const currentVal = await lazyStore.get("currentVal");

		if (currentVal && typeof currentVal === "object") {
			const filteredSettings = Object.fromEntries(
				Object.entries(currentVal).filter(
					([key]) => key in defaultSettings
				)
			) as Partial<AppSettings>;

			settingsStore.setState((prev) => ({
				...prev,
				...filteredSettings,
			}));
		}
	} else {
		const restored: Partial<AppSettings> = {};
		for (const key of Object.keys(defaultSettings)) {
			const value = localStorage.getItem(key);
			if (value !== null) {
				restored[key as keyof AppSettings] = JSON.parse(value);
			}
		}
		settingsStore.setState((prev) => ({
			...prev,
			...restored,
		}));
	}
}

settingsStore.subscribe((settings) => {
	if (isTauri && lazyStore) {
		for (const [key, value] of Object.entries(settings)) {
			lazyStore.set(key, value);
		}
		lazyStore.save().catch((e) => {
			console.error("failed to save settings", e);
		});
	} else {
		for (const [key, value] of Object.entries(settings)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}
});
