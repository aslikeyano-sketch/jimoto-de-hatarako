import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PageHero, Crumbs } from "@/components/ui";
export const metadata: Metadata = { title: "プライバシーポリシー" };
export default function Privacy() {
  return (
    <main>
      <PageHero eyebrow="PRIVACY" title="プライバシーポリシー" />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"プライバシーポリシー"}]} />
        <div className="prose-j">
          <p>{SITE.operator}（以下「当社」）は、「地元で働こう」（以下「本サービス」）における個人情報を、以下の方針に基づき適切に取り扱います。</p>
          <h2>取得する情報</h2>
          <p>お名前、ご連絡先、出身地、ご職業、ご興味・ご相談内容など、各種フォームでご入力いただく情報を取得します。</p>
          <h2>利用目的</h2>
          <ul>
            <li>地元の情報提供・ご案内、イベントやマッチングのご連絡</li>
            <li>取材・掲載・情報提供のご相談への対応</li>
            <li>本サービスの運営・改善、統計的分析</li>
          </ul>
          <h2>第三者提供</h2>
          <p>ご本人の同意がある場合、または法令に基づく場合を除き、個人情報を第三者に提供しません。</p>
          <h2>アクセス解析</h2>
          <p>本サービスは、利用状況の把握のためGoogle Analytics等を利用することがあります。取得される情報は個人を特定しない形で扱われます。</p>
          <h2>開示・訂正・削除</h2>
          <p>ご自身の個人情報の開示・訂正・削除をご希望の場合は、お問い合わせ窓口までご連絡ください。</p>
          <h2>改定</h2>
          <p>本ポリシーは必要に応じて改定することがあります。重要な変更は本ページでお知らせします。</p>
        </div>
      </div>
    </main>
  );
}
