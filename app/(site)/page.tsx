import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SITE, RELATION_WAYS, SPONSORS } from "@/lib/constants";
import { fmtDate } from "@/lib/utils";
import { CTAButton } from "@/components/ui";
import { CompanyCard, PersonCard, ProjectCard, EventCard, OrgCard } from "@/components/cards";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [prefs, companies, people, projects, events, studentGroups] = await Promise.all([
    prisma.prefecture.findMany({ where:{published:true}, orderBy:{name:"asc"} }),
    prisma.company.findMany({ where:{status:"published"}, orderBy:{publishedAt:"desc"}, take:3 }),
    prisma.person.findMany({ where:{status:"published"}, orderBy:{publishedAt:"desc"}, take:4 }),
    prisma.project.findMany({ where:{status:"published"}, orderBy:{publishedAt:"desc"}, take:2 }),
    prisma.event.findMany({ where:{status:"published"}, orderBy:{createdAt:"desc"}, take:2 }),
    prisma.organization.findMany({ where:{status:"published", type:"学生団体"}, take:3 }),
  ]);

  return (
    <main>
      {/* FV */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50 via-amber-50/40 to-white" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-sm font-semibold text-brand-600">{SITE.sub}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">{SITE.tagline}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            東京へ出たからこそ分かる地元の魅力と、もう一度つながる場所。あなたと地元の、新しい関わり方を見つけよう。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/prefectures">自分の地元を探す</CTAButton>
            <CTAButton href="/companies" variant="outline">地元の社長に会う</CTAButton>
          </div>
        </div>
      </section>

      {/* 信頼バー */}
      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-xs text-slate-500">
          <span>運営：<strong className="text-slate-700">株式会社Roots Next</strong></span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span>県人会ネットワーク発</span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span>掲載は<strong className="text-slate-700">無料</strong>・取材＝営業ではありません</span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <Link href="/editorial-policy" className="font-semibold text-brand-600 hover:text-brand-700">編集・取材方針</Link>
        </div>
      </section>

      {/* 応援パートナー（賛同企業） */}
      <section className="mx-auto max-w-6xl px-5 py-8">
        <p className="text-center text-xs font-semibold tracking-wide text-slate-400">この取り組みに賛同・応援いただく企業</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {SPONSORS.map((s) => (
            <div key={s.name} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-base font-bold text-slate-700">{s.name}</span>
              <span className="text-[10px] text-slate-400">{s.note}</span>
              {!s.confirmed && <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">協議中</span>}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">若者と地元をつなぐ動きに、企業・自治体・大学が賛同しています。</p>
      </section>

      {/* 都道府県から探す */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">都道府県から探す</h2>
          <Link href="/prefectures" className="text-sm font-semibold text-brand-600 hover:text-brand-700">すべて →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {prefs.map((p)=>(
            <Link key={p.id} href={`/prefecture/${p.slug}`} className="rounded-xl border border-slate-200 bg-white px-3 py-4 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">{p.name}</Link>
          ))}
        </div>
      </section>

      {/* 地元の社長に会う */}
      <Section title="地元の社長に会う" sub="東京にいるあなたへ。地元で挑戦する社長のインタビュー。" more="/companies">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{companies.map(c=><CompanyCard key={c.id} c={c} />)}</div>
      </Section>

      {/* 地元を変える人 */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-5">
          <Head title="地元を変える人" more="/people" />
          <div className="grid gap-4 sm:grid-cols-2">{people.map(p=><PersonCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      {/* プロジェクト */}
      <Section title="地方創生プロジェクト" more="/projects">
        <div className="grid gap-5 sm:grid-cols-2">{projects.map(p=><ProjectCard key={p.id} p={p} />)}</div>
      </Section>

      {/* 東京イベント */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-5">
          <Head title="東京で開催される地元イベント" more="/events" />
          <div className="grid gap-5 sm:grid-cols-2">{events.map(e=><EventCard key={e.id} e={e} fmt={fmtDate} />)}</div>
        </div>
      </section>

      {/* 関わり方 */}
      <Section title="地元との関わり方" sub="地方移住だけが地方創生じゃない。">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {RELATION_WAYS.map((w)=>(
            <div key={w.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-bold text-slate-900">{w.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 学生・若者 */}
      {studentGroups.length>0 && (
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-6xl px-5">
            <Head title="学生・若者の活動" more="/organizations" />
            <div className="grid gap-4 sm:grid-cols-3">{studentGroups.map(o=><OrgCard key={o.id} o={o} />)}</div>
          </div>
        </section>
      )}

      {/* 登録・取材CTA */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl brand-gradient px-6 py-10 text-white">
            <h3 className="text-xl font-bold">地元と関わりたい人へ</h3>
            <p className="mt-2 text-sm text-white/90">出身地を登録すると、あなたの地元の企業・イベント・県人会情報が届きます。</p>
            <div className="mt-5"><CTAButton href="/register" variant="white">登録する（無料）</CTAButton></div>
          </div>
          <div className="rounded-3xl border-2 border-brand-200 bg-brand-50/50 px-6 py-10">
            <h3 className="text-xl font-bold text-slate-900">企業・団体・行政の方へ</h3>
            <p className="mt-2 text-sm text-slate-600">「東京の同郷者へ、地元の魅力を伝えたい」——取材・掲載でお手伝いします。営業ではなく、まず紹介から。</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CTAButton href="/inquiry">取材・掲載を希望する</CTAButton>
              <CTAButton href="/submit" variant="outline">情報提供・イベント掲載</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Roots Next */}
      <section className="mx-auto max-w-4xl px-5 pb-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">「地元で働こう」について</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          県人会を起点に、地方の企業・人・行政・大学・学生・地域活動と、東京にいる同郷者をつなぐ。Roots Nextが運営する地域接続プラットフォームです。
        </p>
        <div className="mt-5"><CTAButton href="/about" variant="outline">運営について</CTAButton></div>
      </section>
    </main>
  );
}

function Head({ title, sub, more }:{ title:string; sub?:string; more?:string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div><h2 className="text-2xl font-bold text-slate-900">{title}</h2>{sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}</div>
      {more && <Link href={more} className="text-sm font-semibold text-brand-600 hover:text-brand-700">すべて →</Link>}
    </div>
  );
}
function Section({ title, sub, more, children }:{ title:string; sub?:string; more?:string; children:React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <Head title={title} sub={sub} more={more} />
      {children}
    </section>
  );
}
