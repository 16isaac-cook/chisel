import { Link, useLoaderData, useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ThemedRemixIcon } from "./themed-remixicon";

export function IndexNav() {
	const router = useRouter();

	const tree = router.routeTree;

	if (!tree.children) return null;

	const directChildren = Object.values(tree.children)
		.filter((child) => !!child.path)
		.filter((child) => child.id !== "/");

	console.log(useLoaderData(directChildren[0]));

	return (
		<div className="flex gap-2">
			{directChildren.map((route) => (
				<Button
					key={route.id}
					asChild
					variant="secondary"
					size="category"
				>
					<Link to={route.id}>
						{route.options?.head?.().meta?.find((m: any) => m.icon)
							?.icon || <ThemedRemixIcon icon="FileUnknow" />}
						{route.options?.head?.().meta?.find((m: any) => m.title)
							?.title || route.id}
					</Link>
				</Button>
			))}
		</div>
	);
}
