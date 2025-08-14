// components/Header.tsx
"use client";

import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import ThemeToggleMinimal from "./ThemeToggleMinimal";
import ThemeToggleMinimalPro from "./ThemeToggleMinimalPro";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-[#0b1020]/70 dark:border-slate-800">
      <div className="container-lg flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-slate-700 dark:text-slate-300 md:flex">
          <a href="#services" className="hover:text-slate-900 dark:hover:text-white">Servicios</a>
          <a href="#process" className="hover:text-slate-900 dark:hover:text-white">Proceso</a>
          <a href="#stack" className="hover:text-slate-900 dark:hover:text-white">Stack</a>
          <a href="#cases" className="hover:text-slate-900 dark:hover:text-white">Casos</a>
          <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white">Planes</a>
          <a href="#faq" className="hover:text-slate-900 dark:hover:text-white">FAQ</a>
          <a href="#contact" className="btn btn-primary text-sm">Agenda una demo</a>
          <ThemeToggleMinimalPro />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggleMinimalPro />
          <button
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="btn btn-ghost"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur dark:bg-[#0b1020]/80 dark:border-slate-800">
          <div className="container-lg grid gap-3 py-4 text-sm">
            <a onClick={() => setOpen(false)} href="#services">Servicios</a>
            <a onClick={() => setOpen(false)} href="#process">Proceso</a>
            <a onClick={() => setOpen(false)} href="#stack">Stack</a>
            <a onClick={() => setOpen(false)} href="#cases">Casos</a>
            <a onClick={() => setOpen(false)} href="#pricing">Planes</a>
            <a onClick={() => setOpen(false)} href="#faq">FAQ</a>
            <a onClick={() => setOpen(false)} href="#contact" className="btn btn-primary">Agenda una demo</a>
          </div>
        </div>
      )}
    </header>
  );
}
