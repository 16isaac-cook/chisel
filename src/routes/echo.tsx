import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/echo")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Echo",
				icon: <ThemedRemixIcon icon="Music2" />,
			},
		],
	}),
});

function RouteComponent() {
	return <div>Echo will be a tool for music/sound effects</div>;
}
