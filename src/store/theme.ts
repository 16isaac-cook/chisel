import { Store } from "@tanstack/react-store";

export type Theme = "light" | "dark" | "system";

export const themeStore = new Store<Theme>("light");
