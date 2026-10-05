import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { prefBySlug } from "@/lib/prefectures-master";
import { PageHero, Crumbs } from "@/components/ui";
import { ConnectForm } from "@/components/connect-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "この企業とつながる｜地元で働こう",
  description: "記事を読んで「もっと話を聞いてみたい」「一緒に仕事をしてみたい」と思った方へ。地元で働こうが企業との出会いをサポートします。",
  robots: { index: false, follow: true },
};

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: { article?: string; company?: string; pref?: string; type?: string; e?: string };
}) {
  const slug = searchParams.article ?? "";
  const iv = slug
    ? await prisma.interview.findFirst({
        where: { slug, status: "published" },
        select: { slug: true, title: true, companyName: true, prefecture: true },
      })
    : null;

  const companyTarget = iv?.companyName || searchParams.company || "";
  const articleTitle = iv?.title || "";
  const prefSlug = iv?.prefecture || searchParams.pref || "";
  const prefName = prefSlug ? prefBySlug(prefSlug)?.name ?? "" : "";

  return (
    <main>
      <PageHero
        eyebrow="CONNECT"
        title="この企業とつながる"
        lead="記事を読んで「もっと話を聞いてみたい」「一緒に仕事をしてみたい」と思った方へ。地元で働こうが、企業との出会いをサポートします。"
      />
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Crumbs
          items={[
            { href: "/", label: "ホーム" },
            ...(iv ? [{ href: `/interviews/${iv.slug}`, label: iv.title }] : []),
            { label: "この企業とつながる" },
          ]}
        />
        {searchParams.e && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">お名前とメールアドレスは必須です。</p>
        )}
        <ConnectForm
          interviewSlug={iv?.slug ?? slug}
          companyTarget={companyTarget}
          articleTitle={articleTitle}
          prefName={prefName}
          defaultType={searchParams.type ?? ""}
        />
        <p className="mt-6 text-center text-xs text-slate-400">
          いただいた内容は編集部が確認し、企業への橋渡しをいたします。営業目的の送信はご遠慮ください。
        </p>
      </div>
    </main>
  );
}
