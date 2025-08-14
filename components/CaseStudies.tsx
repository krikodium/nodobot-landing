// components/CaseStudies.tsx
type Case = {
  title: string;
  tag: string;
  impact: string[];
  summary: string;
};

const cases: Case[] = [
  {
    title: "Atención 24/7 en WhatsApp",
    tag: "Retail",
    impact: ["CSAT +22%", "Tiempo de respuesta −46%", "Deflection +31%"],
    summary:
      "Catálogo integrado y estado de pedido en tiempo real. Handoff a humano con contexto.",
  },
  {
    title: "Onboarding guiado con validaciones",
    tag: "Fintech",
    impact: ["Alta de clientes −43%", "Errores de carga −55%", "NPS +18"],
    summary:
      "KYC conversacional, verificación de identidad y checklist automático en n8n.",
  },
  {
    title: "Mesa de ayuda interna",
    tag: "SaaS",
    impact: ["Ahorro 180 hs/mes", "Resolución L1 +64%", "Backlog −28%"],
    summary:
      "FAQ inteligente y creación de tickets con trazabilidad de prompts y decisiones.",
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Casos</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Impacto real en distintos verticales.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <article key={c.title} className="card flex flex-col">
            <span className="w-fit rounded-full border px-2 py-0.5 text-xs dark:border-slate-700">{c.tag}</span>
            <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.summary}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {c.impact.map((i) => <li key={i}>• {i}</li>)}
            </ul>
            <div className="mt-4">
              <a href="#contact" className="text-brand-700 hover:underline dark:text-brand-400">
                Quiero lograr algo así →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
