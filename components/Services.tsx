// components/Services.tsx
type Svc = { title: string; desc: string; bullets: string[] };

const services: Svc[] = [
  {
    title: "Discovery & Blueprint",
    desc: "Alineamos objetivos, alcance y riesgos. Definimos capacidades del agente y KPIs.",
    bullets: ["Mapa de procesos y datos", "Hitos y SLA", "Guardrails y compliance"],
  },
  {
    title: "Diseño conversacional",
    desc: "Personalidad, intents, manejo de errores y handoff humano.",
    bullets: ["Prompt system + styleguide", "Fallbacks y desambiguación", "Tono y brand safety"],
  },
  {
    title: "Arquitectura de agentes",
    desc: "Razonamiento, herramientas, memoria y orquestación.",
    bullets: ["Tooling seguro", "Memoria a medida", "Rutas por confianza"],
  },
  {
    title: "Integraciones",
    desc: "Conectamos canales y sistemas de negocio.",
    bullets: ["WhatsApp/Twilio, Web, Slack", "CRMs, ERPs, e-commerce", "Webhooks y APIs"],
  },
  {
    title: "Implementación & QA",
    desc: "Ambientes, versionado y pruebas.",
    bullets: ["Tests de flujos", "Non-regression de prompts", "Playbooks de incidentes"],
  },
  {
    title: "Monitoreo & mejora",
    desc: "Observabilidad y aprendizaje continuo.",
    bullets: ["Dashboards y alertas", "A/B de prompts", "Entrenamiento con feedback"],
  },
];

export default function Services() {
  return (
    <section id="services" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Servicios</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Desde estrategia hasta operación.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="card">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {s.bullets.map((b) => <li key={b}>• {b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
