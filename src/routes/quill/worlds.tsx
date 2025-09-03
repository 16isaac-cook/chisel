import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/worlds")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Worlds",
                icon: <ThemedRemixIcon icon="Globe" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/worlds"!</div>;
}
