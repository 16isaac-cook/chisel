import { themeStore } from "@/store/theme";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";

export function useTheme() {
  const theme = useStore(themeStore);
  return theme;
}

export function useThemeClass() {
  const theme = useStore(themeStore);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
}
