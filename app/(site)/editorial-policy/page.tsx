import type { Metadata } from "next";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = { title: "編集・取材方針" };
export default function EditorialPolicy() {
  return (
    <main>
      <PageHero eyebrow="EDITORIAL POLICY" title="編集・取材方針" lead="地域と読者、双方の信頼に責任を持つために。私たちの取材・編集の約束です。" />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"編集・取材方針"}]} />
        <div className="prose-j">
          <h2>私たちの約束</h2>
          <ul>
            <li><strong>取材＝営業ではありません。</strong>取材のあとに強引な売り込みはしません。信頼関係づくりを最優先します。</li>
            <li><strong>公開前に必ずご確認いただきます。</strong>取材先の意図と異なる記事は出しません。</li>
            <li><strong>非公開情報は掲載しません。</strong>売上・経営課題・採用課題・連絡先など、取材先が公開を望まない情報は載せません。</li>
            <li><strong>誇張や事実と異なる表現をしません。</strong>一次情報（ご本人の言葉）を大切にします。</li>
            <li><strong>掲載は無料です。</strong>掲載順位を金銭で操作することはしません。</li>
          </ul>
          <h2>議員・行政インタビューの中立</h2>
          <ul>
            <li>特定の政党・候補者を支持・推薦しません。会派を問わず、地域課題・地方創生の視点で等しく扱います。</li>
            <li>選挙運動には利用しません。選挙期間中の新規掲載は行いません。</li>
            <li>行政の公認・お墨付きを意味するものではありません。</li>
          </ul>
          <h2>AIの活用</h2>
          <p>取材音声の文字起こしや記事下書きにAIを活用する場合があります。ただし、<strong>AIが作成した内容をそのまま公開することはありません。</strong>編集部が事実確認・加筆し、取材先の確認を経て公開します。</p>
          <h2>訂正・削除</h2>
          <p>誤りのご指摘や掲載内容の修正・削除のご希望は、お問い合わせ窓口で承ります。速やかに対応します。</p>
        </div>
        <div className="mt-10"><CTAButton href="/for-companies">取材を受けたい方へ</CTAButton></div>
      </div>
    </main>
  );
}
