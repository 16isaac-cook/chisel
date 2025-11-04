/**
 * Generic IndexedDB storage for web.
 * Stores items in two object stores: one for main items, one for nested items.
 */
export class WebIndexedDBStorage<T extends { [key: string]: any }> {
    private db: IDBDatabase | null = null;
    private readonly dbName: string;
    private readonly itemsStoreName: string;
    private readonly nestedItemsStoreName: string;
    private readonly itemIdKey: string;
    private readonly dbVersion: number;

    constructor(
        dbName: string,
        itemsStoreName: string,
        nestedItemsStoreName: string,
        itemIdKey: string = "id",
        dbVersion: number = 1,
    ) {
        this.dbName = dbName;
        this.itemsStoreName = itemsStoreName;
        this.nestedItemsStoreName = nestedItemsStoreName;
        this.itemIdKey = itemIdKey;
        this.dbVersion = dbVersion;
    }

    private async getDB(): Promise<IDBDatabase> {
        if (this.db) {
            return this.db;
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error(`Failed to open IndexedDB: ${this.dbName}`));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create items store
                if (!db.objectStoreNames.contains(this.itemsStoreName)) {
                    db.createObjectStore(this.itemsStoreName, {
                        keyPath: this.itemIdKey,
                    });
                }

                // Create nested items store with composite key
                if (!db.objectStoreNames.contains(this.nestedItemsStoreName)) {
                    const nestedStore = db.createObjectStore(
                        this.nestedItemsStoreName,
                        {
                            keyPath: ["parentId", "nestedId"],
                        },
                    );
                    // Create an index for querying all nested items by parent
                    nestedStore.createIndex("parentId", "parentId", {
                        unique: false,
                    });
                }
            };
        });
    }

    private async performTransaction<R>(
        storeName: string,
        mode: IDBTransactionMode,
        operation: (store: IDBObjectStore) => IDBRequest<R>,
    ): Promise<R> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], mode);
            const store = transaction.objectStore(storeName);
            const request = operation(store);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async create(item: T): Promise<void> {
        await this.performTransaction(
            this.itemsStoreName,
            "readwrite",
            (store) => store.add(item),
        );
    }

    async get(itemId: string): Promise<T | null> {
        try {
            const item = await this.performTransaction(
                this.itemsStoreName,
                "readonly",
                (store) => store.get(itemId),
            );
            return item || null;
        } catch (error) {
            console.error(`Error getting item ${itemId}:`, error);
            return null;
        }
    }

    async getAll(): Promise<T[]> {
        try {
            const items = await this.performTransaction(
                this.itemsStoreName,
                "readonly",
                (store) => store.getAll(),
            );
            return items || [];
        } catch (error) {
            console.error("Error getting all items:", error);
            return [];
        }
    }

    async update(item: T): Promise<void> {
        await this.performTransaction(
            this.itemsStoreName,
            "readwrite",
            (store) => store.put(item),
        );
    }

    async delete(itemId: string): Promise<void> {
        const db = await this.getDB();

        // Delete the item and all its nested items in a single transaction
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(
                [this.itemsStoreName, this.nestedItemsStoreName],
                "readwrite",
            );

            const itemsStore = transaction.objectStore(this.itemsStoreName);
            const nestedStore = transaction.objectStore(
                this.nestedItemsStoreName,
            );

            // Delete the main item
            itemsStore.delete(itemId);

            // Delete all nested items for this parent
            const index = nestedStore.index("parentId");
            const range = IDBKeyRange.only(itemId);
            const cursorRequest = index.openCursor(range);

            cursorRequest.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursor>).result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }

    async exists(itemId: string): Promise<boolean> {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(
                    [this.itemsStoreName],
                    "readonly",
                );
                const store = transaction.objectStore(this.itemsStoreName);
                const request = store.getKey(itemId);

                request.onsuccess = () => {
                    resolve(request.result !== undefined);
                };

                request.onerror = () => {
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(`Error checking if item ${itemId} exists:`, error);
            return false;
        }
    }

    // Nested items methods

    async createNested<N>(
        parentId: string,
        nestedId: string,
        nestedItem: N,
    ): Promise<void> {
        const itemWithParent = { ...nestedItem, parentId, nestedId };
        await this.performTransaction(
            this.nestedItemsStoreName,
            "readwrite",
            (store) => store.add(itemWithParent),
        );
    }

    async getNested<N>(parentId: string, nestedId: string): Promise<N | null> {
        try {
            const result = await this.performTransaction(
                this.nestedItemsStoreName,
                "readonly",
                (store) => store.get([parentId, nestedId]),
            );

            if (!result) {
                return null;
            }

            // Remove the parentId and nestedId properties before returning
            const { parentId: _, nestedId: __, ...item } = result;
            return item as N;
        } catch (error) {
            console.error(
                `Error getting nested item ${nestedId} in parent ${parentId}:`,
                error,
            );
            return null;
        }
    }

    async getAllNested<N>(parentId: string): Promise<N[]> {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(
                    [this.nestedItemsStoreName],
                    "readonly",
                );
                const store = transaction.objectStore(
                    this.nestedItemsStoreName,
                );
                const index = store.index("parentId");
                const range = IDBKeyRange.only(parentId);
                const request = index.getAll(range);

                request.onsuccess = () => {
                    const results = request.result || [];
                    // Remove parentId and nestedId properties from each item
                    const items = results.map((result) => {
                        const { parentId: _, nestedId: __, ...item } = result;
                        return item as N;
                    });
                    resolve(items);
                };

                request.onerror = () => {
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(
                `Error getting all nested items for parent ${parentId}:`,
                error,
            );
            return [];
        }
    }

    async updateNested<N>(
        parentId: string,
        nestedId: string,
        nestedItem: N,
    ): Promise<void> {
        const itemWithParent = { ...nestedItem, parentId, nestedId };
        await this.performTransaction(
            this.nestedItemsStoreName,
            "readwrite",
            (store) => store.put(itemWithParent),
        );
    }

    async deleteNested(parentId: string, nestedId: string): Promise<void> {
        await this.performTransaction(
            this.nestedItemsStoreName,
            "readwrite",
            (store) => store.delete([parentId, nestedId]),
        );
    }

    async nestedExists(parentId: string, nestedId: string): Promise<boolean> {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(
                    [this.nestedItemsStoreName],
                    "readonly",
                );
                const store = transaction.objectStore(
                    this.nestedItemsStoreName,
                );
                const request = store.getKey([parentId, nestedId]);

                request.onsuccess = () => {
                    resolve(request.result !== undefined);
                };

                request.onerror = () => {
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(
                `Error checking if nested item ${nestedId} exists in parent ${parentId}:`,
                error,
            );
            return false;
        }
    }
}
