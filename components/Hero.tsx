// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_-20%,rgba(61,109,255,0.25),transparent_60%)]"
      />
      <div className="container-lg grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="max-w-xl">
          <span className="rounded-full border px-3 py-1 text-xs text-slate-600 bg-white/70 backdrop-blur dark:text-slate-300 dark:bg-white/10 dark:border-slate-700">
            Bots y agentes • n8n • WhatsApp • Web • Slack
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            Arquitectura, diseño e implementación <span className="text-brand-700 dark:text-brand-400">end-to-end</span> de agentes.
          </h1>
          <p className="mt-4 text-lg text-slate-600 md:text-xl dark:text-slate-300">
            Orquestamos LLMs, flujos en n8n e integraciones para automatizar ventas, soporte y
            operaciones. Medimos impacto y escalamos con seguridad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Quiero una demo</a>
            <a href="#cases" className="btn btn-ghost">Ver casos</a>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Time-to-first-value &lt; 3 semanas</li>
            <li>• Observabilidad y guardrails desde el día 1</li>
            <li>• Handoff humano y trazabilidad de prompts</li>
          </ul>
        </div>

        <div className="card relative">
          <div className="grid gap-3 text-sm">
            <div className="rounded-xl border p-4 dark:border-slate-700">
              <p className="font-medium">Blueprint del agente</p>
              <p className="text-slate-600 dark:text-slate-300">
                Capacidades, herramientas, memoria y políticas de seguridad.
              </p>
            </div>
            <div className="rounded-xl border p-4 dark:border-slate-700">
              <p className="font-medium">Orquestación en n8n</p>
              <p className="text-slate-600 dark:text-slate-300">
                Flujos versionados, pruebas y despliegue continuo.
              </p>
            </div>
            <div className="rounded-xl border p-4 dark:border-slate-700">
              <p className="font-medium">KPIs y mejora continua</p>
              <p className="text-slate-600 dark:text-slate-300">
                CSAT, ASA, FCR, deflection, A/B de prompts y entrenamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
