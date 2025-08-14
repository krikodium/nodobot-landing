// components/Trustbar.tsx
export default function Trustbar() {
  const brands = ["Mercado", "FinPlus", "EduOne", "LogiX", "Healthia", "Retailo"];
  return (
    <section className="border-y bg-white/60 py-6 dark:bg-[#0b1020]/40 dark:border-slate-800">
      <div className="container-lg">
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
          {brands.map((b) => (
            <div key={b} className="text-sm font-semibold tracking-wide">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
