import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = { title: "運営会社（会社概要）" };
const ROWS: [string,string][] = [
  ["会社名","株式会社Roots Next（Roots Next Inc.）"],
  ["代表取締役","水田 香菜枝"],
  ["所在地","東京都町田市三輪町 233番地1 C棟"],
  ["事業内容","地域接続メディア「地元で働こう」の運営／地方創生県人会の運営／地方企業と東京の人材・企業のマッチング支援／自治体・大学・地域団体との連携／採用・DX・販路開拓など地域企業支援"],
  ["運営メディア","地元で働こう／地方創生県人会 ほか"],
];
export default function Company() {
  return (
    <main>
      <PageHero eyebrow="COMPANY" title="運営会社" lead="「地元で働こう」は株式会社Roots Nextが運営しています。" />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"運営会社"}]} />
        <div className="prose-j">
          <h2>私たちについて</h2>
          <p>株式会社Roots Nextは、<strong>県人会</strong>を起点に、東京・都市部にいる地方出身者と、地元の企業・人・行政・大学・学生・地域活動をつなぐ会社です。「地元で働こう」は、その出会いを届ける地域接続メディアです。</p>
          <p>私たちは単なる求人や紹介ではなく、地域との継続的な信頼関係づくりを大切にしています。企業・行政・団体の方へは、営業ではなく取材・紹介・情報発信からご一緒します。</p>
        </div>
        <h2 className="mt-10 text-xl font-bold text-slate-900">会社概要</h2>
        <dl className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 text-sm">
          {ROWS.map(([k,v])=>(
            <div key={k} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4"><dt className="shrink-0 font-semibold text-slate-600 sm:w-32">{k}</dt><dd className="text-slate-700">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <CTAButton href="/for-companies">取材を受けたい方へ</CTAButton>
          <CTAButton href="/contact" variant="outline">お問い合わせ</CTAButton>
        </div>
      </div>
    </main>
  );
}
