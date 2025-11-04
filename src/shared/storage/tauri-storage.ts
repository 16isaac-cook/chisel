import {
    BaseDirectory,
    exists,
    mkdir,
    readDir,
    readTextFile,
    remove,
    writeTextFile,
} from "@tauri-apps/plugin-fs";

/**
 * Generic filesystem storage for Tauri.
 * Stores items in a folder structure with JSON files.
 *
 * Structure:
 * {baseDir}/{collectionName}/
 *   ├── {itemId}/
 *   │   ├── item.json
 *   │   └── {nestedCollection}/
 *   │       └── {nestedId}.json
 */
export class TauriFilesystemStorage<T extends { [key: string]: any }> {
    private readonly baseDir: string;
    private readonly collectionName: string;
    private readonly itemFileName: string;

    constructor(
        baseDir: string,
        collectionName: string,
        itemFileName: string = "item.json",
    ) {
        this.baseDir = baseDir;
        this.collectionName = collectionName;
        this.itemFileName = itemFileName;
    }

    private getCollectionPath(): string {
        return `${this.baseDir}/${this.collectionName}`;
    }

    private getItemPath(itemId: string): string {
        return `${this.getCollectionPath()}/${itemId}`;
    }

    private getItemFilePath(itemId: string): string {
        return `${this.getItemPath(itemId)}/${this.itemFileName}`;
    }

    private getNestedCollectionPath(
        itemId: string,
        nestedCollection: string,
    ): string {
        return `${this.getItemPath(itemId)}/${nestedCollection}`;
    }

    private getNestedItemPath(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
    ): string {
        return `${this.getNestedCollectionPath(itemId, nestedCollection)}/${nestedId}.json`;
    }

    private async ensureCollectionExists(): Promise<void> {
        try {
            const collectionPath = this.getCollectionPath();
            const collectionExists = await exists(collectionPath, {
                baseDir: BaseDirectory.AppData,
            });
            if (!collectionExists) {
                await mkdir(collectionPath, {
                    baseDir: BaseDirectory.AppData,
                    recursive: true,
                });
            }
        } catch (error) {
            console.error(
                `Error ensuring collection ${this.collectionName} exists:`,
                error,
            );
        }
    }

    async create(itemId: string, item: T): Promise<void> {
        await this.ensureCollectionExists();

        // Create item directory
        const itemPath = this.getItemPath(itemId);
        await mkdir(itemPath, {
            baseDir: BaseDirectory.AppData,
            recursive: true,
        });

        // Write item file
        const itemFilePath = this.getItemFilePath(itemId);
        await writeTextFile(itemFilePath, JSON.stringify(item, null, 2), {
            baseDir: BaseDirectory.AppData,
        });
    }

    async get(itemId: string): Promise<T | null> {
        try {
            const itemFilePath = this.getItemFilePath(itemId);
            const content = await readTextFile(itemFilePath, {
                baseDir: BaseDirectory.AppData,
            });
            return JSON.parse(content) as T;
        } catch (error) {
            console.error(`Error reading item ${itemId}:`, error);
            return null;
        }
    }

    async getAll(): Promise<T[]> {
        await this.ensureCollectionExists();
        const items: T[] = [];

        try {
            const collectionPath = this.getCollectionPath();
            const entries = await readDir(collectionPath, {
                baseDir: BaseDirectory.AppData,
            });

            for (const entry of entries) {
                if (entry.isDirectory && entry.name) {
                    const item = await this.get(entry.name);
                    if (item) {
                        items.push(item);
                    }
                }
            }
        } catch (error) {
            console.error(
                `Error reading all items from ${this.collectionName}:`,
                error,
            );
        }

        return items;
    }

    async update(itemId: string, item: T): Promise<void> {
        const itemFilePath = this.getItemFilePath(itemId);
        await writeTextFile(itemFilePath, JSON.stringify(item, null, 2), {
            baseDir: BaseDirectory.AppData,
        });
    }

