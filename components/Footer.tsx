// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t py-10 dark:border-slate-800">
      <div className="container-lg grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">NodoBot Studio</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Arquitectura, diseño e implementación de bots y agentes.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Mapa</p>
          <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
            <li><a href="#services">Servicios</a></li>
            <li><a href="#process">Proceso</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#cases">Casos</a></li>
            <li><a href="#pricing">Planes</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium">Legal</p>
          <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Términos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="container-lg mt-8 text-xs text-slate-500">
        © {new Date().getFullYear()} NodoBot Studio. Todos los derechos reservados.
      </div>
    </footer>
  );
}
