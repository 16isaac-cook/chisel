import React, { ReactNode, useEffect, useState } from "react";
import {
	SidebarProvider as ShadcnSidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "./ui/sidebar";
import {
	isSidebarSlotEmpty,
	SidebarSlotProvider,
	useCurrentSidebar,
	useSidebarOpen,
} from "../context/sidebar-context";
import { useStore } from "@tanstack/react-store";
import { settingsStore } from "@/stores/settings-store";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { AppBreadcrumbs } from "./app-breadcrumbs";

function LayoutBody({ children }: { children: React.ReactNode }) {
	const sidebar = useCurrentSidebar();
	const isEmpty = isSidebarSlotEmpty(sidebar);

	return (
		<div className="flex flex-1 overflow-hidden">
			<AppSidebar />
			<main className="flex-1 overflow-auto p-4">
				<div className="w-full flex flex-row items-center mb-2">
					{!isEmpty && <SidebarTrigger />}
					<AppBreadcrumbs />
				</div>

				{children}
			</main>
		</div>
	);
}

function SidebarController({ children }: { children: ReactNode }) {
	const { isOpen, setOpen } = useSidebarOpen();

	return (
		<ShadcnSidebarProvider
			open={isOpen}
			onOpenChange={(open) => setOpen(open)}
		>
			{children}
		</ShadcnSidebarProvider>
	);
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarSlotProvider>
			<SidebarController>
				<div className="flex flex-col h-screen w-full">
					<AppHeader />
					<LayoutBody>{children}</LayoutBody>
				</div>
			</SidebarController>
		</SidebarSlotProvider>
	);
}
