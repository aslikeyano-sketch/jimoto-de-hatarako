import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { prefBySlug } from "@/lib/prefectures-master";
import { categoryColor, SITE } from "@/lib/constants";
import { fmtDate, mdToHtml } from "@/lib/utils";
import { InterviewCard } from "@/components/interview-card";
import { Crumbs } from "@/components/ui";

export const dynamic = "force-dynamic";

async function getIv(slug: string) {
  return prisma.interview.findFirst({ where: { slug, status: "published" } });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const iv = await getIv(params.slug);
  if (!iv) return { title: "記事が見つかりません" };
  const pref = prefBySlug(iv.prefecture);
  const title = iv.seoTitle || `${iv.title}｜${pref?.name ?? ""}のインタビュー｜地元で働こう`;
  const description = iv.seoDescription || iv.subtitle || SITE.description;
  return {
    title, description,
    alternates: { canonical: `${SITE.url}/interviews/${iv.slug}` },
    openGraph: { title, description, type: "article", images: iv.mainImage ? [iv.mainImage] : [] },
  };
}

const SECTIONS: { key: string; label: string }[] = [
  { key: "bodyAbout", label: "この会社について" },
  { key: "bodyWhyLocal", label: "この地域で事業をする理由" },
  { key: "bodyStart", label: "会社を始めたきっかけ" },
  { key: "bodyStrength", label: "地域だからこその強み" },
  { key: "bodyChallenge", label: "現在抱えている課題" },
  { key: "bodyFuture", label: "これから挑戦したいこと" },
  { key: "bodyLocalLove", label: "地元への想い" },
  { key: "bodyConnect", label: "東京・全国とつながるなら" },
  { key: "bodyMessage", label: "読者へのメッセージ" },
];

export default async function InterviewDetail({ params }: { params: { slug: string } }) {
  const iv = await getIv(params.slug);
  if (!iv) notFound();
  const pref = prefBySlug(iv.prefecture);
  const tags = (iv.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  const [samePref, sameCat] = await Promise.all([
    prisma.interview.findMany({ where: { prefecture: iv.prefecture, status: "published", NOT: { id: iv.id } }, orderBy: { publishedAt: "desc" }, take: 3 }),
    prisma.interview.findMany({ where: { category: iv.category, status: "published", NOT: { id: iv.id } }, orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);

  const comp = [
    ["代表者", iv.compRepresentative], ["所在地", iv.compAddress], ["設立", iv.compFounded],
    ["事業内容", iv.compBusiness], ["Webサイト", iv.compUrl], ["SNS", iv.compSns], ["採用情報", iv.compRecruit],
  ].filter(([, v]) => v);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: iv.title,
    datePublished: iv.publishedAt ?? undefined, author: { "@type": "Organization", name: SITE.operator },
    publisher: { "@type": "Organization", name: SITE.operator },
    about: pref?.name, articleSection: iv.category,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ヘッダー */}
      <section className="hero-bg border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <Crumbs items={[{ href: "/", label: "ホーム" }, { href: "/interviews", label: "インタビュー" }, ...(pref ? [{ href: `/prefecture/${pref.slug}`, label: pref.name }] : []), { label: iv.title }]} />
          <div className="flex flex-wrap items-center gap-2">
            {pref && <Link href={`/prefecture/${pref.slug}`} className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">{pref.name}{iv.city && ` ${iv.city}`}</Link>}
            {iv.category && <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColor(iv.category)}`}>{iv.category}</span>}
          </div>
          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-navy-900 md:text-4xl">{iv.title}</h1>
          {iv.subtitle && <p className="mt-3 text-base text-slate-600">{iv.subtitle}</p>}
          <div className="mt-4 text-sm text-slate-500">
            {iv.companyName && <span className="font-semibold text-navy-800">{iv.companyName}</span>}
            {iv.personName && <span className="ml-2">{iv.personRole && `${iv.personRole} `}{iv.personName}</span>}
          </div>
          {iv.publishedAt && <p className="mt-1 text-xs text-slate-400">{fmtDate(iv.publishedAt)}</p>}
        </div>
      </section>

      {/* メイン画像 */}
      <div className="mx-auto max-w-3xl px-5">
        <div className="-mt-2 mb-8 overflow-hidden rounded-2xl">
          {iv.mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iv.mainImage} alt={iv.title} className="aspect-[16/9] w-full object-cover" />
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-100 to-sky2-100"><span className="text-6xl opacity-70">🎤</span></div>
          )}
        </div>
      </div>

      {/* 本文 */}
      <article className="mx-auto max-w-3xl px-5 pb-6">
        <div className="prose-j">
          {SECTIONS.map((s) => {
            const v = (iv as any)[s.key] as string;
            if (!v) return null;
            return (
              <section key={s.key}>
                <h2>{s.label}</h2>
                <div dangerouslySetInnerHTML={{ __html: mdToHtml(v) }} />
              </section>
            );
          })}
        </div>

        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => <Link key={t} href={`/interviews?tag=${encodeURIComponent(t)}`} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">#{t}</Link>)}
          </div>
        )}

        {/* 企業プロフィール */}
        {comp.length > 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-bold text-navy-800">企業プロフィール</h3>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {comp.map(([k, v]) => (
                <div key={k} className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 font-semibold text-slate-500">{k}</dt>
                  <dd className="text-navy-800">
                    {String(k).includes("Web") || String(k).includes("SNS") || String(k).includes("採用") ?
                      <a href={String(v)} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">{String(v)}</a> : String(v)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </article>

      {/* 関連記事 */}
      {(samePref.length > 0 || sameCat.length > 0) && (
        <section className="bg-slate-50/70 py-12">
          <div className="mx-auto max-w-[1440px] px-5">
            {samePref.length > 0 && (
              <>
                <h2 className="mb-5 text-xl font-bold text-navy-900">同じ{pref?.name ?? "地域"}の記事</h2>
                <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{samePref.map((r) => <InterviewCard key={r.id} iv={r} />)}</div>
              </>
            )}
            {sameCat.length > 0 && (
              <>
                <h2 className="mb-5 text-xl font-bold text-navy-900">同じカテゴリーの記事</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sameCat.map((r) => <InterviewCard key={r.id} iv={r} />)}</div>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
