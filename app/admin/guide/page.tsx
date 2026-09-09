import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
export const dynamic = "force-dynamic";
export const metadata = { title: "取材質問票", robots: { index: false } };

const GUIDES = [
  {
    key: "企業取材", lead: "地元にこんな会社がある。",
    open: ["どんな会社ですか？", "なぜこの地域で事業をしているのですか？", "会社の強みは？", "どんな未来を描いていますか？", "どんな人と働きたいですか？", "地元への想いは？", "東京にいる地元出身者へ伝えたいことは？"],
    crm: ["採用に困っているか", "AI/DXを導入しているか", "SNSに課題があるか", "東京販路を広げたいか", "営業に課題があるか", "新規事業を考えているか", "事業承継の予定はあるか", "その他の経営課題"],
  },
  {
    key: "人物取材", lead: "地元にこんな面白い人がいる。",
    open: ["これまでの歩みと、今の活動は？", "この地域で活動する理由は？", "大切にしている想いは？", "これから挑戦したいことは？", "東京にいる地元出身者へのメッセージは？"],
    crm: ["連絡先・SNS", "紹介できる企業・人はいるか", "Roots Nextと連携したいことは何か", "非公開にしたい情報はあるか"],
  },
  {
    key: "議員・行政取材", lead: "地域にはこんな課題・未来構想がある。（超党派・選挙期間は掲載しない）",
    open: ["この地域の一番大きな課題は何ですか？", "若者流出についてどう考えていますか？", "地元企業の課題は何ですか？", "東京にいる県出身者に期待することは？", "民間企業や県人会とどんな連携ができますか？", "今後この地域をどうしていきたいですか？", "若者に参加してほしい活動はありますか？"],
    crm: ["連絡先・秘書窓口", "連携可能な行政施策・予算", "紹介できる自治体・企業・団体", "非公開希望の内容"],
  },
  {
    key: "プロジェクト取材", lead: "地元でこんな挑戦が始まっている。",
    open: ["どんな課題に取り組んでいますか？", "なぜ始めたのですか？", "現在どこまで進んでいますか？", "今後の目標は？", "どんな仲間・協力を求めていますか？", "参加方法は？"],
    crm: ["主催者の連絡先", "資金・人材の不足", "行政/企業/大学との連携希望", "Roots Nextへの相談事項"],
  },
];

export default function Guide() {
  requireAdmin();
  return (
    <AdminShell active="guide">
      <h1 className="mb-2 text-xl font-bold text-slate-900">取材質問票（全国共通フォーマット）</h1>
      <p className="mb-6 text-sm text-slate-500">取材の品質を全国で統一するための質問集。<strong className="text-slate-700">公開用</strong>は記事に載せる質問、<strong className="text-rose-600">内部CRM用</strong>はサイトに載せず地域CRMに記録する質問です（§14/§44）。取材＝営業ではありません。まず信頼形成を。</p>
      <div className="grid gap-5 lg:grid-cols-2">
        {GUIDES.map((g) => (
          <div key={g.key} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">{g.key}</h2>
            <p className="mt-0.5 text-xs text-brand-600">{g.lead}</p>
            <p className="mt-4 text-sm font-semibold text-slate-700">公開用の質問（記事になる）</p>
            <ol className="mt-2 space-y-1.5">
              {g.open.map((q, i) => <li key={i} className="flex gap-2 text-sm text-slate-600"><span className="text-brand-500">Q{i + 1}.</span>{q}</li>)}
            </ol>
            <p className="mt-4 text-sm font-semibold text-rose-600">内部CRM用（サイト非公開）</p>
            <ul className="mt-2 space-y-1.5">
              {g.crm.map((q, i) => <li key={i} className="flex gap-2 text-sm text-slate-500"><span className="text-rose-400">・</span>{q}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <p className="font-bold text-slate-800">取材のワークフロー（§39）</p>
        <p className="mt-2">申込・紹介 → アポ → 取材（対面/オンライン） → 記事化（AI下書き＋編集） → <strong>先方確認</strong> → 公開 → SNS/LINE展開 → 内部課題を地域CRMに登録 → 本部が支援可能性を判断（必要な場合のみ提案）。</p>
      </div>
    </AdminShell>
  );
}
