import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seed")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Seed",
                icon: <ThemedRemixIcon icon="Seedling" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Seed will be a bunch of RNG tools for GMs</div>;
}
