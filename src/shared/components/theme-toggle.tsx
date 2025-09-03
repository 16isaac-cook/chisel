import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useSettingsStore } from "@context/settings-context";
import { cn } from "@lib/utils";
import {
    RiComputerFill,
    RiComputerLine,
    RiMoonFill,
    RiSunLine,
} from "@remixicon/react";
import { useEffect } from "react";

const THEME_KEYBOARD_SHORTCUT = "t";

export function ThemeToggle() {
    const { settings, setTheme } = useSettingsStore();
    const theme = settings.theme;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === THEME_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                if (theme === "light") {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <RiSunLine
                        className={cn(
                            "absolute scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
                            theme === "system" && "scale-0! -rotate-90",
                        )}
                    />
                    <RiMoonFill
                        className={cn(
                            "absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
                            theme === "system" && "scale-0! -rotate-90",
                        )}
                    />
                    <RiComputerLine
                        className={cn(
                            "absolute scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
                            theme !== "system" && "scale-0! -rotate-90",
                        )}
                    />
                    <RiComputerFill
                        className={cn(
                            "absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
                            theme !== "system" && "scale-0! -rotate-90",
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
