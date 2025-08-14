const tools = [
  "n8n", "OpenAI", "WhatsApp / Twilio", "Telegram", "Web", "Zapier / Make",
  "Firebase", "Supabase", "Vercel", "PostgreSQL", "MongoDB", "Google Sheets",
];

export default function Stack() {
  return (
    <section id="stack" className="container-lg py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Stack</h2>
        <p className="mt-3 text-slate-600">Tecnologías que usamos a diario.</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {tools.map(t => (
          <div key={t} className="card text-center text-sm">{t}</div>
        ))}
      </div>
    </section>
  );
}
