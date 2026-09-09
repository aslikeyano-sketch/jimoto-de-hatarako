import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ORG_TYPES } from "@/lib/constants";
import { PageHero, Crumbs } from "@/components/ui";
import { OrgCard } from "@/components/cards";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "県人会・大学・学生団体" };
export default async function Orgs() {
  const rows = await prisma.organization.findMany({ where:{status:"published"} });
  return (
    <main>
      <PageHero eyebrow="ORGANIZATIONS" title="県人会・東京事務所・大学・学生団体" lead="東京で地元とつながる拠点と、地域を動かす団体たち。" />
      <div className="mx-auto max-w-6xl px-5 py-10 space-y-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"団体・つながり"}]} />
        {ORG_TYPES.map(t=>{
          const g=rows.filter(o=>o.type===t); if(!g.length) return null;
          return (<div key={t}><h2 className="mb-4 text-xl font-bold text-slate-900">{t}</h2>
            <div className="grid gap-4 sm:grid-cols-3">{g.map(o=><OrgCard key={o.id} o={o} />)}</div></div>);
        })}
        {rows.length===0 && <p className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-400">準備中です</p>}
      </div>
    </main>
  );
}
