import * as RemixIcons from "@remixicon/react";

type RemixIconKey = keyof typeof RemixIcons;

type LineOrFill = "Line" | "Fill";

type ExtractBaseName<T extends string> =
	T extends `Ri${infer Name}${LineOrFill}` ? Name : never;

export type RemixIconBaseName = ExtractBaseName<RemixIconKey>;
