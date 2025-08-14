"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 0.2–1.2: densidad relativa de partículas (default 0.7) */
  density?: number;
  /** 0.4–1.6: velocidad base (default 0.9) */
  speed?: number;
  /** 0–1: opacidad global de las partículas (default 0.7) */
  opacity?: number;
  /** Cantidad base por megapixel aprox. (default 22) */
  basePerMP?: number;
};

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

const PALETTE = ["#6C63FF", "#5A4BDB", "#7B2CBF", "#9D4EDD"]; // azules/violetas estables

export default function ParticlesGlass({
  density = 0.7,
  speed = 0.9,
  opacity = 0.7,
  basePerMP = 22,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particles = useRef<P[]>([]);
  const scaleRef = useRef(1);

  // helpers
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const sign = () => (Math.random() < 0.5 ? -1 : 1);

  const spawnParticle = (w: number, h: number, dpr: number): P => {
    return {
      x: rand(0, w) * dpr,
      y: rand(0, h) * dpr,
      vx: rand(0.08, 0.22) * speed * sign(),
      vy: rand(0.08, 0.22) * speed * sign(),
      r: rand(0.8, 1.8) * dpr, // radio base
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
    };
    // Nota: sin animación de color → color estable
  };

  const resize = () => {
    const c = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    scaleRef.current = dpr;

    const w = window.innerWidth;
    const h = window.innerHeight;

    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;

    // número de partículas por área (aprox. por megapixel)
    const megaPixels = (w * h) / 1_000_000;
    const count = Math.max(24, Math.floor(basePerMP * megaPixels * density));

    const arr: P[] = [];
    for (let i = 0; i < count; i++) arr.push(spawnParticle(w, h, dpr));
    particles.current = arr;
  };

  const step = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const arr = particles.current;

    // limpiar sin “latido”: solo clear + fondo transparente (el brillo es un <div> debajo)
    ctx.clearRect(0, 0, c.width, c.height);

    // canvas como luz: screen y blur leve
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = opacity;

    // dibujar/mover
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];

      // movimiento
      p.x += p.vx;
      p.y += p.vy;

      // rebote con bordes
      if (p.x < 0 || p.x > c.width) p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;
    }

    // colisiones O(n^2) controladas (cantidades moderadas)
    for (let i = 0; i < arr.length; i++) {
      const a = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
        const b = arr[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        const minDist = (a.r + b.r) * 3; // “aura” de choque (un poco mayor que el radio visible)
        if (d2 < minDist * minDist) {
          // choque simple elástico: intercambio de velocidades con leve aleatoriedad
          const tvx = a.vx;
          const tvy = a.vy;
          a.vx = b.vx + rand(-0.02, 0.02);
          a.vy = b.vy + rand(-0.02, 0.02);
          b.vx = tvx + rand(-0.02, 0.02);
          b.vy = tvy + rand(-0.02, 0.02);
        }
      }
    }

    // dibujar (círculo + glow radial suave)
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const rGlow = p.r * 8;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rGlow);
      grad.addColorStop(0, p.color + "CC"); // ~80% alpha
      grad.addColorStop(1, p.color + "00"); // 0%
      ctx.fillStyle = grad;

      ctx.shadowColor = p.color + "B3"; // ~70% alpha
      ctx.shadowBlur = p.r * 6;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, speed, opacity, basePerMP]);

  return (
    <>
      {/* Capa de brillo fijo, NO animada (vidrio opaco sutil) */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(88,110,255,0.16), rgba(0,0,0,0) 70%), radial-gradient(35% 25% at 80% 20%, rgba(150,90,255,0.12), rgba(0,0,0,0) 70%)",
          filter: "blur(18px) saturate(1.05) contrast(1.05)",
        }}
      />
      {/* Partículas (solo movimiento/luz, color estable) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none mix-blend-screen"
        style={{
          // efecto “detrás de vidrio”: ligero blur y opacidad fija
          filter: "blur(2px)",
        }}
      />
    </>
  );
}
