import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/constants";
import { mdToHtml } from "@/lib/utils";
import { InterviewCard } from "@/components/interview-card";
import { Crumbs } from "@/components/ui";

export const dynamic = "force-dynamic";

async function getFeature(slug: string) {
  return prisma.feature.findFirst({ where: { slug, status: "published" } });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const f = await getFeature(params.slug);
  if (!f) return { title: "特集が見つかりません" };
  const title = f.seoTitle || `${f.title}｜特集｜地元で働こう`;
  const description = f.seoDescription || f.summary || SITE.description;
  return { title, description, alternates: { canonical: `${SITE.url}/features/${f.slug}` }, openGraph: { title, description } };
}

export default async function FeatureDetail({ params }: { params: { slug: string } }) {
  const f = await getFeature(params.slug);
  if (!f) notFound();
  // 紐づくタグに一致するインタビューを表示
  const tags = (f.relatedTags ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  const related = tags.length
    ? await prisma.interview.findMany({ where: { status: "published", OR: tags.map((t) => ({ tags: { contains: t } })) }, orderBy: { publishedAt: "desc" }, take: 6 })
    : [];

  return (
    <main>
      <section className="hero-bg border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-5 py-12">
          <Crumbs items={[{ href: "/", label: "ホーム" }, { href: "/features", label: "特集" }, { label: f.title }]} />
          {f.theme && <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">{f.theme}</span>}
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy-900 md:text-4xl">{f.title}</h1>
          {f.subtitle && <p className="mt-3 text-base text-slate-600">{f.subtitle}</p>}
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-5 py-10">
        {f.summary && <p className="mb-6 rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">{f.summary}</p>}
        {f.body && <div className="prose-j" dangerouslySetInnerHTML={{ __html: mdToHtml(f.body) }} />}
      </article>
      {related.length > 0 && (
        <section className="bg-slate-50/70 py-12">
          <div className="mx-auto max-w-[1440px] px-5">
            <h2 className="mb-5 text-xl font-bold text-navy-900">この特集の記事</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((iv) => <InterviewCard key={iv.id} iv={iv} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
