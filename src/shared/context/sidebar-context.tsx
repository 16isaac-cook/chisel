import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Layout } from "../components/layout";

type SetSidebarFn = (sidebar: ReactNode | null) => void;

const SidebarContext = createContext<{ setSidebar: SetSidebarFn } | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState<ReactNode | null>(null);

  return (
    <SidebarContext.Provider value={{ setSidebar }}>
      <Layout sidebar={sidebar}>{children}</Layout>
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx.setSidebar;
};
