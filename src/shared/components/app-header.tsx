import { useMatches } from "@tanstack/react-router";

export function AppHeader() {
	const matches = useMatches();

	let title = "Default Title";

	for (let i = matches.length - 1; i >= 0; i--) {
		const meta = matches[i].meta;
		if (meta) {
			const titleEntry = meta.find(
				(m: any) => typeof m.title === "string"
			);
			if (titleEntry && typeof titleEntry.title === "string") {
				title = titleEntry.title;
				break;
			}
		}
	}

	return (
		<header className="h-16 flex-shrink-0 border-b px-4 flex items-center">
			<h1 className="font-black text-xl">{title}</h1>
		</header>
	);
}
