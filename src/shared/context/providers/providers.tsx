import { SettingsProvider } from "@context/providers/settings-provider";
import { SidebarSlotProvider } from "@context/providers/sidebar-provider";
import { QuillProvider } from "@pages/quill/context/quill-context";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SettingsProvider>
            <SidebarSlotProvider>
                <QuillProvider>{children}</QuillProvider>
            </SidebarSlotProvider>
        </SettingsProvider>
    );
}
