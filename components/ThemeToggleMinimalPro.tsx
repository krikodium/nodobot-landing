"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Duración total de la animación (ms) */
  duration?: number;
  /** Tamaño del botón (px) - se usa para alto/ancho y escalas internas */
  size?: number;
  /** Callback cuando efectivamente cambió el tema (a mitad de animación) */
  onChange?: (isDark: boolean) => void;
};

export default function ThemeToggleMinimalPro({
  duration = 920,
  size = 44,
  onChange,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [anim, setAnim] = useState<"idle" | "toDark" | "toLight">("idle");
  const timers = useRef<number[]>([]);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const commitTheme = (next: boolean) => {
    const root = document.documentElement;
    next ? root.classList.add("dark") : root.classList.remove("dark");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
    onChange?.(next);
  };

  const vibrate = (pattern: number | number[]) => {
    if (prefersReduced) return;
    if ("vibrate" in navigator) {
      try {
        // @ts-ignore
        navigator.vibrate(pattern);
      } catch {}
    }
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const startAnim = (toDark: boolean) => {
    if (anim !== "idle") return;
    setAnim(toDark ? "toDark" : "toLight");

    // haptic sutil al iniciar
    vibrate(8);

    if (prefersReduced) {
      // sin animación: cambiar de inmediato
      commitTheme(toDark);
      setAnim("idle");
      return;
    }

    // cambiar tema a mitad exacta (sensación de "pasa por detrás")
    schedule(() => {
      commitTheme(toDark);
      // haptic sutil al “encastrar”
      vibrate([0, 10]);
    }, duration * 0.5);

    // terminar anim
    schedule(() => setAnim("idle"), duration);
  };

  const onClick = () => startAnim(!isDark);

  // teclado accesible (Enter/Space)
  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      startAnim(!isDark);
    }
  };

  if (!mounted) return null;

  // Vars para estilos
  const ring = isDark ? "focus:ring-brand-400/40" : "focus:ring-brand-500/30";
  const sz = `${size}px`;
  const iconBox = Math.round(size * 0.6);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={anim !== "idle"}
      className={`
        relative inline-grid place-content-center select-none
        rounded-full border backdrop-blur transition
        border-slate-200 bg-white/85 shadow-soft
        dark:border-slate-700 dark:bg-[#0f152a]/90
        outline-none focus-visible:ring-2 ${ring}
        active:scale-[.985] disabled:cursor-not-allowed
      `}
      style={{
        width: sz,
        height: sz,
        WebkitTapHighlightColor: "transparent",
        transitionDuration: "180ms",
      }}
      data-state={isDark ? "dark" : "light"}
      data-anim={anim}
    >
      {/* Micro-shine minimalista */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
      >
        <span
          className="absolute -inset-1 opacity-[.06] dark:opacity-[.04]"
          style={{
            background:
              "linear-gradient(135deg, #fff 10%, rgba(255,255,255,0) 40%)",
            transform: "translateY(-2px)",
          }}
        />
      </span>

      {/* Contenedor de iconos */}
      <span
        className="relative grid place-content-center"
        style={{ width: iconBox, height: iconBox }}
      >
        {/* Sol (visible en claro / entra al pasar a claro) */}
        <span
          className={`
            icon absolute inset-0 grid place-content-center
            ${isDark ? "opacity-0" : "opacity-100"}
            ${anim === "toDark" ? "out-arc" : ""}
            ${anim === "toLight" ? "in-arc" : ""}
          `}
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden
        >
          <span className="emoji">☀️</span>
        </span>

        {/* Luna (visible en oscuro / entra al pasar a oscuro) */}
        <span
          className={`
            icon absolute inset-0 grid place-content-center
            ${isDark ? "opacity-100" : "opacity-0"}
            ${anim === "toDark" ? "in-arc" : ""}
            ${anim === "toLight" ? "out-arc" : ""}
          `}
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden
        >
          <span className="emoji">🌙</span>
        </span>
      </span>

      {/* CSS-in-JS para la anim mejorada */}
      <style jsx>{`
        .icon {
          transition: opacity ${duration}ms ease;
        }
        .emoji {
          font-size: ${Math.round(iconBox * 0.8)}px;
          line-height: 1;
          filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.15));
          transform-origin: 50% 50%;
        }

        /* Arco más profesional: curva más amplia y ligera rotación */
        @keyframes arc-out {
          0%   { transform: translate(0,0) rotate(0deg) scale(1);    opacity: 1;   filter: blur(0px); }
          30%  { transform: translate(9px,-7px) rotate(12deg) scale(1.06); opacity: .97; }
          50%  { transform: translate(0,-13px) rotate(0deg)  scale(.98);   opacity: .70; filter: blur(.2px); }
          70%  { transform: translate(-9px,-7px) rotate(-10deg) scale(.96); opacity: .40; }
          100% { transform: translate(0,0) rotate(0deg)  scale(1);         opacity: 0;   filter: blur(.35px); }
        }
        @keyframes arc-in {
          0%   { transform: translate(0,0) rotate(0deg)  scale(1);         opacity: 0;   filter: blur(.35px); }
          30%  { transform: translate(-9px,-7px) rotate(-10deg) scale(.96); opacity: .40; }
          50%  { transform: translate(0,-13px)  rotate(0deg)  scale(.98);   opacity: .70; filter: blur(.2px); }
          70%  { transform: translate(9px,-7px) rotate(12deg)  scale(1.06); opacity: .97; }
          100% { transform: translate(0,0)  rotate(0deg)  scale(1);         opacity: 1;   filter: blur(0px); }
        }

        .out-arc { animation: arc-out cubic-bezier(.22,.68,.17,1) both; }
        .in-arc  { animation: arc-in  cubic-bezier(.22,.68,.17,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .out-arc, .in-arc { animation: none !important; }
          .icon { transition: none !important; }
        }
      `}</style>
    </button>
  );
}
