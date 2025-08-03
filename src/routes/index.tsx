import { IndexNav } from "@/shared/components/index-nav";
import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useSidebar(null);

	return (
		<div>
			<IndexNav />
			<Checkbox />
		</div>
	);
}
