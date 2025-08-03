import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "About",
			},
		],
	}),
});

function RouteComponent() {
	useSidebar(null);
	return <div>Hello "/about"!</div>;
}
