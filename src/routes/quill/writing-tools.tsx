import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/writing-tools")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Writing Tools",
                icon: <ThemedRemixIcon icon="PenNib" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/writing-tools"!</div>;
}
