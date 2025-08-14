"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    next ? root.classList.add("dark") : root.classList.remove("dark");
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="btn btn-ghost text-sm"
      title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
    >
      {isDark ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
  );
}