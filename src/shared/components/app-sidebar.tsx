import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	useSidebar,
} from "./ui/sidebar";

import {
	isSidebarSlotEmpty,
	useCurrentSidebar,
} from "@/shared/context/sidebar-context";

export function AppSidebar() {
	const slot = useCurrentSidebar();

	return (
		<Sidebar
			className="top-16"
			collapsible={isSidebarSlotEmpty(slot) ? "offcanvas" : "icon"}
		>
			<SidebarHeader>{slot.header}</SidebarHeader>
			<SidebarContent>{slot.content}</SidebarContent>
			<SidebarFooter>{slot.footer}</SidebarFooter>
		</Sidebar>
	);
}
