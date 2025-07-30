import { useTheme } from "@/shared/hooks/theme-hook";
import { themeStore } from "@/store/theme";

export function ThemeToggle() {
  const theme = useTheme();

  const toggleTheme = () => {
    themeStore.setState(theme === "light" ? "dark" : "light");
  };

  return <button onClick={toggleTheme}>{`Current theme: ${theme}`}</button>;
}
