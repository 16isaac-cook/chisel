import { SettingsProvider } from "@context/providers/settings-provider";
import { SidebarSlotProvider } from "@context/providers/sidebar-provider";
import { QuillProvider } from "@pages/quill/context/providers/quill-provider";
import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
});

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SettingsProvider>
            <SidebarSlotProvider>
                <QueryClientProvider client={queryClient}>
                    <QuillProvider>{children}</QuillProvider>
                </QueryClientProvider>
            </SidebarSlotProvider>
        </SettingsProvider>
    );
}
