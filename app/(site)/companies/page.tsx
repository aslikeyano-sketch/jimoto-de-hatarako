import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero, Crumbs } from "@/components/ui";
import { CompanyCard } from "@/components/cards";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "地元の企業を知る" };
export default async function Companies() {
  const rows = await prisma.company.findMany({ where:{status:"published"}, orderBy:{publishedAt:"desc"} });
  return (
    <main>
      <PageHero eyebrow="COMPANIES" title="地元の企業を知る" lead="地元には、まだ知らない会社がある。経営者の想いと、これからの挑戦を紹介します。" />
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"地元の企業を知る"}]} />
        {rows.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{rows.map(c=><CompanyCard key={c.id} c={c} />)}</div>
          : <p className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-400">準備中です</p>}
      </div>
    </main>
  );
}
