import { useSettingsStore } from "@context/settings-context";
import type { Theme } from "@store/settings-store";
import { useEffect } from "react";

export function useTheme() {
    const { settings } = useSettingsStore();
    const theme = settings.theme;

    useEffect(() => {
        const root = document.documentElement;

        function applyTheme(t: Theme) {
            root.classList.remove("dark", "light");

            if (t === "system") {
                const isDark = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches;
                root.classList.add(isDark ? "dark" : "light");
            } else {
                root.classList.add(t);
            }
        }

        applyTheme(theme);

        if (theme === "system") {
            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            const handler = () => applyTheme("system");
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        }
    }, [theme]);
}
