import { Store } from "@tanstack/react-store";

export type Theme = "light" | "dark" | "theme";

export const themeStore = new Store({ theme: "system" as Theme });
