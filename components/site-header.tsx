import Link from "next/link";
import { SITE, NAV } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-lg font-bold text-white">地</span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-slate-900">{SITE.name}</span>
            <span className="mt-0.5 text-[10px] text-slate-400">by Roots Next</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-brand-700">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/for-companies" className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 md:inline-block">取材を受けたい方へ</Link>
          <Link href="/register" className="rounded-full brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-sm">地元と関わる</Link>
        </div>
      </div>
    </header>
  );
}
