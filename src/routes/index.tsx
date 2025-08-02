import { ThemeToggle } from "@/shared/components/theme-toggle";
import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useSidebar(<div>test</div>);

	return (
		<div>
			<ThemeToggle />
		</div>
	);
}
