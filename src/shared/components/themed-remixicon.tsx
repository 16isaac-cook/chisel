import * as RemixIcons from "@remixicon/react";
import * as LucideIcons from "lucide-react";
import type { IconLibrary, RemixIconBaseName } from "@lib/types";
import { cn } from "@lib/utils";
import React from "react";

type ThemedRemixIconProps = {
    icon: RemixIconBaseName | keyof typeof LucideIcons;
    className?: string;
    library?: IconLibrary;
    fill?: boolean;
    dark?: React.ReactNode;
    light?: React.ReactNode;
    size?: number;
};

export function IconSwapWrapper({
    className,
    children,
    size,
}: {
    className: string;
    children: React.ReactNode;
    size: number;
}) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                `size-${size}`,
                "relative inline-flex shrink-0 items-center justify-center",
                className,
            )}
        >
            {children}
        </span>
    );
}

export function ThemedRemixIcon({
    icon,
    className = "",
    library = "remix",
    fill = true,
    dark,
    light,
    size = 4,
}: ThemedRemixIconProps) {
    const lightClasses = cn(
        "absolute transition-all dark:opacity-0 dark:scale-0 dark:-rotate-90 size-full!",
    );
    const darkClasses = cn(
        "absolute opacity-0 scale-0 rotate-90 transition-all dark:opacity-100 dark:scale-100 dark:rotate-0 size-full!",
        library === "lucide" ? (fill ? "fill-current" : "fill-none") : "",
    );

    const LineIcon = (RemixIcons as any)[`Ri${icon}Line`];
    const FillIcon = (RemixIcons as any)[`Ri${icon}Fill`];

    if (library === "remix" && (!LineIcon || !FillIcon)) {
        console.warn(`Could not find RemixIcon for ${icon}`);
        return null;
    }

    let lightIcon = <LineIcon aria-hidden="true" className={lightClasses} />;
    let darkIcon = <FillIcon aria-hidden="true" className={darkClasses} />;

    if (library === "lucide") {
        const LucideIcon = (LucideIcons as any)[icon];
        if (!LucideIcon) {
            console.warn(`Could not find Lucide icon: ${icon}`);
            return null;
        }

        lightIcon = <LucideIcon className={lightClasses} />;
        darkIcon = <LucideIcon className={darkClasses} />;
    }

    if (light) {
        if (React.isValidElement(light)) {
            lightIcon = React.cloneElement(light as React.ReactElement<any>, {
                className: cn((light.props as any)?.className, lightClasses),
            });
        }
    }

    if (dark) {
        if (React.isValidElement(dark)) {
            darkIcon = React.cloneElement(dark as React.ReactElement<any>, {
                className: cn((dark.props as any)?.className, darkClasses),
            });
        }
    }

    return (
        <IconSwapWrapper className={cn("icon-wrapper", className)} size={size}>
            {lightIcon}
            {darkIcon}
        </IconSwapWrapper>
    );
}
