import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@/shared/components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/history")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "History",
                icon: <ThemedRemixIcon icon="Hourglass" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/history"!</div>;
}
