import { RootLevelNav } from "@/shared/components/root-nav";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import useSidebar from "@/shared/hooks/use-sidebar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useSidebar({
		header: <div className="font-bold p-4">Home Header</div>,
		content: (
			<ul className="p-4 space-y-2">
				<li>Dashboard</li>
				<li>Settings</li>
			</ul>
		),
	});

	return (
		<div>
			<ThemeToggle />
			<Link to="/about">about</Link>
			<RootLevelNav />
		</div>
	);
}
