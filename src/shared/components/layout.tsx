import { useSidebarOpen } from "@hooks/use-sidebar";
import { useTheme } from "@hooks/use-theme";
import React, { type ReactNode, useEffect, useState } from "react";
import {
    SidebarProvider as ShadcnSidebarProvider,
    SidebarTrigger,
} from "./ui/sidebar";
import {
    isSidebarSlotEmpty,
    useCurrentSidebar,
} from "@context/sidebar-context";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { AppBreadcrumbs } from "./app-breadcrumbs";

function LayoutBody({ children }: { children: React.ReactNode }) {
    const sidebar = useCurrentSidebar();
    const isEmpty = isSidebarSlotEmpty(sidebar);

    return (
        <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-auto p-4">
                <div className="w-full flex flex-row items-center mb-2">
                    {!isEmpty && <SidebarTrigger />}
                    <AppBreadcrumbs />
                </div>

                {children}
            </main>
        </div>
    );
}

function SidebarController({ children }: { children: ReactNode }) {
    const slot = useCurrentSidebar();
    const collapsible = isSidebarSlotEmpty(slot) ? "offcanvas" : "icon";

    const { isOpen, setOpen } = useSidebarOpen();

    const [tempOpen, setTempOpen] = useState(true);

    const visible = collapsible === "offcanvas" ? tempOpen : isOpen;

    useEffect(() => {
        if (collapsible === "offcanvas") {
            setTempOpen(false);
        }
    }, [collapsible]);

    function onOpenChange(open: boolean) {
        if (collapsible === "icon") {
            setOpen(open);
        } else {
            setTempOpen(open);
        }
    }

    return (
        <ShadcnSidebarProvider open={visible} onOpenChange={onOpenChange}>
            {children}
        </ShadcnSidebarProvider>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    useTheme();
    return (
        <SidebarController>
            <div className="flex flex-col h-screen w-full">
                <AppHeader />
                <LayoutBody>{children}</LayoutBody>
            </div>
        </SidebarController>
    );
}
