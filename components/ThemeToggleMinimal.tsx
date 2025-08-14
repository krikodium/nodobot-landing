"use client";

import { useEffect, useState, useRef } from "react";

export default function ThemeToggleMinimal({
  duration = 700, // ms
}: { duration?: number }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [anim, setAnim] = useState<"idle"|"toDark"|"toLight">("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const toggle = () => {
    if (anim !== "idle") return;
    const to = isDark ? "toLight" : "toDark";
    setAnim(to);

    // Cambiamos el tema a mitad de animación
    const tMid = window.setTimeout(() => {
      const next = !isDark;
      const root = document.documentElement;
      next ? root.classList.add("dark") : root.classList.remove("dark");
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      setIsDark(next);
    }, duration * 0.5);
    timers.current.push(tMid);

    // Terminamos anim
    const tEnd = window.setTimeout(() => setAnim("idle"), duration);
    timers.current.push(tEnd);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
      title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
      className="
        relative inline-grid h-10 w-10 place-content-center
        rounded-full border bg-white/80 backdrop-blur
        border-slate-200 shadow-soft
        dark:bg-[#0f152a]/90 dark:border-slate-700
        active:scale-[.98] transition
        overflow-hidden
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Contenedor de íconos */}
      <span className="relative h-6 w-6">
        {/* Sol */}
        <span
          className={`
            icon absolute inset-0 grid place-content-center
            ${isDark ? "opacity-0" : "opacity-100"}
            ${anim === "toDark" ? "out-arc" : ""}
            ${anim === "toLight" ? "in-arc"  : ""}
          `}
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden
        >
          <span className="emoji">☀️</span>
        </span>

        {/* Luna */}
        <span
          className={`
            icon absolute inset-0 grid place-content-center
            ${isDark ? "opacity-100" : "opacity-0"}
            ${anim === "toDark" ? "in-arc"  : ""}
            ${anim === "toLight" ? "out-arc" : ""}
          `}
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden
        >
          <span className="emoji">🌙</span>
        </span>
      </span>

      {/* estilos */}
      <style jsx>{`
        .icon { transition: opacity ${duration}ms ease; }
        .emoji {
          font-size: 18px;
          line-height: 1;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,.15));
        }

        /* Animación en arco (simple y limpia) */
        @keyframes arc-out {
          0%   { transform: translate(0,0) scale(1);    opacity: 1;   filter: blur(0px); }
          35%  { transform: translate(8px,-6px) scale(1.05); opacity: .95; }
          50%  { transform: translate(0,-12px) scale(.98);   opacity: .7;  filter: blur(.2px); }
          65%  { transform: translate(-8px,-6px) scale(.96); opacity: .45; }
          100% { transform: translate(0,0) scale(1);         opacity: 0;   filter: blur(.4px); }
        }
        @keyframes arc-in {
          0%   { transform: translate(0,0) scale(1);         opacity: 0;   filter: blur(.4px); }
          35%  { transform: translate(-8px,-6px) scale(.96); opacity: .45; }
          50%  { transform: translate(0,-12px) scale(.98);   opacity: .7;  filter: blur(.2px); }
          65%  { transform: translate(8px,-6px) scale(1.05); opacity: .95; }
          100% { transform: translate(0,0) scale(1);         opacity: 1;   filter: blur(0px); }
        }

        .out-arc { animation: arc-out ease both; }
        .in-arc  { animation: arc-in  ease both; }

        /* Modo accesible: sin animaciones si el usuario prefiere reducir movimiento */
        @media (prefers-reduced-motion: reduce) {
          .out-arc, .in-arc { animation: none !important; }
          .icon { transition: none !important; }
        }
      `}</style>
    </button>
  );
}
