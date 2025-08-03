import * as RemixIcons from "@remixicon/react";
import { RemixIconBaseName } from "../types/types";
import { cn } from "../lib/utils";

type ThemedRemixIconProps = {
	icon: RemixIconBaseName;
	className?: string;
};

export function IconSwapWrapper({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return (
		<span
			aria-hidden="true"
			className={cn("relative inline-block size-5 shrink-0", className)}
		>
			{children}
		</span>
	);
}

export function ThemedRemixIcon({
	icon,
	className = "",
}: ThemedRemixIconProps) {
	const LineIcon = (RemixIcons as any)[`Ri${icon}Line`];
	const FillIcon = (RemixIcons as any)[`Ri${icon}Fill`];

	if (!LineIcon || !FillIcon) {
		console.warn(`Could not find RemixIcon for ${icon}`);
		return null;
	}

	return (
		<IconSwapWrapper className={className}>
			<LineIcon
				aria-hidden="true"
				className="absolute transition-all dark:opacity-0 dark:scale-0 dark:-rotate-90 size-full!"
			/>
			<FillIcon
				aria-hidden="true"
				className="absolute opacity-0 scale-0 rotate-90 transition-all dark:opacity-100 dark:scale-100 dark:rotate-0 size-full!"
			/>
		</IconSwapWrapper>
	);
}
