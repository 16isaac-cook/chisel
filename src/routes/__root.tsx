/// <reference types="vite/client" />
import { useEffect, type ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import "@/shared/styles/globals.css";
import { initPersistence } from "@/init/persistent-stores";
import { useThemeClass } from "@/shared/hooks/theme-hook";
import { SidebarProvider } from "@/shared/context/sidebar-context";

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
    styles: [
      {
        children: `
          #loading-screen {
            position: fixed;
            inset: 0;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
        `,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    initPersistence();

    const loadingScreen = document.getElementById("loading-screen");
    if (!loadingScreen) return;

    const cssLinks = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="stylesheet"]'
    );
    const cssLink = Array.from(cssLinks).find((link) =>
      link.href.includes("globals.css")
    );

    if (cssLink) {
      if ((cssLink as HTMLLinkElement).sheet) {
        hideLoading();
      } else {
        cssLink.addEventListener("load", hideLoading);
      }
    } else {
      hideLoading();
    }

    function hideLoading() {
      if (!loadingScreen) return;
      loadingScreen.remove();
    }

    return () => {
      cssLink?.removeEventListener("load", hideLoading);
    };
  }, []);

  useThemeClass();

  return (
    <RootDocument>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
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
        <div id="loading-screen"></div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
