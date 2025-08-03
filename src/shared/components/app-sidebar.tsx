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

	const collapsible = isSidebarSlotEmpty(slot) ? "offcanvas" : "icon";

	return (
		<Sidebar className="top-16" collapsible={collapsible}>
			<SidebarHeader>{slot.header}</SidebarHeader>
			<SidebarContent>{slot.content}</SidebarContent>
			<SidebarFooter>{slot.footer}</SidebarFooter>
		</Sidebar>
	);
}
