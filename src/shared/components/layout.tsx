import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { SidebarSlotProvider } from "../context/sidebar-context";
import { useStore } from "@tanstack/react-store";
import { settingsStore } from "@/stores/settings-store";
import { AppSidebar } from "./app-sidebar";

function LayoutBody({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-1 overflow-hidden">
			<AppSidebar />
			<main className="flex-1 overflow-auto p-4">
				<SidebarTrigger />
				{children}
			</main>
		</div>
	);
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const settings = useStore(settingsStore);
	const defaultOpen = settings.uiState.sidebar !== "collapsed";

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<SidebarSlotProvider>
				<div className="flex flex-col h-screen">
					<header>test</header>
					<LayoutBody>{children}</LayoutBody>
				</div>
			</SidebarSlotProvider>
		</SidebarProvider>
	);
}
