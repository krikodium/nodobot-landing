// components/Pricing.tsx
type Tier = { name: string; price: string; blurb: string; features: string[]; cta: string };

const tiers: Tier[] = [
  {
    name: "Kickoff",
    price: "USD 0",
    blurb: "Descubrí el potencial con un blueprint inicial.",
    features: ["Workshop de discovery", "Mapa de casos de uso", "KPIs y roadmap"],
    cta: "Agendar",
  },
  {
    name: "MVP",
    price: "Desde USD 1.500",
    blurb: "Un caso de uso en producción en semanas.",
    features: ["1 agente en n8n", "1 canal (p. ej. WhatsApp)", "Métricas básicas y QA"],
    cta: "Consultar",
  },
  {
    name: "Scale",
    price: "Custom",
    blurb: "Multi-canal, observabilidad avanzada y mejoras continuas.",
    features: ["Ruteo por confianza", "A/B de prompts", "SLA y soporte prioritario"],
    cta: "Hablemos",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Planes</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Elegí el punto de partida.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="card flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{t.blurb}</p>
              <p className="mt-3 text-3xl font-black">{t.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {t.features.map((f) => <li key={f}>• {f}</li>)}
              </ul>
            </div>
            <a href="#contact" className="btn btn-primary mt-6">{t.cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
