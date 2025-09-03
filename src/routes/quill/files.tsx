import { createFileRoute } from "@tanstack/react-router";
import { ThemedRemixIcon } from "@/shared/components/themed-remixicon.tsx";

export const Route = createFileRoute("/quill/files")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Files",
                icon: <ThemedRemixIcon icon="Folder3" />,
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Hello "/quill/files"!</div>;
}
