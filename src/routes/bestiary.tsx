import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bestiary")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Bestiary",
                icon: <ThemedRemixIcon library="lucide" icon="PawPrint" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Bestiary will be a tool for sharing enemy stats</div>;
}
