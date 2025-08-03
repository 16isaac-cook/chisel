import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "./ui/sidebar";

import { useCurrentSidebar } from "@/shared/context/sidebar-context";

export function AppSidebar() {
	const { header, content, footer } = useCurrentSidebar();

	return (
		<Sidebar className="top-16" collapsible="icon">
			<SidebarHeader>{header}</SidebarHeader>
			<SidebarContent>{content}</SidebarContent>
			<SidebarFooter>{footer}</SidebarFooter>
		</Sidebar>
	);
}
