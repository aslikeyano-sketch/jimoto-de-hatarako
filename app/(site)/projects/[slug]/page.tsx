import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHero, Crumbs, CTAButton, Tag } from "@/components/ui";
export const dynamic = "force-dynamic";
async function get(slug:string){ return prisma.project.findFirst({ where:{slug,status:"published"} }); }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const p=await get(params.slug); return p?{title:p.title,description:p.summary}:{title:"プロジェクト"};
}
function Sec({title,body}:{title:string;body?:string}){ if(!body)return null; return (<div><h2 className="mt-8 text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-600">{body}</p></div>); }
export default async function ProjectDetail({params}:{params:{slug:string}}){
  const p=await get(params.slug); if(!p) notFound();
  return (
    <main>
      <PageHero eyebrow="地方創生プロジェクト" title={p.title} lead={p.summary} />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{href:"/projects",label:"活動"},{label:p.title}]} />
        <div className="flex gap-2"><Tag color="bg-leaf-500/10 text-leaf-700">{p.theme}</Tag></div>
        {p.coverImage && <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.coverImage} alt={p.title} className="aspect-[16/9] w-full object-cover" /></div>}
        <Sec title="地域の課題" body={p.issue} />
        <Sec title="プロジェクト概要" body={p.summary} />
        <Sec title="主催者" body={p.organizer} />
        <Sec title="現在の活動" body={p.current} />
        <Sec title="今後の目標" body={p.goal} />
        <Sec title="求めている協力" body={p.wantedHelp} />
        <Sec title="参加方法" body={p.joinHow} />
        <div className="mt-10 rounded-3xl brand-gradient px-6 py-10 text-center text-white">
          <p className="text-xl font-bold">この活動に参加したい</p>
          <p className="mt-2 text-sm text-white/90">東京からでも、副業でも、週末だけでも。まずは関心を教えてください。</p>
          <div className="mt-5"><CTAButton href="/register" variant="white">参加・関心を登録する</CTAButton></div>
        </div>
      </article>
    </main>
  );
}
