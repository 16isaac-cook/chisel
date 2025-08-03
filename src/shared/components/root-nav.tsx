import { Link, useRouter } from "@tanstack/react-router";

export function RootLevelNav() {
	const router = useRouter();

	const tree = router.routeTree;

	if (!tree.children) return null;

	const directChildren = Object.values(tree.children)
		.filter((child) => !!child.path)
		.filter((child) => child.id !== "/");

	return (
		<div className="flex gap-2">
			{directChildren.map((route) => (
				<Link key={route.id} to={route.id}>
					{route.meta?.find((m: any) => m.title)?.title || route.id}
				</Link>
			))}
		</div>
	);
}
