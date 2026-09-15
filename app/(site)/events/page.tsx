import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { fmtDate } from "@/lib/utils";
import { PageHero, Crumbs } from "@/components/ui";
import { EventCard } from "@/components/cards";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "東京で地元とつながる" };
export default async function Events() {
  const rows = await prisma.event.findMany({ where:{status:"published"}, orderBy:[{heldOn:"asc"},{createdAt:"desc"}] });
  return (
    <main>
      <PageHero eyebrow="EVENTS" title="東京で地元とつながる" lead="県人会・移住相談・県産品フェア・就職イベント。東京にいながら地元とつながる機会。" />
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"東京で地元とつながる"}]} />
        {rows.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{rows.map(e=><EventCard key={e.id} e={e} fmt={fmtDate} />)}</div>
          : <p className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-400">準備中です</p>}
      </div>
    </main>
  );
}
