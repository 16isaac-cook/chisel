import { type SidebarSlot, SidebarSlotContext } from "@context/sidebar-context";
import { useSidebarOpen } from "@hooks/use-sidebar";
import { type ReactNode, useState } from "react";

export function SidebarSlotProvider({ children }: { children: ReactNode }) {
    const [sidebar, setSidebar] = useState<SidebarSlot>({});

    const { isOpen, toggleOpen, setOpen } = useSidebarOpen();

    return (
        <SidebarSlotContext.Provider
            value={{
                sidebar,
                setSidebar,
                open: isOpen,
                toggleOpen,
                setOpen,
            }}
        >
            {children}
        </SidebarSlotContext.Provider>
    );
}
