import { IndexNav } from "@/shared/components/index-nav";
import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useSidebar(null);

	return (
		<div>
			<IndexNav />
		</div>
	);
}
