import { createContext, useContext } from "react";

export type WorldId = string;
export type QuillContextType = {
    world: WorldId | null;
    setWorld: (world: WorldId) => void;
} | null;

export const QuillContext = createContext<QuillContextType>(null);

export function useQuill() {
    const ctx = useContext(QuillContext);
    if (!ctx) throw new Error("useQuill must be used within a QuillProvider");
    return ctx;
}
