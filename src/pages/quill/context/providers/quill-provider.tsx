import { QuillContext, type WorldId } from "@pages/quill/context/quill-context";
import React, { useState } from "react";

export function QuillProvider({ children }: { children: React.ReactNode }) {
    const [world, setWorld] = useState<WorldId | null>(null);

    return (
        <QuillContext.Provider value={{ world, setWorld }}>
            {children}
        </QuillContext.Provider>
    );
}
