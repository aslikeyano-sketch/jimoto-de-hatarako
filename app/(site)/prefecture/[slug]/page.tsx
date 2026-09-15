import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fmtDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { prefBySlug } from "@/lib/prefectures-master";
import { Crumbs } from "@/components/ui";
import { InterviewCard } from "@/components/interview-card";
import { CompanyCard, ProjectCard, EventCard, OrgCard } from "@/components/cards";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.prefecture.findUnique({ where: { slug: params.slug } });
  if (!p) return { title: "都道府県" };
  const title = `${p.name}の地元企業・経営者インタビュー｜地元で働こう`;
  const description = p.catchcopy || `${p.name}で挑戦する企業・人のインタビュー。${p.name} 地元企業 / 経営者 / 地方創生 / Uターン。`;
  return { title, description, alternates: { canonical: `${SITE.url}/prefecture/${p.slug}` }, openGraph: { title, description } };
}

export default async function PrefPage({ params }: { params: { slug: string } }) {
  const pref = await prisma.prefecture.findUnique({ where: { slug: params.slug } });
  if (!pref) notFound();
  const w = { prefecture: params.slug, status: "published" };
  const [interviews, companies, projects, events, orgs, ivCount] = await Promise.all([
    prisma.interview.findMany({ where: w, orderBy: { publishedAt: "desc" } }),
    prisma.company.findMany({ where: w, orderBy: { publishedAt: "desc" } }),
    prisma.project.findMany({ where: w, orderBy: { publishedAt: "desc" } }),
    prisma.event.findMany({ where: w, orderBy: { createdAt: "desc" } }),
    prisma.organization.findMany({ where: w }),
    prisma.interview.count({ where: w }),
  ]);
  const people = new Set(interviews.map((i) => i.personName).filter(Boolean)).size;
  const master = prefBySlug(pref.slug);

  return (
    <main>
      <section className="hero-bg border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Crumbs items={[{ href: "/", label: "ホーム" }, { href: "/prefectures", label: "地域から探す" }, { label: pref.name }]} />
          <p className="brush text-sm font-semibold text-brand-600">{master?.region}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900 md:text-5xl">{pref.name}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">{pref.catchcopy || `${pref.name}を面白くしている企業と人たち。`}</p>
          {pref.intro && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{pref.intro}</p>}
          {/* 統計 */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Stat n={ivCount} label="取材件数" />
            <Stat n={companies.length} label="地元企業" />
            <Stat n={people} label="取材人物" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        {/* 最新インタビュー */}
        <Block title="インタビュー" empty="この地域はまだ準備中です。取材候補を募集しています。">
          {interviews.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{interviews.map((iv) => <InterviewCard key={iv.id} iv={iv} />)}</div>}
        </Block>

        {companies.length > 0 && (
          <Block title="地元企業"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{companies.map((c) => <CompanyCard key={c.id} c={c} />)}</div></Block>
        )}
        {projects.length > 0 && (
          <Block title="地域プロジェクト"><div className="grid gap-5 sm:grid-cols-2">{projects.map((p) => <ProjectCard key={p.id} p={p} />)}</div></Block>
        )}
        {events.length > 0 && (
          <Block title="東京で地元とつながる"><div className="grid gap-5 sm:grid-cols-2">{events.map((e) => <EventCard key={e.id} e={e} fmt={fmtDate} />)}</div></Block>
        )}
        {orgs.length > 0 && (
          <Block title="県人会・東京事務所・学生団体"><div className="grid gap-4 sm:grid-cols-3">{orgs.map((o) => <OrgCard key={o.id} o={o} />)}</div></Block>
        )}

        <div className="rounded-3xl bg-brand-50/60 p-8 text-center">
          <p className="text-lg font-bold text-navy-900">{pref.name}の企業・団体・行政の方へ</p>
          <p className="mt-1 text-sm text-slate-600">まだ知られていない{pref.name}の挑戦を、全国に届けませんか。取材・掲載は無料です。</p>
          <Link href="/inquiry" className="mt-4 inline-block rounded-full brand-gradient px-6 py-3 text-sm font-bold text-white shadow">取材・掲載を相談する →</Link>
        </div>
      </div>
    </main>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center shadow-card">
      <div className="text-2xl font-bold text-brand-600">{n}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function Block({ title, empty, children }: { title: string; empty?: string; children?: React.ReactNode }) {
  const has = Array.isArray(children) ? children.some(Boolean) : Boolean(children);
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-navy-900">{title}</h2>
      {has ? children : <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-400">{empty}</p>}
    </section>
  );
}
