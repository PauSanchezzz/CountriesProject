"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const themeIcon =
    resolvedTheme === "dark"
      ? "/icons/night-mode.svg"
      : "/icons/light-mode.svg";
  const themeText = resolvedTheme === "dark" ? "Light Mode" : "Dark Mode";

  if (!isMounted) return null;

  return (
    <nav className="navbar">
      <p className="title">Where in the world?</p>
      <div className="theme-toggle" onClick={toggleTheme}>
        <button className="theme-button">
          <img
            className="icon"
            src={themeIcon}
            alt={`icon ${themeText.toLowerCase()}`}
          />
          <span className="theme-text">{themeText}</span>
        </button>
      </div>
    </nav>
  );
}
