import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero, Crumbs } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "地元の活動を知る" };
export default async function Projects() {
  const rows = await prisma.project.findMany({ where:{status:"published"}, orderBy:{publishedAt:"desc"} });
  return (
    <main>
      <PageHero eyebrow="PROJECTS" title="地元の活動を知る" lead="地域で始まっている挑戦。あなたも「参加する」から関われます。" />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"地元の活動を知る"}]} />
        {rows.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{rows.map(p=><ProjectCard key={p.id} p={p} />)}</div>
          : <p className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-400">準備中です</p>}
      </div>
    </main>
  );
}
