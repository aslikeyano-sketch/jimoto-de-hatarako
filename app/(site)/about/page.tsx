import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = { title: "Roots Nextについて" };
export default function About() {
  return (
    <main>
      <PageHero eyebrow="ABOUT" title="「地元で働こう」について" lead={SITE.tagline} />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"運営について"}]} />
        <div className="prose-j">
          <h2>このサイトの役割</h2>
          <p>{SITE.description}</p>
          <p>単なる求人サイトではありません。「地元にこんな企業・人・活動があると初めて知った」——そんな出会いを、東京にいる同郷者に届けます。</p>
          <h2>3つの価値</h2>
          <ul>
            <li><strong>あなた（東京の同郷者）</strong>：地元との新しい関わり方が見つかる。</li>
            <li><strong>地域（企業・行政・大学・地域プレイヤー）</strong>：東京の同郷者へ、自分たちの活動を届けられる。</li>
            <li><strong>Roots Next</strong>：全国各地との信頼関係と地域データが蓄積される。</li>
          </ul>
          <h2>入口は「取材・紹介」から</h2>
          <p>企業・行政・大学・議員の方へは、営業ではなく、まず取材・紹介・情報発信・イベント連携からご一緒します。信頼形成を最優先します。</p>
          <h2>県人会 → メディア → 地域づくり</h2>
          <p>Roots Nextは、県人会を起点に、地域の企業・人・行政・大学・学生・地域課題と継続的につながる基盤づくりを進めています。</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <CTAButton href="/inquiry">取材・掲載を希望する</CTAButton>
          <CTAButton href="/register" variant="outline">地元と関わりたい人登録</CTAButton>
        </div>
      </div>
    </main>
  );
}
