"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ placeholder = "気になる地域・企業・キーワードで探す", defaultValue = "" }: { placeholder?: string; defaultValue?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(defaultValue);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search");
  };
  return (
    <form onSubmit={submit} className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white py-2 pl-5 pr-2 shadow-card transition-all duration-300 hover:border-brand-300 hover:shadow-lg focus-within:border-brand-400 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-brand-100">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" className="shrink-0"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-navy-900 outline-none placeholder:text-slate-400"
        aria-label="サイト内検索"
      />
      <button type="submit" aria-label="検索" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full brand-gradient text-white transition-transform duration-300 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5">
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
