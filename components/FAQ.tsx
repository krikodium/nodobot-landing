// components/FAQ.tsx
const items = [
  { q: "¿Cuánto tarda un MVP?", a: "Entre 2 y 4 semanas según integraciones y alcance." },
  { q: "¿Trabajan con mis datos?", a: "Sí, definimos fuentes y gobernanza. Implementamos guardrails y registros." },
  { q: "¿Qué pasa si el agente no sabe?", a: "Fallback seguro, desambiguación y handoff a humano con contexto." },
  { q: "¿Pueden operar multi-canal?", a: "Sí: WhatsApp, Web, Slack, Telegram, email y más." },
];

export default function FAQ() {
  return (
    <section id="faq" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Preguntas frecuentes</h2>
      </div>
      <div className="mx-auto mt-8 max-w-3xl divide-y rounded-2xl border bg-white shadow-soft dark:bg-[#0f152a] dark:border-slate-800">
        {items.map((it) => (
          <details key={it.q} className="group p-6">
            <summary className="cursor-pointer list-none font-medium">
              <span className="group-open:text-brand-700 dark:group-open:text-brand-400">{it.q}</span>
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
