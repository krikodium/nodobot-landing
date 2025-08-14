// components/Testimonios.tsx
type T = { name: string; role: string; quote: string };

const items: T[] = [
  {
    name: "Carolina S.",
    role: "CX Lead, Retail",
    quote:
      "Pasamos de respuestas manuales a un agente que resuelve el 60% sin intervención. El equipo ahora se enfoca en casos de alto valor.",
  },
  {
    name: "Matías P.",
    role: "Ops Manager, Logística",
    quote:
      "Los flujos en n8n quedaron versionados y con métricas claras. Mucho más fácil auditar y mejorar.",
  },
  {
    name: "Lucía R.",
    role: "Head of Growth, EdTech",
    quote:
      "El onboarding conversacional nos bajó fricción y subió conversión. Las pruebas A/B de prompts fueron clave.",
  },
];

export default function Testimonios() {
  return (
    <section className="container-lg py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Testimonios</h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="card">
            <blockquote className="text-slate-700 dark:text-slate-200">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">{t.name}</span> — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
