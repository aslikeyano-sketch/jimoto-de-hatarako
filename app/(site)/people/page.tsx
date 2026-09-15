import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PERSON_CATEGORIES } from "@/lib/constants";
import { PageHero, Crumbs } from "@/components/ui";
import { PersonCard } from "@/components/cards";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "地元の人を知る" };
export default async function People({ searchParams }:{ searchParams:{cat?:string} }) {
  const cat = searchParams.cat;
  const where:any = { status:"published" }; if (cat) where.category = cat;
  const rows = await prisma.person.findMany({ where, orderBy:{publishedAt:"desc"} });
  return (
    <main>
      <PageHero eyebrow="PEOPLE" title="地元の人を知る" lead="地元を動かしている経営者・議員・地域プレイヤー・若者たち。" />
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"地元の人を知る"}]} />
        <div className="mb-6 flex flex-wrap gap-2">
          <Link href="/people" className={`rounded-full px-4 py-1.5 text-sm font-semibold ${!cat?"brand-gradient text-white":"border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>すべて</Link>
          {PERSON_CATEGORIES.map(c=>(
            <Link key={c} href={`/people?cat=${encodeURIComponent(c)}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${cat===c?"brand-gradient text-white":"border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{c}</Link>
          ))}
        </div>
        {rows.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map(p=><PersonCard key={p.id} p={p} />)}</div>
          : <p className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-400">準備中です</p>}
      </div>
    </main>
  );
}
