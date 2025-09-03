import { IndexNav } from "@components/index-nav";
import useSidebar from "@hooks/use-sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Checkbox } from "@components/ui/checkbox";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    useSidebar(null);

    return (
        <div>
            <IndexNav />
            <Checkbox />
        </div>
    );
}
