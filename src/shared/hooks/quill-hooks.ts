// Query keys
import { generateId, getCurrentTimestamp } from "@lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuillStorage } from "src/shared/storage/quill/quill-storage-manager";
import type { World, WorldObject } from "src/shared/types/quill-types";

export const quillKeys = {
    all: ["quill", "worlds"] as const,
    detail: (worldId: string) => ["quill", "worlds", worldId] as const,
    objects: (worldId: string) =>
        ["quill", "worlds", worldId, "objects"] as const,
    object: (worldId: string, objectId: string) =>
        ["quill", "worlds", worldId, "objects", objectId] as const,
};

// World Hooks
export function useWorlds() {
    return useQuery({
        queryKey: quillKeys.all,
        queryFn: () => getQuillStorage().getAllWorlds(),
    });
}

export function useWorld(worldId: string | undefined) {
    return useQuery({
        queryKey: quillKeys.detail(worldId || ""),
        queryFn: () => getQuillStorage().getWorld(worldId || ""),
        enabled: !!worldId,
    });
}

export function useCreateWorld() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: Omit<World, "worldId" | "dateCreated" | "dateUpdated">,
        ) => {
            const world: World = {
                ...data,
                worldId: generateId(data.name),
                dateCreated: getCurrentTimestamp(),
                dateUpdated: getCurrentTimestamp(),
            };
            await getQuillStorage().createWorld(world);
            return world;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: quillKeys.all });
        },
    });
}

export function useUpdateWorld() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (world: World) => {
            const updatedWorld: World = {
                ...world,
                dateUpdated: getCurrentTimestamp(),
            };
            await getQuillStorage().updateWorld(updatedWorld);
            return updatedWorld;
        },
        onSuccess: (world) => {
            queryClient.invalidateQueries({ queryKey: quillKeys.all });
            queryClient.invalidateQueries({
                queryKey: quillKeys.detail(world.worldId),
            });
        },
    });
}

export function useDeleteWorld() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (worldId: string) => {
            await getQuillStorage().deleteWorld(worldId);
            return worldId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: quillKeys.all });
        },
    });
}

// World Object Hooks

export function useWorldObjects(worldId: string | undefined) {
    return useQuery({
        queryKey: quillKeys.objects(worldId || ""),
        queryFn: () => getQuillStorage().getAllWorldObjects(worldId || ""),
        enabled: !!worldId,
    });
}

export function useWorldObject(
    worldId: string | undefined,
    objectId: string | undefined,
) {
    return useQuery({
        queryKey: quillKeys.object(worldId || "", objectId || ""),
        queryFn: () =>
            getQuillStorage().getWorldObject(worldId || "", objectId || ""),
        enabled: !!worldId && !!objectId,
    });
}

export function useCreateWorldObject(worldId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: Omit<WorldObject, "objectId" | "dateCreated" | "dateUpdated">,
        ) => {
            const obj: WorldObject = {
                ...data,
                objectId: generateId(data.name),
                dateCreated: getCurrentTimestamp(),
                dateUpdated: getCurrentTimestamp(),
            };
            await getQuillStorage().createWorldObject(worldId, obj);
            return obj;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: quillKeys.objects(worldId),
            });
        },
    });
}

export function useUpdateWorldObject(worldId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (obj: WorldObject) => {
            const updatedObj: WorldObject = {
                ...obj,
                dateUpdated: getCurrentTimestamp(),
            };
            await getQuillStorage().updateWorldObject(worldId, updatedObj);
            return updatedObj;
        },
        onSuccess: (obj) => {
            queryClient.invalidateQueries({
                queryKey: quillKeys.objects(worldId),
            });
            queryClient.invalidateQueries({
                queryKey: quillKeys.object(worldId, obj.objectId),
            });
        },
    });
}

export function useDeleteWorldObject(worldId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (objectId: string) => {
            await getQuillStorage().deleteWorldObject(worldId, objectId);
            return objectId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: quillKeys.objects(worldId),
            });
        },
    });
}
