import * as fs from "node:fs";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/shared/components/ui/sidebar";
import { useSidebar } from "@/shared/hooks/sidebar-hook";

const IndexSidebar = () => {
  return (
    <Sidebar collapsed={true} setCollapsed={() => {}}>
      test
    </Sidebar>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useSidebar(<IndexSidebar />);
  return <div></div>;
}
