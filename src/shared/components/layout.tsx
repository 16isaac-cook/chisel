import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import {
	SidebarSlotProvider,
	useCurrentSidebar,
} from "../context/sidebar-context";

function LayoutBody({ children }: { children: React.ReactNode }) {
	const sidebar = useCurrentSidebar();

	return (
		<div className="flex flex-1 overflow-hidden">
			{sidebar}
			<main className="flex-1 overflow-auto p-4">{children}</main>
		</div>
	);
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<SidebarSlotProvider>
				<div className="flex flex-col h-screen">
					<header>test</header>
					<LayoutBody>{children}</LayoutBody>
				</div>
			</SidebarSlotProvider>
		</SidebarProvider>
	);
}