    async delete(itemId: string): Promise<void> {
        const itemPath = this.getItemPath(itemId);
        await remove(itemPath, {
            baseDir: BaseDirectory.AppData,
            recursive: true,
        });
    }

    async exists(itemId: string): Promise<boolean> {
        try {
            const itemFilePath = this.getItemFilePath(itemId);
            return await exists(itemFilePath, {
                baseDir: BaseDirectory.AppData,
            });
        } catch (error) {
            return false;
        }
    }

    // Nested collection methods

    async createNested<N>(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
        nestedItem: N,
    ): Promise<void> {
        const nestedCollectionPath = this.getNestedCollectionPath(
            itemId,
            nestedCollection,
        );

        // Ensure nested collection directory exists
        const nestedExists = await exists(nestedCollectionPath, {
            baseDir: BaseDirectory.AppData,
        });
        if (!nestedExists) {
            await mkdir(nestedCollectionPath, {
                baseDir: BaseDirectory.AppData,
                recursive: true,
            });
        }

        const nestedItemPath = this.getNestedItemPath(
            itemId,
            nestedCollection,
            nestedId,
        );
        await writeTextFile(
            nestedItemPath,
            JSON.stringify(nestedItem, null, 2),
            {
                baseDir: BaseDirectory.AppData,
            },
        );
    }

    async getNested<N>(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
    ): Promise<N | null> {
        try {
            const nestedItemPath = this.getNestedItemPath(
                itemId,
                nestedCollection,
                nestedId,
            );
            const content = await readTextFile(nestedItemPath, {
                baseDir: BaseDirectory.AppData,
            });
            return JSON.parse(content) as N;
        } catch (error) {
            console.error(`Error reading nested item ${nestedId}:`, error);
            return null;
        }
    }

    async getAllNested<N>(
        itemId: string,
        nestedCollection: string,
    ): Promise<N[]> {
        const nestedItems: N[] = [];

        try {
            const nestedCollectionPath = this.getNestedCollectionPath(
                itemId,
                nestedCollection,
            );
            const entries = await readDir(nestedCollectionPath, {
                baseDir: BaseDirectory.AppData,
            });

            for (const entry of entries) {
                if (
                    entry.isFile &&
                    entry.name &&
                    entry.name.endsWith(".json")
                ) {
                    const nestedId = entry.name.replace(".json", "");
                    const item = await this.getNested<N>(
                        itemId,
                        nestedCollection,
                        nestedId,
                    );
                    if (item) {
                        nestedItems.push(item);
                    }
                }
            }
        } catch (error) {
            console.error(
                `Error reading nested items from ${nestedCollection}:`,
                error,
            );
        }

        return nestedItems;
    }

    async updateNested<N>(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
        nestedItem: N,
    ): Promise<void> {
        const nestedItemPath = this.getNestedItemPath(
            itemId,
            nestedCollection,
            nestedId,
        );
        await writeTextFile(
            nestedItemPath,
            JSON.stringify(nestedItem, null, 2),
            {
                baseDir: BaseDirectory.AppData,
            },
        );
    }

    async deleteNested(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
    ): Promise<void> {
        const nestedItemPath = this.getNestedItemPath(
            itemId,
            nestedCollection,
            nestedId,
        );
        try {
            await remove(nestedItemPath, {
                baseDir: BaseDirectory.AppData,
            });
        } catch (error) {
            console.error(`Error deleting nested item ${nestedId}:`, error);
        }
    }

    async nestedExists(
        itemId: string,
        nestedCollection: string,
        nestedId: string,
    ): Promise<boolean> {
        try {
            const nestedItemPath = this.getNestedItemPath(
                itemId,
                nestedCollection,
                nestedId,
            );
            return await exists(nestedItemPath, {
                baseDir: BaseDirectory.AppData,
            });
        } catch (error) {
            return false;
        }
    }
}
