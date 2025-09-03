import { Providers } from "@context/providers/providers";
import Layout from "@components/layout";
import { Outlet } from "@tanstack/react-router";

export function ClientApp() {
    return (
        <Providers>
            <Layout>
                <Outlet />
            </Layout>
        </Providers>
    );
}
