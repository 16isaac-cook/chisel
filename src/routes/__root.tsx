/// <reference types="vite/client" />
import { useEffect, type ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import "../shared/styles/globals.css";
import { initPersistence } from "@/init/persistent-stores";
import { useThemeClass } from "@/shared/hooks/theme-hook";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

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
  }),
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    initPersistence();
  }, []);

  useThemeClass();
  return (
    <RootDocument>
      <ThemeToggle />
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
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
