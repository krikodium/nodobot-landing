// components/Process.tsx
type Step = { k: string; t: string; d: string };

const steps: Step[] = [
  { k: "01", t: "Exploración", d: "Brief, métricas objetivo, datos y canales." },
  { k: "02", t: "Blueprint", d: "Arquitectura, riesgos, seguridad y timeline." },
  { k: "03", t: "Prototipo", d: "Flujos clave, prompts base y pruebas." },
  { k: "04", t: "Implementación", d: "n8n, integraciones y QA." },
  { k: "05", t: "Go-live + mejora", d: "Monitoreo, alertas y optimización." },
];

export default function Process() {
  return (
    <section id="process" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Proceso</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Iterativo, medible y seguro.</p>
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-5">
        {steps.map((s) => (
          <li key={s.k} className="card">
            <p className="text-xs text-slate-500">{s.k}</p>
            <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
