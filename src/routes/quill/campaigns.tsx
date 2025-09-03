import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@/shared/components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/campaigns")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Campaigns",
                icon: <ThemedRemixIcon icon="Team" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/campaigns"!</div>;
}
