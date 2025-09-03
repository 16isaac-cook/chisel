import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/settings")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Settings",
                icon: <ThemedRemixIcon icon="Settings3" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/settings"!</div>;
}
