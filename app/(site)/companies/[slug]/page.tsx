import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { photoList } from "@/lib/utils";
import { PageHero, Crumbs, CTAButton, Tag } from "@/components/ui";
export const dynamic = "force-dynamic";
async function get(slug:string){ return prisma.company.findFirst({ where:{slug,status:"published"} }); }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const c=await get(params.slug); if(!c) return {title:"企業"};
  const title=c.seoTitle||c.name, description=c.seoDescription||c.description;
  return { title, description, openGraph:{ title, description, type:"article", ...(c.coverImage?{images:[c.coverImage]}:{}) } };
}
function Row({label,value}:{label:string;value?:string}){ if(!value)return null; return (
  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4"><dt className="shrink-0 font-semibold text-slate-600 sm:w-32">{label}</dt><dd className="text-slate-700">{value}</dd></div>
);}
function Sec({title,body}:{title:string;body?:string}){ if(!body)return null; return (
  <div><h2 className="mt-8 text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-600">{body}</p></div>
);}
export default async function CompanyDetail({params}:{params:{slug:string}}){
  const c=await get(params.slug); if(!c) notFound();
  const photos=photoList(c.photos);
  const jsonLd = {
    "@context":"https://schema.org","@type":"Organization",
    name:c.name, description:c.description, ...(c.url?{url:c.url}:{}), ...(c.coverImage?{image:c.coverImage}:{}),
    ...(c.area?{address:{"@type":"PostalAddress",addressLocality:c.area,addressCountry:"JP"}}:{}),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
      <PageHero eyebrow="企業インタビュー" title={c.name} lead={c.description} />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:`/prefecture/${c.prefecture}`,label:"地域"},{href:"/companies",label:"企業"},{label:c.name}]} />
        <div className="flex flex-wrap gap-2">
          <Tag color="bg-brand-100 text-brand-700">{c.industry||"企業"}</Tag><Tag>{c.area}</Tag>
        </div>
        {c.coverImage && <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.coverImage} alt={c.name} className="aspect-[16/9] w-full object-cover" /></div>}

        <Sec title="事業内容" body={c.description} />
        <Sec title="会社の歴史" body={c.history} />
        <Sec title="会社の強み" body={c.strengths} />
        <Sec title="地域との関係" body={c.localRelation} />
        <Sec title="今後の挑戦" body={c.futureChallenge} />
        <Sec title="求める人物" body={c.wantedPerson} />
        <Sec title="東京にいる地元出身者へ" body={c.messageToLocals} />

        {photos.length>0 && <div className="mt-8 grid gap-3 sm:grid-cols-2">{photos.map((src,i)=>(/* eslint-disable-next-line @next/next/no-img-element */<img key={i} src={src} alt="" className="rounded-xl object-cover" />))}</div>}

        <h2 className="mt-10 text-xl font-bold text-slate-900">会社概要</h2>
        <dl className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4 text-sm">
          <Row label="会社名" value={c.name} /><Row label="代表者" value={c.representative} />
          <Row label="所在地" value={c.area} /><Row label="設立" value={c.founded} />
          <Row label="業種" value={c.industry} /><Row label="従業員数" value={c.employees} />
          {c.url && <div className="py-3"><a href={c.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">公式サイト →</a></div>}
        </dl>

        <div className="mt-10 rounded-2xl bg-brand-50/60 p-6 text-center">
          <p className="font-bold text-slate-800">この会社が気になったら</p>
          <p className="mt-1 text-sm text-slate-600">東京から関わる・副業・Uターンなど、関わり方はいろいろ。</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3"><CTAButton href="/register">地元と関わりたい人登録</CTAButton><CTAButton href="/join" variant="outline">関わり方を見る</CTAButton></div>
        </div>
      </article>
    </main>
  );
}
