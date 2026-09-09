import Link from "next/link";

export function CTAButton({ href, children, variant="solid", external }:{ href:string; children:React.ReactNode; variant?:"solid"|"outline"|"white"; external?:boolean }) {
  const base="inline-block rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]";
  const cls = variant==="solid" ? `brand-gradient text-white shadow-md ${base}`
    : variant==="white" ? `bg-white text-brand-700 shadow-md ${base}`
    : `border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 ${base}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}

export function PageHero({ eyebrow, title, lead }:{ eyebrow?:string; title:string; lead?:string }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50/80 via-brand-50/20 to-white" />
      <div className="relative mx-auto max-w-5xl px-5 py-14 md:py-16">
        {eyebrow && <p className="text-sm font-semibold text-brand-600">{eyebrow}</p>}
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{lead}</p>}
      </div>
    </section>
  );
}

export function Crumbs({ items }:{ items:{href?:string;label:string}[] }) {
  return (
    <nav className="mb-6 text-xs text-slate-400">
      {items.map((it,i)=>(
        <span key={i}>
          {it.href ? <Link href={it.href} className="hover:text-slate-600">{it.label}</Link> : <span className="text-slate-600">{it.label}</span>}
          {i<items.length-1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function Placeholder({ label, emoji="📍" }:{ label:string; emoji?:string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-100 to-amber-50">
      <span className="text-4xl opacity-80">{emoji}</span>
      <span className="text-sm font-bold text-brand-600/70">{label}</span>
    </div>
  );
}

export function Tag({ children, color="bg-slate-100 text-slate-600" }:{ children:React.ReactNode; color?:string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>{children}</span>;
}
