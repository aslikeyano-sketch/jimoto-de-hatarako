import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SITE, POPULAR_KEYWORDS, INTERVIEW_CATEGORIES, categoryColor } from "@/lib/constants";
import { PREFECTURES_MASTER, REGIONS } from "@/lib/prefectures-master";
import { JapanMap } from "@/components/japan-map";
import { SearchBar } from "@/components/search-bar";
import { InterviewCard } from "@/components/interview-card";
import { HeroPhotos } from "@/components/hero-photos";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [latest, features, grouped] = await Promise.all([
    prisma.interview.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: 5 }),
    prisma.feature.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.interview.groupBy({ by: ["prefecture"], where: { status: "published" }, _count: { _all: true } }),
  ]);
  const counts: Record<string, number> = {};
  grouped.forEach((g) => (counts[g.prefecture] = g._count._all));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const activePrefs = Object.keys(counts).length;

  return (
    <main>
      {/* ファーストビュー */}
      <section className="hero-bg border-b border-slate-100">
        <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-5 py-8 md:py-10 lg:grid-cols-12 lg:gap-8">
          {/* 左：メッセージ＋検索 */}
          <div className="lg:col-span-4">
            <p className="fade-up d1 brush text-sm font-semibold text-brand-600">{SITE.catch}</p>
            <h1 className="fade-up d2 mt-3 text-[2.1rem] font-bold leading-[1.2] tracking-tight text-navy-900 md:text-[2.6rem]">
              <span className="text-brand-600">{SITE.heroLead}</span>{SITE.heroTitleA}
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">{SITE.heroTitleB}</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-sky2-200/70" />
              </span>
              <span className="whitespace-nowrap">{SITE.heroTitleC}</span>
            </h1>
            <p className="fade-up d3 mt-5 text-sm leading-relaxed text-slate-600">{SITE.lead}</p>
            <div className="fade-up d4 mt-6"><SearchBar /></div>
            <div className="fade-up d5 mt-4">
              <p className="text-xs font-semibold text-slate-400">人気のキーワード</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {POPULAR_KEYWORDS.map((k) => (
                  <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">{k}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* 中央：日本地図（タブレット以下では大きくなりすぎないよう幅を抑える） */}
          <div className="fade-up d3 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <p className="brush pointer-events-none absolute left-1 top-2 z-10 text-sm font-semibold leading-relaxed text-brand-600/90 md:text-base">ローカルのチカラが、<br />日本を動かす。</p>
              <JapanMap counts={counts} />
              <Link href="/prefectures" className="mx-auto mt-1 flex w-fit flex-col items-center text-xs font-semibold text-brand-600 hover:text-brand-700">
                地域からインタビューを探す
                <span className="arrow-bob mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-white">↓</span>
              </Link>
            </div>
          </div>

          {/* 右：地域の写真＋コピー */}
          <HeroPhotos />
        </div>
      </section>

      {/* 最新のインタビュー */}
      <section id="latest" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-12">
        <SectionHead title="最新のインタビュー" sub="いま、注目したい。全国の地元企業と、そこで生きる人たちのストーリー。" more="/interviews" moreLabel="インタビュー一覧を見る" />
        {latest.length ? (
          <Reveal className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
            {latest.map((iv) => <div key={iv.id} className="reveal-item w-[78%] shrink-0 sm:w-[45%] md:w-auto"><InterviewCard iv={iv} /></div>)}
          </Reveal>
        ) : <Empty />}
      </section>

      {/* 地域から探す（地方区分＋件数） */}
      <section className="bg-slate-50/70 py-12">
        <div className="mx-auto max-w-[1440px] px-5">
          <SectionHead title="地域から探す" sub={`全国 ${activePrefs} 県で取材中／累計 ${total} 本のインタビュー`} more="/prefectures" moreLabel="日本地図から探す" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => {
              const prefs = PREFECTURES_MASTER.filter((p) => p.region === region);
              return (
                <div key={region} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
                  <h3 className="mb-2 text-sm font-bold text-navy-800">{region}</h3>
                  <ul className="space-y-0.5">
                    {prefs.map((p) => {
                      const c = counts[p.slug] ?? 0;
                      return (
                        <li key={p.slug}>
                          <Link href={`/prefecture/${p.slug}`} className={`flex items-center justify-between rounded px-2 py-1 text-sm hover:bg-brand-50 ${c ? "text-navy-800" : "text-slate-400"}`}>
                            <span>{p.name}</span>
                            {c > 0 && <span className="rounded-full bg-brand-50 px-2 text-xs font-bold text-brand-700">{c}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 特集 */}
      {features.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-12">
          <SectionHead title="特集" sub="テーマで読み解く、地域とこれからの仕事。" more="/features" moreLabel="特集一覧" />
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <Link key={f.id} href={`/features/${f.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-navy-100 to-sky2-100">
                  <span className="text-4xl opacity-80">📰</span>
                </div>
                <div className="p-4">
                  {f.theme && <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-semibold text-navy-700">{f.theme}</span>}
                  <h3 className="mt-2 font-bold leading-snug text-navy-900 group-hover:text-brand-700">{f.title}</h3>
                  {f.summary && <p className="mt-1 line-clamp-2 text-xs text-slate-500">{f.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 人・企業から探す（カテゴリー） */}
      <section className="bg-slate-50/70 py-12">
        <div className="mx-auto max-w-[1440px] px-5">
          <SectionHead title="人・企業から探す" sub="立場や関わり方から、インタビューを見つける。" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INTERVIEW_CATEGORIES.map((c) => (
              <Link key={c} href={`/interviews?category=${encodeURIComponent(c)}`} className={`rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-semibold shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg`}>
                <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] ${categoryColor(c)}`}>{c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <div className="rounded-3xl border-2 border-brand-200 bg-brand-50/40 px-7 py-10 text-center md:px-10 md:py-12">
          <h3 className="text-xl font-bold text-navy-900 md:text-2xl">情報提供・取材応募</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">「この会社・人を取材してほしい」——地域からの推薦・情報提供をお待ちしています。掲載のご依頼も受け付けています。</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/inquiry" className="rounded-full brand-gradient px-6 py-3 text-sm font-bold text-white shadow">掲載を依頼する</Link>
            <Link href="/submit" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">企業を推薦する</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHead({ title, sub, more, moreLabel }: { title: string; sub?: string; more?: string; moreLabel?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">{title}</h2>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {more && <Link href={more} className="text-sm font-semibold text-brand-600 hover:text-brand-700">{moreLabel ?? "すべて"} →</Link>}
    </div>
  );
}

function Empty() {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">まだ記事がありません。</div>;
}
