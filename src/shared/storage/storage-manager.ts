/**
 * Generic storage adapter interface
 */
export interface StorageAdapter {
    [key: string]: any;
}

let storageInstance: StorageAdapter | null = null;

/**
 * Detects if the app is running in Tauri environment
 */
export function isTauriEnvironment(): boolean {
    return (
        typeof window !== "undefined" &&
        "__TAURI__" in window &&
        window.__TAURI__ !== undefined
    );
}

/**
 * Initializes storage with the appropriate adapter based on environment.
 * @param tauriAdapter - Adapter to use in Tauri environment
 * @param webAdapter - Adapter to use in web environment
 */
export function initializeStorage(
    tauriAdapter: StorageAdapter,
    webAdapter: StorageAdapter,
): void {
    if (storageInstance) {
        return; // Already initialized
    }

    if (isTauriEnvironment()) {
        console.log("Initializing Tauri storage adapter");
        storageInstance = tauriAdapter;
    } else {
        console.log("Initializing Web storage adapter");
        storageInstance = webAdapter;
    }
}

/**
 * Sets the storage adapter instance.
 * This should be called once during app initialization.
 */
export function setStorageAdapter(adapter: StorageAdapter): void {
    storageInstance = adapter;
}

/**
 * Gets the current storage adapter instance.
 * Throws an error if no adapter has been set.
 */
export function getStorageAdapter<T extends StorageAdapter>(): T {
    if (!storageInstance) {
        throw new Error(
            "Storage adapter not initialized. Call initializeStorage() or setStorageAdapter() first.",
        );
    }
    return storageInstance as T;
}

/**
 * Resets the storage instance. Useful for testing or when you need to reinitialize.
 */
export function resetStorageAdapter(): void {
    storageInstance = null;
}
