"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return getSystemTheme();
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(theme);

    const onSystemThemeChange = (event: MediaQueryListEvent) => {
      const currentSavedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (currentSavedTheme) return;
      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
    };

    media.addEventListener("change", onSystemThemeChange);

    return () => {
      media.removeEventListener("change", onSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="pointer-events-auto h-10 w-10 min-h-10 border-0 p-0 hover:bg-transparent focus-visible:ring-0"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-testid="theme-toggle"
    >
      <span className="relative block h-5 w-5">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`absolute inset-0 h-5 w-5 fill-none stroke-[var(--color-fg)] transition-opacity duration-200 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" />
          <circle cx="12" cy="12" r="4.1" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`absolute inset-0 h-5 w-5 fill-none stroke-[var(--color-fg)] transition-opacity duration-200 ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.7A9 9 0 1 1 11.3 3a7.3 7.3 0 0 0 9.7 9.7Z" />
        </svg>
      </span>
    </Button>
  );
};

export default ThemeToggle;
