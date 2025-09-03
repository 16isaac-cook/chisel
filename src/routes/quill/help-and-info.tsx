import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/help-and-info")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Help & Info",
                icon: <ThemedRemixIcon icon="Question" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/help-and-info"!</div>;
}
