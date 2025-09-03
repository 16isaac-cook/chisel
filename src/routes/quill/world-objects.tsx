import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@/shared/components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/world-objects")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "World Objects",
                icon: <ThemedRemixIcon icon="Haze" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/world-objects"!</div>;
}
