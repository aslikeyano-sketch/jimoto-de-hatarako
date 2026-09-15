import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "特集｜地元で働こう", description: "テーマで読み解く、地域とこれからの仕事の特集記事。" };

export default async function FeaturesPage() {
  const features = await prisma.feature.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } });
  return (
    <main>
      <PageHero eyebrow="FEATURE" title="特集" lead="地方×若者、地方×AI、Uターン経営者——テーマで読み解く、地域とこれからの仕事。" />
      <div className="mx-auto max-w-6xl px-5 py-10">
        {features.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link key={f.id} href={`/features/${f.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-navy-100 to-sky2-100"><span className="text-5xl opacity-80">📰</span></div>
                <div className="p-5">
                  {f.theme && <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-semibold text-navy-700">{f.theme}</span>}
                  <h2 className="mt-2 text-lg font-bold leading-snug text-navy-900 group-hover:text-brand-700">{f.title}</h2>
                  {f.subtitle && <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>}
                  {f.summary && <p className="mt-2 line-clamp-2 text-xs text-slate-400">{f.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">特集は準備中です。</p>}
      </div>
    </main>
  );
}
