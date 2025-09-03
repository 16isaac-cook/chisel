import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/overview")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Overview",
                icon: <ThemedRemixIcon icon="Book2" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/overview"!</div>;
}
