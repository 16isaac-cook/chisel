import React, { createContext, useContext, useEffect, useState } from "react";
import { settingsStore } from "@/stores/settings-store";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "system",
	setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");

	useEffect(() => {
		const unsubscribe = settingsStore.subscribe((state) => {
			setThemeState(state.currentVal.theme);
		});

		setThemeState(settingsStore.state.theme);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const root = document.documentElement;

		function applyTheme(t: Theme) {
			root.classList.remove("dark", "light");

			if (t === "system") {
				const isDark = window.matchMedia(
					"(prefers-color-scheme: dark)"
				).matches;
				root.classList.add(isDark ? "dark" : "light");
			} else {
				root.classList.add(t);
			}
		}

		applyTheme(theme);

		if (theme === "system") {
			const mediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);
			const handler = (e: MediaQueryListEvent) => {
				applyTheme("system");
			};
			mediaQuery.addEventListener("change", handler);
			return () => mediaQuery.removeEventListener("change", handler);
		}
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		settingsStore.setState((prev) => ({ ...prev, theme: newTheme }));
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

// Hook for consuming context easily
export function useTheme() {
	return useContext(ThemeContext);
}
