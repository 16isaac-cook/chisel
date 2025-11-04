import type { QuillStorageAdapter } from "src/shared/storage/quill/quill-storage-adapter";
import { TauriFilesystemStorage } from "src/shared/storage/tauri-storage";
import type { World, WorldObject } from "src/shared/types/quill-types";

const QUILL_DIR = "quill";
const WORLDS_COLLECTION = "worlds";
const WORLD_INFO_FILE = "world.json";
const OBJECTS_COLLECTION = "objects";

export class TauriQuillStorage implements QuillStorageAdapter {
    private worldsStorage: TauriFilesystemStorage<World>;

    constructor() {
        this.worldsStorage = new TauriFilesystemStorage<World>(
            QUILL_DIR,
            WORLDS_COLLECTION,
            WORLD_INFO_FILE,
        );
    }

    async createWorld(world: World): Promise<void> {
        await this.worldsStorage.create(world.worldId, world);
    }

    async getWorld(worldId: string): Promise<World | null> {
        return await this.worldsStorage.get(worldId);
    }

    async getAllWorlds(): Promise<World[]> {
        return await this.worldsStorage.getAll();
    }

    async updateWorld(world: World): Promise<void> {
        await this.worldsStorage.update(world.worldId, world);
    }

    async deleteWorld(worldId: string): Promise<void> {
        await this.worldsStorage.delete(worldId);
    }

    async createWorldObject(worldId: string, obj: WorldObject): Promise<void> {
        await this.worldsStorage.createNested<WorldObject>(
            worldId,
            OBJECTS_COLLECTION,
            obj.objectId,
            obj,
        );
    }

    async getWorldObject(
        worldId: string,
        objectId: string,
    ): Promise<WorldObject | null> {
        return await this.worldsStorage.getNested<WorldObject>(
            worldId,
            OBJECTS_COLLECTION,
            objectId,
        );
    }

    async getAllWorldObjects(worldId: string): Promise<WorldObject[]> {
        return await this.worldsStorage.getAllNested<WorldObject>(
            worldId,
            OBJECTS_COLLECTION,
        );
    }

    async updateWorldObject(worldId: string, obj: WorldObject): Promise<void> {
        await this.worldsStorage.updateNested<WorldObject>(
            worldId,
            OBJECTS_COLLECTION,
            obj.objectId,
            obj,
        );
    }

    async deleteWorldObject(worldId: string, objectId: string): Promise<void> {
        await this.worldsStorage.deleteNested(
            worldId,
            OBJECTS_COLLECTION,
            objectId,
        );
    }

    async worldExists(worldId: string): Promise<boolean> {
        return await this.worldsStorage.exists(worldId);
    }

    async objectExists(worldId: string, objectId: string): Promise<boolean> {
        return await this.worldsStorage.nestedExists(
            worldId,
            OBJECTS_COLLECTION,
            objectId,
        );
    }
}
