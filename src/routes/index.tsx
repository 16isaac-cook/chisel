import { RootLevelNav } from "@/shared/components/root-nav";
import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useSidebar(null);

	return (
		<div>
			<RootLevelNav />
		</div>
	);
}
