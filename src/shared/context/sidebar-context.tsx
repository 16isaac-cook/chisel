import React, { createContext, useContext, useState } from "react";

export interface SidebarSlot {
	header?: React.ReactNode;
	content?: React.ReactNode;
	footer?: React.ReactNode;
}

const SidebarSlotContext = createContext<{
	sidebar: SidebarSlot;
	setSidebar: (slot: SidebarSlot) => void;
} | null>(null);

export function SidebarSlotProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebar, setSidebar] = useState<SidebarSlot>({});
	return (
		<SidebarSlotContext.Provider value={{ sidebar, setSidebar }}>
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

export function useCurrentSidebar() {
	const ctx = useContext(SidebarSlotContext);
	if (!ctx)
		throw new Error(
			"useCurrentSidebar must be used within SidebarSlotProvider"
		);
	return ctx.sidebar;
}
