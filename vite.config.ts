// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
    clearScreen: false,
    server: {
        port: 3000,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                  protocol: "ws",
                  host,
                  port: 1421,
              }
            : undefined,

        watch: {
            ignored: ["**/src-tauri/**"],
        },
    },
    envPrefix: ["VITE_", "TAURI_ENV_*"],
    build: {
        target:
            process.env.TAURI_ENV_PLATFORM == "windows"
                ? "chrome105"
                : "safari13",
        minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_ENV_DEBUG,
    },
    plugins: [
        tsConfigPaths(),
        tanstackStart({ customViteReactPlugin: true }),
        viteReact(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@routes": "/src/routes",
            "@context": "/src/shared/context",
            "@components": "/src/shared/components",
            "@hooks": "/src/shared/hooks",
            "@store": "/src/store",
            "@lib": "/src/shared/lib",
            "@styles": "/src/shared/styles",
            "@assets": "/src/shared/assets",
            "@pages": "/src/pages",
        },
    },
});
