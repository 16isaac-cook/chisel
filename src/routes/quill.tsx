import { ThemedRemixIcon } from "@/shared/components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quill")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Quill",
				icon: <ThemedRemixIcon icon="QuillPen" />,
			},
		],
	}),
});

function RouteComponent() {
	return <div>Hello "/quill"!</div>;
}
