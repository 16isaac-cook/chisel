import React, { createContext, useContext, useState } from "react";

const SidebarSlotContext = createContext<{
	sidebar: React.ReactNode;
	setSidebar: (component: React.ReactNode) => void;
} | null>(null);

export function SidebarSlotProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebar, setSidebar] = useState<React.ReactNode>(null);

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
