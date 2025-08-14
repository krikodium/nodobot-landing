type Item = { title: string; tag: string; desc: string };
const items: Item[] = [
  { title: "Atención en WhatsApp 24/7", tag: "Retail", desc: "Agente con catálogo y estado de pedido. Aumento de CSAT +22%." },
  { title: "Onboarding de clientes", tag: "Fintech", desc: "KYC guiado y validaciones automáticas. Tiempo de alta −43%." },
  { title: "Mesa de ayuda interna", tag: "SaaS", desc: "Resolución L1 automatizada y handoff a Slack. Ahorro 180 hs/mes." },
  { title: "Booking de turnos", tag: "Salud", desc: "Agenda omnicanal y recordatorios. No‑shows −31%." },
  { title: "FAQ inteligente", tag: "Educación", desc: "Indexación de campus y autoservicio. Deflection +37%." },
  { title: "Seguimiento de pedidos", tag: "Logística", desc: "Webhook + tracking proactivo. Contactos repetidos −29%." },
];

export default function Work() {
  return (
    <section id="work" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Casos</h2>
        <p className="mt-3 text-slate-600">Impacto real en distintos verticales.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="card">
            <div className="text-xs rounded-full inline-block border px-2 py-0.5">{it.tag}</div>
            <h3 className="mt-3 text-lg font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
