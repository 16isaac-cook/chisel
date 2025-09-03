import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/archive")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Archive",
                icon: <ThemedRemixIcon icon="BookShelf" />,
            },
        ],
    }),
});

function RouteComponent() {
    return (
        <div>
            Archive will be an information sharing tool from GMs to Players
        </div>
    );
}
