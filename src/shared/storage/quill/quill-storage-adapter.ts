import type { World, WorldObject } from "src/shared/types/quill-types";

export interface QuillStorageAdapter {
    // World operations
    createWorld(world: World): Promise<void>;
    getWorld(worldId: string): Promise<World | null>;
    getAllWorlds(): Promise<World[]>;
    updateWorld(world: World): Promise<void>;
    deleteWorld(worldId: string): Promise<void>;

    // World Object operations
    createWorldObject(worldId: string, obj: WorldObject): Promise<void>;
    getWorldObject(
        worldId: string,
        objectId: string,
    ): Promise<WorldObject | null>;
    getAllWorldObjects(worldId: string): Promise<WorldObject[]>;
    updateWorldObject(worldId: string, obj: WorldObject): Promise<void>;
    deleteWorldObject(worldId: string, objectId: string): Promise<void>;

    // Utility operations
    worldExists(worldId: string): Promise<boolean>;
    objectExists(worldId: string, objectId: string): Promise<boolean>;
}
