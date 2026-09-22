import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = {
  title: "取材を受けたい企業・団体の方へ",
  description: "「地元で働こう」は、東京にいる地元出身者へあなたの会社の魅力を届ける取材メディアです。取材・掲載は無料。採用・認知・地域とのつながりづくりにご活用ください。",
};

const MERITS = [
  { t:"東京の同郷者・若者に届く", d:"県人会ネットワークを通じて、地元を離れた出身者・Uターン層に直接届きます。採用の新しい入口に。" },
  { t:"取材・掲載は無料", d:"営業や販売が目的ではありません。まずは地元の魅力を伝える取材から。" },
  { t:"記事は自由に使える", d:"完成した記事は採用サイト・SNS・会社案内に活用いただけます。" },
];
const FLOW = [
  "お申し込み（フォーム）","日程調整","取材（対面またはオンライン・約60分）",
  "記事の作成（編集部が原稿化）","内容のご確認（公開前に必ずチェック）","公開・SNSで発信",
];
const QUESTIONS = [
  "どんな会社ですか？","なぜこの地域で事業をしているのですか？","会社の強みは？",
  "どんな未来を描いていますか？","どんな人と働きたいですか？","地元への想いは？",
  "東京にいる地元出身者へ伝えたいことは？",
];
const FAQ = [
  { q:"費用はかかりますか？", a:"取材・掲載は無料です。まずは地元の魅力を伝えることを目的としています。" },
  { q:"取材のあとに営業されませんか？", a:"取材＝営業ではありません。信頼関係づくりを最優先します。ご希望がない限り売り込みは行いません。" },
  { q:"経営や採用の内情が公開されませんか？", a:"公開するのは会社の魅力や想いのみ。売上・経営課題・連絡先などの内部情報は掲載しません。" },
  { q:"遠方でも取材できますか？", a:"オンライン取材に対応しています。全国どこでも可能です。" },
  { q:"掲載後に内容を直せますか？", a:"公開前に必ずご確認いただきます。公開後の修正も承ります。" },
];

export default function ForCompanies() {
  return (
    <main>
      <PageHero eyebrow="取材・掲載をご検討の企業・団体へ" title="あなたの会社を、東京にいる地元出身者へ。"
        lead="「地元で働こう」は、東京・都市部にいる地元出身者へ、地元企業の魅力を届ける取材メディアです。取材・掲載は無料。採用・認知・地域とのつながりに。" />
      <div className="mx-auto max-w-4xl px-5 py-10 space-y-14">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"取材を受けたい方へ"}]} />

        <section>
          <h2 className="text-2xl font-bold text-slate-900">取材を受けるメリット</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {MERITS.map(m=>(
              <div key={m.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900">{m.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">取材の流れ</h2>
          <ol className="mt-5 space-y-3">
            {FLOW.map((f,i)=>(
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white">{i+1}</span>
                <span className="pt-0.5 text-slate-700">{f}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">取材でお聞きすること</h2>
          <p className="mt-2 text-sm text-slate-500">難しい準備は不要です。お聞きするのは、会社の魅力と想いです。</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {QUESTIONS.map((q,i)=>(
              <li key={i} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"><span className="text-brand-500">Q{i+1}.</span>{q}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6">
          <h2 className="text-xl font-bold text-slate-900">安心してお受けいただくために</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>・<strong>取材＝営業ではありません。</strong>信頼関係づくりを最優先します。</li>
            <li>・<strong>公開前に必ず内容をご確認</strong>いただきます。</li>
            <li>・<strong>内部情報（売上・経営課題・連絡先等）は掲載しません。</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">よくあるご質問</h2>
          <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
            {FAQ.map((f,i)=>(
              <div key={i} className="p-5">
                <p className="font-bold text-slate-800">Q. {f.q}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">A. {f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl brand-gradient px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">まずは「取材を受けてみたい」から</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90">
            費用はかかりません。地元の想いを、東京にいる同郷者へ届けませんか。ご相談だけでも歓迎です。
          </p>
          <div className="mt-6"><CTAButton href="/inquiry" variant="white">取材・掲載を希望する</CTAButton></div>
        </section>
      </div>
    </main>
  );
}
