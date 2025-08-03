import { RiQuillPenFill } from "@remixicon/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quill")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Quill",
				icon: <RiQuillPenFill />,
			},
		],
	}),
});

function RouteComponent() {
	return <div>Hello "/quill"!</div>;
}
