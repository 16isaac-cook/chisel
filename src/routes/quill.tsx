import { useEffect } from "react";
import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import {
    createFileRoute,
    Link,
    Outlet,
    useRouter,
} from "@tanstack/react-router";
import useSidebar from "@/shared/hooks/use-sidebar.ts";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar.tsx";

export const Route = createFileRoute("/quill")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Quill",
                icon: <ThemedRemixIcon icon="QuillPen" />,
            },
        ],
    }),
});

function RouteComponent() {
    useSidebar({
        content: (
            <>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span>Main</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Home">
                                    <Link to="/quill">
                                        <ThemedRemixIcon icon="Home2" />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Worlds">
                                    <Link to="/quill/worlds">
                                        <ThemedRemixIcon icon="Globe" />
                                        <span>Worlds</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span>World</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Overview">
                                    <Link to="/quill/overview">
                                        <ThemedRemixIcon icon="Book2" />
                                        <span>Overview</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="World Objects"
                                >
                                    <Link to="/quill/world-objects">
                                        <ThemedRemixIcon icon="Haze" />
                                        <span>World Objects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Maps">
                                    <Link to="/quill/maps">
                                        <ThemedRemixIcon icon="Map" />
                                        <span>Maps</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="History">
                                    <Link to="/quill/history">
                                        <ThemedRemixIcon icon="Hourglass" />
                                        <span>History</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Campaigns">
                                    <Link to="/quill/campaigns">
                                        <ThemedRemixIcon icon="Team" />
                                        <span>Campaigns</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Writing Tools"
                                >
                                    <Link to="/quill/writing-tools">
                                        <ThemedRemixIcon icon="PenNib" />
                                        <span>Writing Tools</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Files">
                                    <Link to="/quill/files">
                                        <ThemedRemixIcon icon="Folder3" />
                                        <span>Files</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span>Other</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Settings">
                                    <Link to="/quill/settings">
                                        <ThemedRemixIcon icon="Settings3" />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Help & Info"
                                >
                                    <Link to="/quill/help-and-info">
                                        <ThemedRemixIcon icon="Question" />
                                        <span>Help & Info</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </>
        ),
    });

    const router = useRouter();

    return <Outlet />;
}
