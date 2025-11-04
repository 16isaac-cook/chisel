import type { QuillStorageAdapter } from "src/shared/storage/quill/quill-storage-adapter";
import { TauriQuillStorage } from "src/shared/storage/quill/quill-tauri-storage";
import { WebQuillStorage } from "src/shared/storage/quill/quill-web-storage";
import {
    getStorageAdapter,
    isTauriEnvironment,
    setStorageAdapter,
} from "src/shared/storage/storage-manager";

let quillStorageInitialized = false;

/**
 * Initializes the Quill storage system with the appropriate adapter.
 * Call this once during app initialization.
 */
export function initializeQuillStorage(): void {
    if (quillStorageInitialized) {
        return;
    }

    if (isTauriEnvironment()) {
        console.log("Initializing Tauri Quill storage adapter");
        setStorageAdapter(new TauriQuillStorage());
    } else {
        console.log("Initializing Web Quill storage adapter");
        setStorageAdapter(new WebQuillStorage());
    }

    quillStorageInitialized = true;
}

/**
 * Gets the Quill storage adapter.
 * Automatically initializes if not already done.
 */
export function getQuillStorage(): QuillStorageAdapter {
    if (!quillStorageInitialized) {
        initializeQuillStorage();
    }
    return getStorageAdapter<QuillStorageAdapter>();
}

/**
 * Resets the Quill storage initialization state.
 * Useful for testing.
 */
export function resetQuillStorage(): void {
    quillStorageInitialized = false;
}
