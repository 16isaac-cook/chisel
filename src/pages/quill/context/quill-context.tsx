import React, { createContext, useContext } from "react";

export type QuillContextType = {};

const QuillContext = createContext<QuillContextType>({});

export function QuillProvider({ children }: { children: React.ReactNode }) {
    return <QuillContext.Provider value={{}}>{children}</QuillContext.Provider>;
}

export function useQuill() {
    const ctx = useContext(QuillContext);
    if (!ctx) throw new Error("useQuill must be used within a QuillProvider");
    return ctx;
}
