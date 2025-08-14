// components/Logo.tsx
export default function Logo() {
  return (
    <a href="#" className="group flex items-center gap-2" aria-label="Inicio">
      <span className="inline-grid h-8 w-8 place-content-center rounded-xl bg-brand-600 text-white transition group-hover:scale-105">
        ◈
      </span>
      <span className="text-lg font-semibold tracking-tight">
        NodoBot <span className="text-brand-600 dark:text-brand-400">Studio</span>
      </span>
    </a>
  );
}
