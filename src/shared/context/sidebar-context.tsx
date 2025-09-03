import { createContext, type ReactNode, useContext } from "react";

export interface SidebarSlot {
    header?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
}

export interface SidebarContextType {
    sidebar: SidebarSlot;
    setSidebar: (slot: SidebarSlot) => void;
    open: boolean;
    toggleOpen: () => void;
    setOpen: (open: boolean) => void;
}

export const SidebarSlotContext = createContext<SidebarContextType | null>(
    null,
);

export function useSidebarSlot() {
    const ctx = useContext(SidebarSlotContext);
    if (!ctx)
        throw new Error(
            "useSidebarSlot must be used within SidebarSlotProvider",
        );
    return ctx.setSidebar;
}

export function useSidebarOpen() {
    const ctx = useContext(SidebarSlotContext);
    if (!ctx)
        throw new Error("useSidebarOpen must be used within SidebarProvider");
    return {
        isOpen: ctx.open,
        toggleOpen: ctx.toggleOpen,
        setOpen: ctx.setOpen,
    };
}

export function useCurrentSidebar() {
    const ctx = useContext(SidebarSlotContext);
    if (!ctx)
        throw new Error(
            "useCurrentSidebar must be used within SidebarSlotProvider",
        );
    return ctx.sidebar;
}

export function isSidebarSlotEmpty(slot: SidebarSlot): boolean {
    return !slot.header && !slot.content && !slot.footer;
}
