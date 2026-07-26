import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, THEME } from "../constants/appConstants";
import { getItem, setItem } from "../utils/storage";

export const ThemeContext = createContext(null);

const resolveInitialTheme = () => {
  const stored = getItem(STORAGE_KEYS.THEME);
  if (stored === THEME.LIGHT || stored === THEME.DARK) return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? THEME.DARK : THEME.LIGHT;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === THEME.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === THEME.DARK }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
