import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
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

function SidebarContent() {
    const match = useMatchRoute();

    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel>
                    <span>Main</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Home"
                                isActive={
                                    !!match({
                                        to: "/quill",
                                    })
                                }
                            >
                                <Link to="/quill">
                                    <ThemedRemixIcon icon="Home2" />
                                    <span>Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Worlds"
                                isActive={
                                    !!match({
                                        to: "/quill/worlds",
                                        fuzzy: true,
                                    })
                                }
                            >
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
                            <SidebarMenuButton
                                asChild
                                tooltip="Overview"
                                isActive={
                                    !!match({
                                        to: "/quill/overview",
                                        fuzzy: true,
                                    })
                                }
                            >
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
                                isActive={
                                    !!match({
                                        to: "/quill/world-objects",
                                        fuzzy: true,
                                    })
                                }
                            >
                                <Link to="/quill/world-objects">
                                    <ThemedRemixIcon icon="Haze" />
                                    <span>World Objects</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Maps"
                                isActive={
                                    !!match({
                                        to: "/quill/maps",
                                        fuzzy: true,
                                    })
                                }
                            >
                                <Link to="/quill/maps">
                                    <ThemedRemixIcon icon="Map" />
                                    <span>Maps</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="History"
                                isActive={
                                    !!match({
                                        to: "/quill/history",
                                        fuzzy: true,
                                    })
                                }
                            >
                                <Link to="/quill/history">
                                    <ThemedRemixIcon icon="Hourglass" />
                                    <span>History</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Campaigns"
                                isActive={
                                    !!match({
                                        to: "/quill/campaigns",
                                        fuzzy: true,
                                    })
                                }
                            >
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
                                isActive={
                                    !!match({
                                        to: "/quill/writing-tools",
                                        fuzzy: true,
                                    })
                                }
                            >
                                <Link to="/quill/writing-tools">
                                    <ThemedRemixIcon icon="PenNib" />
                                    <span>Writing Tools</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Files"
                                isActive={
                                    !!match({
                                        to: "/quill/files",
                                        fuzzy: true,
                                    })
                                }
                            >
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
                            <SidebarMenuButton
                                asChild
                                tooltip="Settings"
                                isActive={
                                    !!match({
                                        to: "/quill/settings",
                                        fuzzy: true,
                                    })
                                }
                            >
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
                                isActive={
                                    !!match({
                                        to: "/quill/help-and-info",
                                        fuzzy: true,
                                    })
                                }
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
    );
}

function RouteComponent() {
    useSidebar({
        content: <SidebarContent />,
    });

    const router = useRouter();

    return <Outlet />;
}
