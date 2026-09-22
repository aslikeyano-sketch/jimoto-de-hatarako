import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHero, Crumbs, CTAButton, Tag } from "@/components/ui";
export const dynamic = "force-dynamic";
async function get(slug:string){ return prisma.organization.findFirst({ where:{slug,status:"published"} }); }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const o=await get(params.slug); return o?{title:`${o.name}（${o.type}）`,description:o.purpose}:{title:"団体"};
}
function Sec({title,body}:{title:string;body?:string}){ if(!body)return null; return (<div><h2 className="mt-8 text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-600">{body}</p></div>); }
export default async function OrgDetail({params}:{params:{slug:string}}){
  const o=await get(params.slug); if(!o) notFound();
  return (
    <main>
      <PageHero eyebrow={o.type} title={o.name} lead={o.purpose} />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:"/organizations",label:"団体"},{label:o.name}]} />
        <div className="flex gap-2"><Tag color="bg-violet-100 text-violet-700">{o.type}</Tag>{o.area&&<Tag>{o.area}</Tag>}</div>
        <Sec title="活動目的" body={o.purpose} />
        <Sec title="活動内容" body={o.activity} />
        <Sec title="連携したいこと" body={o.wantPartner} />
        <Sec title="地元への想い" body={o.message} />
        {(o.representative||o.members)&&(
          <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4 text-sm">
            {o.representative&&<div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">代表</dt><dd>{o.representative}</dd></div>}
            {o.members&&<div className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-semibold text-slate-600">メンバー</dt><dd>{o.members}</dd></div>}
            {o.url&&<div className="py-3"><a href={o.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">公式サイト →</a></div>}
          </dl>
        )}
        <div className="mt-10 text-center"><CTAButton href="/contact">お問い合わせ</CTAButton></div>
      </article>
    </main>
  );
}
