"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, NAV, HEADER_CTA } from "@/lib/constants";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span className="whitespace-nowrap text-lg font-bold tracking-tight text-navy-900">{SITE.catch}</span>
          <span className="mt-1 whitespace-nowrap text-[10px] tracking-wide text-slate-400">{SITE.sub}｜by Roots Next</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex xl:gap-7">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`whitespace-nowrap transition-colors hover:text-brand-700 ${active(n.href) ? "font-bold text-brand-700" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="検索" className="hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-700 lg:inline-flex">
            <SearchIcon />
          </Link>
          <Link href={HEADER_CTA.href} className="hidden whitespace-nowrap rounded-full brand-gradient px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.03] md:inline-flex md:items-center md:gap-1">
            {HEADER_CTA.label} <span aria-hidden>→</span>
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-label="メニュー" className="rounded-lg p-2 text-navy-800 hover:bg-slate-100 lg:hidden">
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-5 py-2">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
                {n.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-slate-700">検索</Link>
            <Link href={HEADER_CTA.href} onClick={() => setOpen(false)} className="my-3 rounded-full brand-gradient px-5 py-2.5 text-center text-xs font-bold text-white">
              {HEADER_CTA.label} →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
