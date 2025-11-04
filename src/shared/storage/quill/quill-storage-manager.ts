import type { QuillStorageAdapter } from "src/shared/storage/quill/quill-storage-adapter";
import { TauriQuillStorage } from "src/shared/storage/quill/quill-tauri-storage";
import { WebQuillStorage } from "src/shared/storage/quill/quill-web-storage";
import {
    getStorageAdapter,
    initializeStorage,
} from "src/shared/storage/storage-manager";

/**
 * Initializes the Quill storage system with the appropriate adapter.
 * Call this once during app initialization.
 */
export function initializeQuillStorage(): void {
    initializeStorage(new TauriQuillStorage(), new WebQuillStorage());
}

/**
 * Gets the Quill storage adapter.
 * Throws an error if not initialized.
 */
export function getQuillStorage(): QuillStorageAdapter {
    return getStorageAdapter<QuillStorageAdapter>();
}
