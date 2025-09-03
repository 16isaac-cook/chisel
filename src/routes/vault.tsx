import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vault")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Vault",
                icon: <ThemedRemixIcon icon="Safe2" />,
            },
        ],
    }),
});

function RouteComponent() {
    return (
        <div>
            Vault will be a tool for players to track party/individual loot
        </div>
    );
}
