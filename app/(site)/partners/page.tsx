import type { Metadata } from "next";
import { SITE, SPONSORS, TRUST_POINTS } from "@/lib/constants";
import { PageHero, Crumbs, CTAButton } from "@/components/ui";
export const metadata: Metadata = { title: "応援パートナー・この取り組みについて" };
export default function Partners() {
  return (
    <main>
      <PageHero eyebrow="PARTNERS" title="若者と地元をつなぐ取り組みを、みんなで応援。"
        lead="「地元で働こう」は、東京にいる地元出身の若者へ、地元の企業・人・挑戦を届けるメディアです。この動きに、企業・自治体・大学・県人会が賛同しています。" />
      <div className="mx-auto max-w-4xl px-5 py-12 space-y-14">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"応援パートナー"}]} />

        <section>
          <h2 className="text-2xl font-bold text-slate-900">私たちが大切にしていること</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {TRUST_POINTS.map(p=>(
              <div key={p.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">賛同・応援いただく企業</h2>
          <p className="mt-2 text-sm text-slate-500">若者と地元をつなぐ取り組みに賛同いただいています。</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {SPONSORS.map(s=>(
              <div key={s.name} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4">
                <span className="text-lg font-bold text-slate-700">{s.name}</span>
                <span className="text-xs text-slate-400">{s.note}</span>
                {!s.confirmed && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">協議中</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">※「協議中」は連携を調整中の企業です。確定後に正式掲載します。</p>
        </section>

        <section className="rounded-2xl bg-brand-50/60 p-6">
          <h2 className="text-xl font-bold text-slate-900">自治体・大学・県人会の皆さまへ</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Uターン・関係人口づくり、学生の地元企業との出会いづくりを、一緒に進めませんか。イベントの共催・情報発信・取材連携など、地域に合わせた形でご一緒します。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CTAButton href="/contact">連携について相談する</CTAButton>
            <CTAButton href="/editorial-policy" variant="outline">編集・中立方針を見る</CTAButton>
          </div>
        </section>
      </div>
    </main>
  );
}
