// components/Particles.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 0.0 a 1.0 — densidad relativa (0.6 por defecto) */
  density?: number;
  /** 0.2 a 2.0 — velocidad base (0.7 por defecto) */
  speed?: number;
  /** opacidad global del canvas (0.65 por defecto) */
  opacity?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
  maxLife: number;
};

export default function Particles({
  density = 0.6,
  speed = 0.7,
  opacity = 0.65,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, scale: 1 });

  // Helpers
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const sign = () => (Math.random() > 0.5 ? 1 : -1);

  const resize = () => {
    const c = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h, scale: dpr };
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;

    // Recalcular cantidad de partículas según densidad y área
    const count = Math.floor((w * h) / 9000 * density); // ajustable
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(spawn(w, h, dpr));
    }
    particlesRef.current = arr;
  };

  const spawn = (w: number, h: number, dpr: number): Particle => {
    // gama azul-violeta: 220–270
    const hue = rand(220, 270);
    return {
      x: rand(0, w) * dpr,
      y: rand(0, h) * dpr,
      vx: rand(0.08, 0.22) * speed * sign(),
      vy: rand(0.08, 0.22) * speed * sign(),
      r: rand(0.6, 1.8) * dpr,
      hue,
      life: 0,
      maxLife: rand(4, 10), // segundos aprox
    };
  };

  const tick = (t: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const { w, h, scale } = sizeRef.current;

    // fondo transparente, dejamos “rastro” leve con alfa para un glow suave
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "#000"; // no visible: solo limpia con alfa
    ctx.fillRect(0, 0, c.width, c.height);

    // dibujar partículas con mezcla tipo luz
    ctx.globalCompositeOperation = "lighter"; // suma colores (efecto chispa)
    const arr = particlesRef.current;

    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];

      // movimiento
      p.x += p.vx * scale;
      p.y += p.vy * scale;
      p.life += 1 / 60;

      // rebote suave en bordes
      if (p.x < 0 || p.x > c.width) p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;

      // ligero parpadeo y variación de radio
      const flicker = 0.85 + Math.sin((t * 0.001 + i) * 1.7) * 0.15;
      const r = Math.max(0.5, p.r * flicker);

      // degradé sutil por vida
      const lifeRatio = p.life / p.maxLife; // 0 → 1
      const alpha = 0.25 + Math.sin(lifeRatio * Math.PI) * 0.55;

      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 8);
      // tonos: centro más brillante, borde azulado
      grad.addColorStop(0, `hsla(${p.hue}, 95%, 75%, ${alpha})`);
      grad.addColorStop(1, `hsla(${p.hue}, 90%, 55%, 0)`);
      ctx.fillStyle = grad;
      ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, ${alpha * 0.9})`;
      ctx.shadowBlur = r * 6;
      ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      // respawn cuando “cumple su vida” para variación permanente
      if (p.life > p.maxLife) {
        arr[i] = spawn(w, h, scale);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="
        fixed inset-0 -z-10 pointer-events-none
        opacity-70 dark:opacity-60
        blur-[2px] sm:blur-[3px]
        mix-blend-screen dark:mix-blend-screen
      "
      style={{
        // “vidrio opaco”: bajamos saturación y contraste sutilmente
        filter: "saturate(1.05) contrast(1.05)",
        // para controlar opacidad global adicional si querés
        opacity,
      }}
    />
  );
}
