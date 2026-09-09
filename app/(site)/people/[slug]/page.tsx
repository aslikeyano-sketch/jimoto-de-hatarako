import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { mdToHtml } from "@/lib/utils";
import { PERSON_CATEGORY_COLORS } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton, Tag } from "@/components/ui";
export const dynamic = "force-dynamic";
async function get(slug:string){ return prisma.person.findFirst({ where:{slug,status:"published"} }); }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const p=await get(params.slug); if(!p) return {title:"人物"};
  const title=p.seoTitle||`${p.name}（${p.category}）`, description=p.seoDescription||p.bio;
  return { title, description, openGraph:{ title, description, type:"article", ...(p.photo?{images:[p.photo]}:{}) } };
}
function Sec({title,body}:{title:string;body?:string}){ if(!body)return null; return (<div><h2 className="mt-8 text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-600">{body}</p></div>); }
export default async function PersonDetail({params}:{params:{slug:string}}){
  const p=await get(params.slug); if(!p) notFound();
  const isPolitician = p.category==="議員" || p.category==="自治体";
  return (
    <main>
      <PageHero eyebrow={isPolitician?"地域の未来を聞く":"地元の人を知る"} title={p.name} lead={p.title||p.affiliation} />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:"/people",label:"人"},{label:p.name}]} />
        <div className="flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-3xl font-bold text-brand-700">
            {p.photo? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.photo} alt="" className="h-full w-full object-cover"/> : p.name.slice(0,1)}
          </span>
          <div><div className="mb-1"><Tag color={PERSON_CATEGORY_COLORS[p.category]||"bg-slate-100 text-slate-600"}>{p.category}</Tag></div>
            <p className="text-2xl font-bold text-slate-900">{p.name}</p><p className="text-slate-500">{p.title||p.affiliation}</p></div>
        </div>
        {p.bio && <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">{p.bio}</p>}
        {p.story && <div className="prose-j mt-4" dangerouslySetInnerHTML={{__html:mdToHtml(p.story)}} />}
        {isPolitician && (<><Sec title="地域の課題" body={p.localIssue} /><Sec title="目指す社会" body={p.vision} /></>)}
        <Sec title="東京にいる地元出身者へ" body={p.message} />
        <div className="mt-10 rounded-2xl bg-brand-50/60 p-6 text-center">
          <p className="font-bold text-slate-800">この人と地域に関わる</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3"><CTAButton href="/register">地元と関わりたい人登録</CTAButton><CTAButton href="/join" variant="outline">関わり方を見る</CTAButton></div>
        </div>
      </article>
    </main>
  );
}
