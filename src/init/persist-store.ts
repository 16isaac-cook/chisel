import type { Store } from "@tanstack/react-store";

const isClient = typeof window !== "undefined";
const isTauri = isClient && "__TAURI__" in window;

type PersistStoreOptions<T> = {
  key: string;
  store: Store<T>;
  hydrate?: boolean;
  debounce?: number;
};

export async function persistStore<T>({
  key,
  store,
  hydrate = true,
  debounce = 300,
}: PersistStoreOptions<T>) {
  if (!isClient) return;

  let tauriStore: any = null;

  if (isTauri) {
    const { LazyStore } = await import("@tauri-apps/plugin-store");
    const { join, appDataDir } = await import("@tauri-apps/api/path");
    const path = await appDataDir();
    const filePath = await join(path, "settings.dat");
    tauriStore = new LazyStore(filePath);
  }

  if (hydrate) {
    let saved: T | null = null;

    if (isTauri && tauriStore) {
      saved = (await tauriStore.get(key)) as any | null;
    } else {
      const raw = localStorage.getItem(key);
      saved = raw ? (JSON.parse(raw) as any) : null;
    }

    if (saved) {
      function hasCurrentVal<T>(obj: any): obj is { currentVal: T } {
        return obj && typeof obj === "object" && "currentVal" in obj;
      }
      if (hasCurrentVal<T>(saved)) {
        store.setState(saved.currentVal);
      } else {
        store.setState(saved);
      }
    }
  }

  let timeout: any = null;
  store.subscribe((state) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (isTauri && tauriStore) {
        await tauriStore.set(key, state);
        await tauriStore.save();
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    }, debounce);
  });
}
