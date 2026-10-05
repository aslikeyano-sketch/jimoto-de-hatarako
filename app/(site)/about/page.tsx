import type { Metadata } from "next";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "「地元で働こう」について",
  description: "地方には、知られていないだけの会社がたくさんある。「地元で働こう」は、地元を想う人と、地元で挑戦する企業をつなぐメディアです。運営：株式会社Roots Next。",
};

const VALUES = [
  { n: "01", who: "地元を離れた人", h: "地元との新しい関わり方に出会える。", d: "転職だけではなく、副業、協業、イベントなど、自分に合った方法で地元と関われます。" },
  { n: "02", who: "地域企業", h: "地元を想う人に、自社を知ってもらえる。", d: "事業だけではなく、経営者の想いや地域への想いまで届けます。" },
  { n: "03", who: "地域", h: "人・仕事・挑戦が循環する。", d: "地域の内と外がつながることで、新しい仕事やプロジェクトが生まれます。" },
];

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT"
        title="なぜ「地元で働こう」をつくったのか。"
        lead="地元を想う人と、地元で挑戦する企業をつなぐ。まず「知る」ことから、新しい仕事や出会いが生まれていく。"
      />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Crumbs items={[{ href: "/", label: "ホーム" }, { label: "ABOUT" }]} />

        {/* §18 冒頭メッセージ */}
        <div className="prose-j">
          <h2>地方には、知られていないだけの会社がたくさんある。</h2>
          <p>東京に出て初めて、地元の良さに気づく人がいます。「いつか地元に関わりたい。」そう思っていても、どんな会社があるのか。どんな仕事があるのか。どんな人が挑戦しているのか。知らない人は少なくありません。</p>
          <p>一方で地方には、「もっと若い人に会社を知ってほしい。」「都市部へ販路を広げたい。」「新しい人と一緒に挑戦したい。」と考えている企業があります。でも、その両者はまだ十分に出会えていません。</p>
          <p>だから私たちは、まず<strong>「知る」ことから始めます。</strong>企業を知る。人を知る。仕事を知る。地域を知る。そこから、新しい仕事や出会いが生まれていく。</p>
          <p><strong>「地元で働こう」は、地元を想う人と、地元で挑戦する企業をつなぐメディアです。</strong></p>
        </div>

        {/* §19 3つの価値（ユーザー視点） */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight text-navy-900">「地元で働こう」が届ける、3つの価値</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="text-sm font-bold text-brand-500">{v.n}</span>
              <p className="mt-1 text-xs font-semibold text-slate-400">{v.who}</p>
              <h3 className="mt-2 font-bold leading-snug text-navy-900">{v.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.d}</p>
            </div>
          ))}
        </div>

        {/* 転職だけじゃない */}
        <div className="mt-12 rounded-2xl bg-slate-50 p-6">
          <h3 className="text-base font-bold text-navy-800">「地元と関わる」は、転職だけではありません。</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            副業で関わる。プロジェクトに参加する。企業として協業する。地元の商品を買う。イベントに参加する。
            東京にいながら、自分に合った形で地元とつながれます。
          </p>
        </div>

        {/* §20 Roots Next 説明 */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-bold text-navy-800">運営：Roots Next</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            <strong>東京と地域をつなぎ、新しい仕事と出会いをつくる地方創生プロジェクト。</strong>
            県人会、地域イベント、企業支援、販路開拓などを通じて、地域と都市部の新しい関係づくりを行っています。
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <CTAButton href="/for-companies">無料取材を申し込む</CTAButton>
          <CTAButton href="/interviews" variant="outline">インタビューを読む</CTAButton>
        </div>
      </div>
    </main>
  );
}
