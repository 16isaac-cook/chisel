import { useSettingsStore } from "@context/settings-context";
import { useEffect } from "react";
import { type SidebarSlot, useSidebarSlot } from "@context/sidebar-context";

export default function useSidebar(sidebar: SidebarSlot | null) {
    const setSidebar = useSidebarSlot();

    useEffect(() => {
        setSidebar(sidebar ?? {});

        return () => {
            setSidebar({});
        };
    }, [setSidebar]);
}

export function useSidebarOpen() {
    const { settings, toggleSidebar, setSidebar } = useSettingsStore();

    const isOpen = settings.uiState.sidebar === "expanded";

    return {
        isOpen,
        toggleOpen: toggleSidebar,
        setOpen: (open: boolean) => setSidebar(open),
    };
}
