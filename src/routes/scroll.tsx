import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scroll")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Scroll",
                icon: <ThemedRemixIcon icon="FilePaper2" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Scroll will be a note-taking tool for players</div>;
}
