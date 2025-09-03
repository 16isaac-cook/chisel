import { ThemedRemixIcon } from "@components/themed-remixicon";
import { createFileRoute } from "@tanstack/react-router";
import { type SVGProps } from "react";

//custom version of VenetianMask from Lucide icons for dark mode. https://lucide.dev/icons/venetian-mask
export function VenetianMaskCutout(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="1em"
            height="1em"
            {...props}
        >
            <defs>
                <mask
                    id="venetian-mask-mask"
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={24}
                    height={24}
                >
                    <rect width={24} height={24} fill="white" />
                    <path
                        d="M18 11c-1.5 0-2.5.5-3 2"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 11c1.5 0 2.5.5 3 2"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </mask>
            </defs>

            <path
                d="M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z"
                fill="currentColor"
                mask="url(#venetian-mask-mask)"
            />
        </svg>
    );
}

export const Route = createFileRoute("/mask")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Mask",
                icon: (
                    <ThemedRemixIcon
                        icon="VenetianMask"
                        library="lucide"
                        dark={<VenetianMaskCutout />}
                    />
                ),
            },
        ],
    }),
});

function RouteComponent() {
    return <div>Mask will be a tool for character creation</div>;
}
