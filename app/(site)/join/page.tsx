import type { Metadata } from "next";
import { RELATION_WAYS } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = { title: "地元との関わり方" };
export default function Join() {
  return (
    <main>
      <PageHero eyebrow="関わる" title="地元との関わり方" lead="地方に戻ることだけが地方創生じゃない。あなたに合った関わり方を、一つでも増やそう。" />
      <div className="mx-auto max-w-5xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"地元に関わる"}]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATION_WAYS.map(w=>(
            <div key={w.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-bold text-slate-900">{w.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-3xl brand-gradient px-6 py-10 text-center text-white">
          <p className="text-xl font-bold">まずは「地元と関わりたい」を登録</p>
          <p className="mt-2 text-sm text-white/90">出身地と興味を教えてください。合う企業・活動・イベントをご案内します。</p>
          <div className="mt-5"><CTAButton href="/register" variant="white">登録する（無料）</CTAButton></div>
        </div>
      </div>
    </main>
  );
}
