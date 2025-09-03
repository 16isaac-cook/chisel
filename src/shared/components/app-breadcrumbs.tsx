import { Link, useMatches } from "@tanstack/react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

export function AppBreadcrumbs() {
    const matches = useMatches();

    const crumbs = matches
        .map((match) => {
            const meta = match.meta ?? [];
            const titleEntry = meta.find(
                (m: any) => typeof m.title === "string",
            );
            if (titleEntry && typeof titleEntry.title === "string") {
                return {
                    title: titleEntry.title,
                    path: match.pathname,
                };
            }
            return null;
        })
        .filter(Boolean) as { title: string; path: string }[];

    if (crumbs.length === 0) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        <React.Fragment key={crumb.path}>
                            <BreadcrumbItem>
                                {!isLast ? (
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.path}>
                                            {crumb.title}
                                        </Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <span
                                        aria-current="page"
                                        className="font-semibold"
                                    >
                                        {crumb.title}
                                    </span>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
