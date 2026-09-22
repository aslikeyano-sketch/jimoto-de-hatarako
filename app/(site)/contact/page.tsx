import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Crumbs } from "@/components/ui";
export const metadata: Metadata = { title: "お問い合わせ" };
const CARDS = [
  { href:"/for-companies", t:"取材・掲載を受けたい", d:"企業・団体・行政・大学・議員の方。取材趣意・流れはこちら。" },
  { href:"/inquiry", t:"取材・掲載を希望する（申込）", d:"掲載のお申し込み・ご相談フォーム。" },
  { href:"/submit", t:"情報提供・イベント掲載", d:"イベント・求人・地域ニュースなどの情報をお寄せください。" },
];
export default function Contact() {
  return (
    <main>
      <PageHero eyebrow="CONTACT" title="お問い合わせ" lead="ご用件に合わせてお選びください。" />
      <div className="mx-auto max-w-4xl px-5 py-12">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"お問い合わせ"}]} />
        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map(c=>(
            <Link key={c.href} href={c.href} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
              <p className="font-bold text-slate-900">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.d}</p>
              <p className="mt-3 text-sm font-semibold text-brand-600">進む →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
