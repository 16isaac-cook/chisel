import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID, optionally including a slugified name for readability
 * @param name Optional name to include in the ID
 * @returns A unique ID like "fantasy-realm-lp3x8k9abc" or just "lp3x8k9abc" if no name
 */
export function generateId(name?: string): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 9);
    const uniquePart = `${timestamp}${randomStr}`;

    if (name) {
        const slug = slugify(name);
        // Limit slug length to keep IDs reasonable
        const truncatedSlug = slug.substring(0, 40);
        return `${truncatedSlug}-${uniquePart}`;
    }

    return uniquePart;
}

/**
 * Gets the current ISO timestamp
 */
export function getCurrentTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Creates a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
