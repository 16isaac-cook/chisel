import { persistStore } from "./persist-store";
import { themeStore } from "@/store/theme";

export async function initPersistence() {
  await persistStore({
    key: "theme",
    store: themeStore,
  });
}
