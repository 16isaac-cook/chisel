import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/atlas")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Atlas",
				icon: <ThemedRemixIcon icon="TreasureMap" />,
			},
		],
	}),
});

function RouteComponent() {
	return <div>Atlas will be a map creation/sharing tool</div>;
}
