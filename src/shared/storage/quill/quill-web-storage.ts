import type { QuillStorageAdapter } from "src/shared/storage/quill/quill-storage-adapter";
import { WebIndexedDBStorage } from "src/shared/storage/web-storage";
import type { World, WorldObject } from "src/shared/types/quill-types";

const DB_NAME = "ChiselQuillDB";
const WORLDS_STORE = "worlds";
const OBJECTS_STORE = "worldObjects";
const WORLD_ID_KEY = "worldId";

export class WebQuillStorage implements QuillStorageAdapter {
    private worldsStorage: WebIndexedDBStorage<World>;

    constructor() {
        this.worldsStorage = new WebIndexedDBStorage<World>(
            DB_NAME,
            WORLDS_STORE,
            OBJECTS_STORE,
            WORLD_ID_KEY,
            1,
        );
    }

    async createWorld(world: World): Promise<void> {
        await this.worldsStorage.create(world);
    }

    async getWorld(worldId: string): Promise<World | null> {
        return await this.worldsStorage.get(worldId);
    }

    async getAllWorlds(): Promise<World[]> {
        return await this.worldsStorage.getAll();
    }

    async updateWorld(world: World): Promise<void> {
        await this.worldsStorage.update(world);
    }

    async deleteWorld(worldId: string): Promise<void> {
        await this.worldsStorage.delete(worldId);
    }

    async createWorldObject(worldId: string, obj: WorldObject): Promise<void> {
        await this.worldsStorage.createNested<WorldObject>(
            worldId,
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
            objectId,
        );
    }

    async getAllWorldObjects(worldId: string): Promise<WorldObject[]> {
        return await this.worldsStorage.getAllNested<WorldObject>(worldId);
    }

    async updateWorldObject(worldId: string, obj: WorldObject): Promise<void> {
        await this.worldsStorage.updateNested<WorldObject>(
            worldId,
            obj.objectId,
            obj,
        );
    }

    async deleteWorldObject(worldId: string, objectId: string): Promise<void> {
        await this.worldsStorage.deleteNested(worldId, objectId);
    }

    async worldExists(worldId: string): Promise<boolean> {
        return await this.worldsStorage.exists(worldId);
    }

    async objectExists(worldId: string, objectId: string): Promise<boolean> {
        return await this.worldsStorage.nestedExists(worldId, objectId);
    }
}
