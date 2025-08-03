import { useEffect } from "react";
import { SidebarSlot, useSidebarSlot } from "../context/sidebar-context";

export default function useSidebar(sidebar: SidebarSlot | null) {
	const setSidebar = useSidebarSlot();

	useEffect(() => {
		setSidebar(sidebar ?? {});

		return () => {
			setSidebar({});
		};
	}, [setSidebar]);
}
