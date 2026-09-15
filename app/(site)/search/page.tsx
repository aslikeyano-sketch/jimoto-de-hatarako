import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PREFECTURES_MASTER } from "@/lib/prefectures-master";
import { INTERVIEW_CATEGORIES, categoryColor } from "@/lib/constants";
import { SearchBar } from "@/components/search-bar";
import { InterviewCard } from "@/components/interview-card";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "検索｜地元で働こう" };

export default async function SearchPage({ searchParams }: { searchParams: { q?: string; category?: string; pref?: string } }) {
  const q = (searchParams.q ?? "").trim();
  const category = searchParams.category;
  const prefFilter = searchParams.pref;

  // キーワードが県名と一致すればその県slugも対象に
  const matchedPrefs = q ? PREFECTURES_MASTER.filter((p) => p.name.includes(q) || p.slug === q.toLowerCase()).map((p) => p.slug) : [];

  const and: any[] = [{ status: "published" }];
  if (q) {
    and.push({
      OR: [
        { title: { contains: q } }, { subtitle: { contains: q } },
        { companyName: { contains: q } }, { personName: { contains: q } }, { personRole: { contains: q } },
        { tags: { contains: q } }, { category: { contains: q } }, { city: { contains: q } },
        { bodyAbout: { contains: q } }, { bodyWhyLocal: { contains: q } }, { bodyStrength: { contains: q } },
        { bodyFuture: { contains: q } }, { bodyMessage: { contains: q } },
        ...(matchedPrefs.length ? [{ prefecture: { in: matchedPrefs } }] : []),
      ],
    });
  }
  if (category) and.push({ category });
  if (prefFilter) and.push({ prefecture: prefFilter });

  const items = await prisma.interview.findMany({ where: { AND: and }, orderBy: { publishedAt: "desc" }, take: 60 });

  // 結果からの絞り込み候補
  const prefsInResult = Array.from(new Set(items.map((i) => i.prefecture)));

  return (
    <main>
      <PageHero eyebrow="SEARCH" title="検索" lead="都道府県・企業名・人物名・役職・タイトル・本文・タグ・カテゴリーから横断検索。" />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mx-auto max-w-2xl"><SearchBar defaultValue={q} /></div>

        {/* カテゴリー絞り込み */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href={`/search?${new URLSearchParams({ ...(q ? { q } : {}) }).toString()}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!category ? "bg-brand-600 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>すべて</Link>
          {INTERVIEW_CATEGORIES.map((c) => (
            <Link key={c} href={`/search?${new URLSearchParams({ ...(q ? { q } : {}), category: c }).toString()}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? "bg-brand-600 text-white" : `${categoryColor(c)}`}`}>{c}</Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500">
          {q || category || prefFilter ? <>「<span className="font-semibold text-navy-800">{q || category || prefFilter}</span>」の検索結果：<span className="font-semibold text-brand-600">{items.length}</span> 件</> : "キーワードを入力してください。"}
        </p>

        {prefFilter && <div className="mt-2"><Link href={`/search?${new URLSearchParams({ ...(q ? { q } : {}), ...(category ? { category } : {}) }).toString()}`} className="text-xs text-brand-600">× 県の絞り込みを解除</Link></div>}

        {prefsInResult.length > 1 && !prefFilter && (
          <div className="mt-3 flex flex-wrap gap-2">
            {prefsInResult.map((slug) => {
              const name = PREFECTURES_MASTER.find((p) => p.slug === slug)?.name ?? slug;
              return <Link key={slug} href={`/search?${new URLSearchParams({ ...(q ? { q } : {}), ...(category ? { category } : {}), pref: slug }).toString()}`} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">{name}</Link>;
            })}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((iv) => <InterviewCard key={iv.id} iv={iv} />)}</div>
        )}
      </div>
    </main>
  );
}
