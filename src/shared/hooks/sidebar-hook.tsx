import type React from "react";
import { useSidebarContext } from "../context/sidebar-context";
import { useEffect } from "react";

export function useSidebar(sidebar: React.ReactNode) {
  const setSidebar = useSidebarContext();

  useEffect(() => {
    setSidebar(sidebar);
    return () => setSidebar(null);
  }, []);
}
