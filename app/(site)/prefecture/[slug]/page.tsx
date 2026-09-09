import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fmtDate } from "@/lib/utils";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
import { CompanyCard, PersonCard, ProjectCard, EventCard, OrgCard } from "@/components/cards";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }:{ params:{slug:string} }): Promise<Metadata> {
  const p = await prisma.prefecture.findUnique({ where:{slug:params.slug} });
  return { title: p ? `${p.name}` : "都道府県" , description: p?.catchcopy };
}

export default async function PrefPage({ params }:{ params:{slug:string} }) {
  const pref = await prisma.prefecture.findUnique({ where:{slug:params.slug} });
  if (!pref) notFound();
  const w = { prefecture: params.slug, status: "published" };
  const [companies, people, projects, events, orgs] = await Promise.all([
    prisma.company.findMany({ where:w, orderBy:{publishedAt:"desc"} }),
    prisma.person.findMany({ where:w, orderBy:{publishedAt:"desc"} }),
    prisma.project.findMany({ where:w, orderBy:{publishedAt:"desc"} }),
    prisma.event.findMany({ where:w, orderBy:{createdAt:"desc"} }),
    prisma.organization.findMany({ where:w }),
  ]);
  const orgByType = (t:string)=>orgs.filter(o=>o.type===t);

  return (
    <main>
      <PageHero eyebrow={pref.region} title={pref.catchcopy || pref.name} lead={pref.intro || `${pref.name}の企業・人・活動・東京でのつながりを紹介します。`} />
      <div className="mx-auto max-w-6xl px-5 py-10 space-y-14">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:"/prefectures",label:"都道府県"},{label:pref.name}]} />

        <Block title="企業" empty="準備中です">{companies.map(c=><CompanyCard key={c.id} c={c} />)}</Block>
        <Block title="人" cols2 empty="準備中です">{people.map(p=><PersonCard key={p.id} p={p} />)}</Block>
        <Block title="地方創生プロジェクト" cols2 empty="準備中です">{projects.map(p=><ProjectCard key={p.id} p={p} />)}</Block>
        <Block title="東京で地元とつながる（イベント）" cols2 empty="準備中です">{events.map(e=><EventCard key={e.id} e={e} fmt={fmtDate} />)}</Block>

        {/* 県人会・東京事務所・学生団体 */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">県人会・東京事務所・学生団体</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {orgs.length? orgs.map(o=><OrgCard key={o.id} o={o} />) : <p className="text-sm text-slate-400">準備中です</p>}
          </div>
        </div>

        <div className="rounded-2xl bg-brand-50/60 p-6 text-center">
          <p className="font-bold text-slate-800">{pref.name}の企業・団体・議員の方へ</p>
          <p className="mt-1 text-sm text-slate-600">東京にいる同郷者へ、あなたの取り組みを届けませんか。</p>
          <div className="mt-4"><CTAButton href="/inquiry">取材・掲載を希望する</CTAButton></div>
        </div>
      </div>
    </main>
  );
}

function Block({ title, cols2, empty, children }:{ title:string; cols2?:boolean; empty:string; children:React.ReactNode }) {
  const arr = Array.isArray(children) ? children : [children];
  const has = arr.filter(Boolean).length>0;
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-slate-900">{title}</h2>
      {has ? <div className={`grid gap-5 ${cols2?"sm:grid-cols-2":"sm:grid-cols-2 lg:grid-cols-3"}`}>{children}</div>
        : <p className="text-sm text-slate-400">{empty}</p>}
    </div>
  );
}
