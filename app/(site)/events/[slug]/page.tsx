import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fmtDate } from "@/lib/utils";
import { PageHero, Crumbs, CTAButton, Tag } from "@/components/ui";
export const dynamic = "force-dynamic";
async function get(slug:string){ return prisma.event.findFirst({ where:{slug,status:"published"} }); }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const e=await get(params.slug); return e?{title:e.title,description:e.content}:{title:"イベント"};
}
export default async function EventDetail({params}:{params:{slug:string}}){
  const e=await get(params.slug); if(!e) notFound();
  return (
    <main>
      <PageHero eyebrow="EVENT" title={e.title} />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:"/events",label:"イベント"},{label:e.title}]} />
        <div className="flex flex-wrap gap-2">
          <Tag color="bg-amber-100 text-amber-700">{e.category}</Tag>
          {e.inTokyo && <Tag color="bg-indigo-100 text-indigo-700">東京開催</Tag>}
          {e.isOnline && <Tag color="bg-sky-100 text-sky-700">オンライン</Tag>}
        </div>
        {e.coverImage && <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={e.coverImage} alt={e.title} className="aspect-[16/9] w-full object-cover" /></div>}
        <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4 text-sm">
          <div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">開催日</dt><dd className="text-slate-700">{e.heldOn?fmtDate(e.heldOn):"日程調整中"}</dd></div>
          <div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">場所</dt><dd className="text-slate-700">{e.place||"—"}</dd></div>
          <div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">主催</dt><dd className="text-slate-700">{e.host||"—"}</dd></div>
          <div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">対象</dt><dd className="text-slate-700">{e.target||"—"}</dd></div>
        </dl>
        {e.content && <p className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-600">{e.content}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          {e.applyUrl && <CTAButton href={e.applyUrl} external>申し込む</CTAButton>}
          <CTAButton href="/contact" variant="outline">お問い合わせ</CTAButton>
        </div>
      </article>
    </main>
  );
}
