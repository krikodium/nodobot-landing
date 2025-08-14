"use client";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrá tu proveedor (Formspree/Resend/Zapier)
    alert("¡Gracias! Integraremos tu proveedor de forms acá.");
  };

  return (
    <section id="contact" className="container-lg py-20 md:py-28">
      <div className="card mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Agenda una demo
        </h2>
        <p className="mt-3 text-slate-600">
          Contanos tu caso y te devolvemos un blueprint inicial.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border px-4 py-3"
            name="name"
            required
            placeholder="Nombre"
            aria-label="Nombre"
          />
          <input
            className="rounded-xl border px-4 py-3"
            name="email"
            type="email"
            required
            placeholder="Email"
            aria-label="Email"
          />
          <input
            className="rounded-xl border px-4 py-3 sm:col-span-2"
            name="company"
            placeholder="Empresa (opcional)"
            aria-label="Empresa"
          />
          <textarea
            className="rounded-xl border px-4 py-3 sm:col-span-2"
            name="message"
            rows={4}
            placeholder="Contanos tu necesidad..."
            aria-label="Mensaje"
          />
          <button className="btn btn-primary sm:col-span-2" type="submit">
            Enviar
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-500">
          Respeto por tu privacidad. Sin spam.
        </p>
      </div>
    </section>
  );
}
