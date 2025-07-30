import { useTheme } from "@/shared/hooks/theme-hook";
import { themeStore } from "@/store/theme";
import { Button } from "./button";

export function ThemeToggle() {
  const theme = useTheme();

  const toggleTheme = () => {
    themeStore.setState(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} variant="primary">
      {theme}
    </Button>
  );
}
