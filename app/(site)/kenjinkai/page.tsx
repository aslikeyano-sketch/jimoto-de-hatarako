import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { prefBySlug } from "@/lib/prefectures-master";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "県人会｜地元で働こう",
  description: "東京・都市部にいる同郷者をつなぐ県人会ネットワーク。Roots Nextが各県の県人会と連携し、地元と関わり続ける入口をつくります。",
};

export default async function KenjinkaiPage() {
  const orgs = await prisma.organization.findMany({ where: { status: "published", type: "県人会" }, orderBy: { prefecture: "asc" } });
  return (
    <main>
      <PageHero eyebrow="県人会ネットワーク" title="県人会" lead="東京にいても、地元とつながり続ける。Roots Nextは全国の県人会と連携し、同郷のつながりを地元への貢献につなげます。" />
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        {orgs.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orgs.map((o) => {
              const pref = prefBySlug(o.prefecture);
              return (
                <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                  {pref && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{pref.name}</span>}
                  <h3 className="mt-2 font-bold text-navy-900">{o.name}</h3>
                  {o.purpose && <p className="mt-1 text-sm text-slate-500">{o.purpose}</p>}
                  {o.area && <p className="mt-2 text-xs text-slate-400">活動地域：{o.area}</p>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">県人会情報は準備中です。</div>
        )}

        <div className="mt-10 rounded-3xl bg-navy-900 px-8 py-10 text-center text-white">
          <h2 className="text-xl font-bold">県人会の運営者・参加希望の方へ</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80">全国の県人会と連携し、地元企業の紹介・取材・採用・地域プロジェクトへとつなげています。連携・掲載のご相談はお気軽に。</p>
          <Link href="/contact" className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-900">お問い合わせ →</Link>
        </div>
      </div>
    </main>
  );
}
