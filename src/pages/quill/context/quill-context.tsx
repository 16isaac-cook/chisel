import React, { createContext, useContext, useState } from "react";

type WorldId = string;
export type QuillContextType = {
    world: WorldId | null;
    setWorld: (world: WorldId) => void;
} | null;

const QuillContext = createContext<QuillContextType>(null);

export function QuillProvider({ children }: { children: React.ReactNode }) {
    const [world, setWorld] = useState<WorldId | null>(null);

    return (
        <QuillContext.Provider value={{ world, setWorld }}>
            {children}
        </QuillContext.Provider>
    );
}

export function useQuill() {
    const ctx = useContext(QuillContext);
    if (!ctx) throw new Error("useQuill must be used within a QuillProvider");
    return ctx;
}
