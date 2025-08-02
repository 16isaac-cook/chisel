import React, { useEffect } from "react";
import { useSidebarSlot } from "../context/sidebar-context";

export default function useSidebar(sidebar: React.ReactNode) {
	const setSidebar = useSidebarSlot();

	useEffect(() => {
		setSidebar(sidebar);
	}, [setSidebar]);
}
