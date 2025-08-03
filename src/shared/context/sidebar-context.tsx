import { settingsStore } from "@/stores/settings-store";
import { useStore } from "@tanstack/react-store";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface SidebarSlot {
	header?: React.ReactNode;
	content?: React.ReactNode;
	footer?: React.ReactNode;
}

interface SidebarContextType {
	sidebar: SidebarSlot;
	setSidebar: (slot: SidebarSlot) => void;
	open: boolean;
	toggleOpen: () => void;
	setOpen: (open: boolean) => void;
}

const SidebarSlotContext = createContext<SidebarContextType | null>(null);

export function SidebarSlotProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const settings = useStore(settingsStore);

	const [isOpen, setIsOpen] = useState(
		settings.uiState.sidebar === "expanded"
	);
	const [sidebar, setSidebar] = useState<SidebarSlot>({});

	useEffect(() => {
		settingsStore.setState((prev) => ({
			...prev,
			uiState: {
				...prev.uiState,
				sidebar: isOpen ? "expanded" : "collapsed",
			},
		}));
	}, [isOpen]);

	const toggleOpen = () => setIsOpen((open) => !open);

	return (
		<SidebarSlotContext.Provider
			value={{
				sidebar,
				setSidebar,
				open: isOpen,
				toggleOpen,
				setOpen: setIsOpen,
			}}
		>
			{children}
		</SidebarSlotContext.Provider>
	);
}

export function useSidebarSlot() {
	const ctx = useContext(SidebarSlotContext);
	if (!ctx)
		throw new Error(
			"useSidebarSlot must be used within SidebarSlotProvider"
		);
	return ctx.setSidebar;
}

export function useSidebarOpen() {
	const ctx = useContext(SidebarSlotContext);
	if (!ctx)
		throw new Error("useSidebarOpen must be used within SidebarProvider");
	return {
		isOpen: ctx.open,
		toggleOpen: ctx.toggleOpen,
		setOpen: ctx.setOpen,
	};
}

export function useCurrentSidebar() {
	const ctx = useContext(SidebarSlotContext);
	if (!ctx)
		throw new Error(
			"useCurrentSidebar must be used within SidebarSlotProvider"
		);
	return ctx.sidebar;
}

export function isSidebarSlotEmpty(slot: SidebarSlot): boolean {
	return !slot.header && !slot.content && !slot.footer;
}
