import { useEffect, useState } from "react";
import { ThemeProvider } from "@/shared/context/theme-context";
import Layout from "@/shared/components/layout";
import { Outlet } from "@tanstack/react-router";
import { loadSettings } from "@/stores/settings-store";

export function ClientApp() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadSettings()
			.then(() => setLoaded(true))
			.catch((e) => {
				console.error("Failed to load settings", e);
				setLoaded(true); // avoid blocking UI on error
			});
	}, []);

	if (!loaded) return null; // or a spinner/loading UI

	return (
		<ThemeProvider>
			<Layout>
				<Outlet />
			</Layout>
		</ThemeProvider>
	);
}
