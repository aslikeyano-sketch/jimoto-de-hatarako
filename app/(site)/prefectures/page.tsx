import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero, Crumbs } from "@/components/ui";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "都道府県から探す" };

const REGION_ORDER = ["北海道","東北","関東","中部","近畿","中国","四国","九州","沖縄","その他"];

export default async function Prefectures() {
  const prefs = await prisma.prefecture.findMany({ where:{published:true}, orderBy:{name:"asc"} });
  // 県ごとの掲載数（社長インタビュー＝企業＋人物＋プロジェクト＋イベント）
  const w = { status: "published" };
  const [co, pe, pj, ev] = await Promise.all([
    prisma.company.groupBy({ by:["prefecture"], where:w, _count:true }),
    prisma.person.groupBy({ by:["prefecture"], where:w, _count:true }),
    prisma.project.groupBy({ by:["prefecture"], where:w, _count:true }),
    prisma.event.groupBy({ by:["prefecture"], where:w, _count:true }),
  ]);
  const count = (slug:string) => {
    const g = (arr:any[]) => arr.find(x=>x.prefecture===slug)?._count ?? 0;
    return { total: g(co)+g(pe)+g(pj)+g(ev), companies: g(co) };
  };
  // 地方ブロックでグループ化
  const byRegion: Record<string, typeof prefs> = {};
  for (const p of prefs) (byRegion[p.region || "その他"] ??= []).push(p);
  const regions = Object.keys(byRegion).sort((a,b)=>REGION_ORDER.indexOf(a)-REGION_ORDER.indexOf(b));

  return (
    <main>
      <PageHero eyebrow="PREFECTURES" title="都道府県から探す" lead="あなたの地元を選んで、地元の社長・人・活動・イベントを見てみよう。" />
      <div className="mx-auto max-w-6xl px-5 py-10 space-y-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"都道府県から探す"}]} />
        {regions.map(region=>(
          <div key={region}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900"><span className="inline-block h-4 w-1 rounded bg-brand-500" />{region}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {byRegion[region].map(p=>{
                const c = count(p.slug);
                return (
                  <Link key={p.id} href={`/prefecture/${p.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50">
                    <div className="flex items-baseline justify-between">
                      <p className="text-lg font-bold text-slate-900 group-hover:text-brand-700">{p.name}</p>
                      {c.total>0 && <span className="text-xs font-semibold text-brand-600">{c.total}件</span>}
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-brand-600/80">{p.catchcopy}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <p className="text-sm text-slate-400">※順次、全国47都道府県に拡大していきます。</p>
      </div>
    </main>
  );
}
