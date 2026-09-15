import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PREFECTURES_MASTER, REGIONS } from "@/lib/prefectures-master";
import { JapanMap } from "@/components/japan-map";
import { PageHero, Crumbs } from "@/components/ui";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "地域から探す｜地元で働こう", description: "日本地図から都道府県を選んで、全国の地元企業インタビューを探せます。" };

export default async function Prefectures() {
  const grouped = await prisma.interview.groupBy({ by: ["prefecture"], where: { status: "published" }, _count: { _all: true } });
  const counts: Record<string, number> = {};
  grouped.forEach((g) => (counts[g.prefecture] = g._count._all));

  return (
    <main>
      <PageHero eyebrow="地域から探す" title="日本地図から、地元を選ぶ。" lead="47都道府県のどこかに、あなたの知らない面白い会社と人がいます。地図をクリックして、その地域のインタビューへ。" />
      <div className="mx-auto max-w-[1440px] space-y-12 px-5 py-10">
        <Crumbs items={[{ href: "/", label: "ホーム" }, { label: "地域から探す" }]} />

        <div className="mx-auto max-w-2xl">
          <JapanMap counts={counts} />
        </div>

        {REGIONS.map((region) => {
          const prefs = PREFECTURES_MASTER.filter((p) => p.region === region);
          return (
            <div key={region}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900"><span className="inline-block h-4 w-1 rounded bg-brand-500" />{region}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {prefs.map((p) => {
                  const c = counts[p.slug] ?? 0;
                  return (
                    <Link key={p.slug} href={`/prefecture/${p.slug}`} className={`group flex items-baseline justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-colors hover:border-brand-300 hover:bg-brand-50 ${c ? "" : "opacity-70"}`}>
                      <span className="text-base font-bold text-navy-900 group-hover:text-brand-700">{p.name}</span>
                      {c > 0 && <span className="rounded-full bg-brand-50 px-2 text-xs font-bold text-brand-600">{c}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
