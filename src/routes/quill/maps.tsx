import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/maps")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Maps",
                icon: <ThemedRemixIcon icon="Map" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/maps"!</div>;
}
