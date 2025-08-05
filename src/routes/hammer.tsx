import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hammer")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Hammer",
				icon: <ThemedRemixIcon icon="Hammer" />,
			},
		],
	}),
});

function RouteComponent() {
	return <div>Hammer will be a tool for homebrew</div>;
}
