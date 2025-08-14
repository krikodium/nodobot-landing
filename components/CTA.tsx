// components/CTA.tsx
export default function CTA() {
  return (
    <section className="container-lg py-16">
      <div className="card items-center justify-between gap-4 text-center md:flex md:text-left">
        <div>
          <h3 className="text-2xl font-bold">¿Listo para probar un agente en tu negocio?</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Programemos un workshop y salí con un blueprint de alto impacto.
          </p>
        </div>
        <a href="#contact" className="btn btn-primary">Agendar workshop</a>
      </div>
    </section>
  );
}
