import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { prefBySlug } from "@/lib/prefectures-master";
import { categoryColor } from "@/lib/constants";
import { fmtDate, mdToHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

// 公開前の記事を、鍵を知っている人だけが確認できる非公開プレビュー。
// 公開サイト（一覧・TOP・県ページ・検索・直リンク）には status:"draft" のため一切出ません。
const PREVIEW_KEY = process.env.PREVIEW_KEY || "57ae39f76010eb1401";

// 検索エンジンには一切載せない
export const metadata: Metadata = {
  title: "プレビュー（非公開）｜地元で働こう",
  robots: { index: false, follow: false, nocache: true },
};

async function getIv(slug: string) {
  // status を問わず取得（下書きも含む）
  return prisma.interview.findUnique({ where: { slug } });
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

export default async function InterviewPreview({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { key?: string };
}) {
  // 鍵が一致しない場合は存在しないものとして扱う
  if (searchParams.key !== PREVIEW_KEY) notFound();
  const iv = await getIv(params.slug);
  if (!iv) notFound();
  const pref = prefBySlug(iv.prefecture);
  const tags = (iv.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);

  const comp = [
    ["代表者", iv.compRepresentative], ["所在地", iv.compAddress], ["設立", iv.compFounded],
    ["事業内容", iv.compBusiness], ["Webサイト", iv.compUrl], ["SNS", iv.compSns], ["採用情報", iv.compRecruit],
  ].filter(([, v]) => v);

  return (
    <main>
      {/* プレビュー注記バナー */}
      <div className="sticky top-0 z-40 bg-amber-500 px-5 py-2 text-center text-sm font-bold text-white">
        プレビュー（非公開）— このページはまだ一般公開されていません。確認用リンクです。
        <span className="ml-2 rounded-full bg-white/25 px-2 py-0.5 text-xs">
          {iv.status === "published" ? "公開中" : "下書き"}
        </span>
      </div>

      {/* ヘッダー */}
      <section className="hero-bg border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <div className="flex flex-wrap items-center gap-2">
            {pref && <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">{pref.name}{iv.city && ` ${iv.city}`}</span>}
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
      <article className="mx-auto max-w-3xl px-5 pb-12">
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
            {tags.map((t) => <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">#{t}</span>)}
          </div>
        )}

        {/* 企業プロフィール */}
        {comp.length > 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-bold text-navy-800">プロフィール</h3>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {comp.map(([k, v]) => (
                <div key={k} className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 font-semibold text-slate-500">{k}</dt>
                  <dd className="text-navy-800">{String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-slate-400">
          修正のご希望があればお知らせください。問題なければこのまま公開します。
        </p>
      </article>
    </main>
  );
}
