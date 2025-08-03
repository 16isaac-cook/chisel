import { useEffect } from "react";
import { SidebarSlot, useSidebarSlot } from "../context/sidebar-context";

export default function useSidebar(sidebar: SidebarSlot) {
	const setSidebar = useSidebarSlot();

	useEffect(() => {
		setSidebar(sidebar);
	}, [setSidebar]);
}
