import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_CATEGORIES, categoryColor } from "@/lib/constants";
import { InterviewCard } from "@/components/interview-card";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "インタビュー一覧｜地元で働こう",
  description: "全国47都道府県の地元企業・経営者・地域プレイヤーのインタビュー記事一覧。",
};

export default async function InterviewsPage({ searchParams }: { searchParams: { category?: string; tag?: string } }) {
  const category = searchParams.category;
  const tag = searchParams.tag;
  const where: any = { status: "published" };
  if (category) where.category = category;
  if (tag) where.tags = { contains: tag };
  const items = await prisma.interview.findMany({ where, orderBy: { publishedAt: "desc" } });

  return (
    <main>
      <PageHero eyebrow="INTERVIEW" title="インタビュー" lead="全国各地で挑戦する地元企業と、そこで生きる人たちのストーリー。" />
      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* カテゴリーフィルタ */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/interviews" className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!category ? "bg-brand-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>すべて</Link>
          {INTERVIEW_CATEGORIES.map((c) => (
            <Link key={c} href={`/interviews?category=${encodeURIComponent(c)}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? "bg-brand-600 text-white" : `${categoryColor(c)} hover:opacity-80`}`}>{c}</Link>
          ))}
        </div>
        {tag && <p className="mb-4 text-sm text-slate-500">タグ「<span className="font-semibold text-brand-600">#{tag}</span>」の記事：{items.length}件</p>}
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((iv) => <InterviewCard key={iv.id} iv={iv} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">該当する記事がありません。</div>
        )}
      </div>
    </main>
  );
}
