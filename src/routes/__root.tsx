/// <reference types="vite/client" />
import { useEffect, type ReactNode } from "react";
import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import appCss from "@/shared/styles/globals.css?url";
import { loadSettings } from "@/stores/settings-store";
import { ThemeProvider } from "@/shared/context/theme-context";
import Layout from "@/shared/components/layout";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	useEffect(() => {
		loadSettings();
	}, []);

	return (
		<RootDocument>
			<ThemeProvider>
				<Layout>
					<Outlet />
				</Layout>
			</ThemeProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
