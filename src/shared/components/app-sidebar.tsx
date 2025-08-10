import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "./ui/sidebar";

import {
	isSidebarSlotEmpty,
	useCurrentSidebar,
} from "@/shared/context/sidebar-context";

export function AppSidebar() {
	const slot = useCurrentSidebar();

	// noinspection SpellCheckingInspection
    const collapsible = isSidebarSlotEmpty(slot) ? "offcanvas" : "icon";

	return (
		<Sidebar className="fixed top-16 h-[calc(100vh-4rem)]" collapsible={collapsible}>
			<SidebarHeader>{slot.header}</SidebarHeader>
			<SidebarContent>{slot.content}</SidebarContent>
			<SidebarFooter>{slot.footer}</SidebarFooter>
		</Sidebar>
	);
}
