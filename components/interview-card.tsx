import Link from "next/link";
import { prefBySlug } from "@/lib/prefectures-master";
import { categoryColor } from "@/lib/constants";
import { fmtDate } from "@/lib/utils";

type IV = {
  slug: string; prefecture: string; title: string; subtitle?: string; mainImage?: string;
  companyName?: string; personName?: string; personRole?: string; category?: string;
  tags?: string; publishedAt?: Date | string | null;
};

// カテゴリ別プレースホルダー（青系グラデ＋絵文字）
const CAT_VISUAL: Record<string, { grad: string; emoji: string }> = {
  "地元企業・経営者": { grad: "from-brand-100 to-sky2-100", emoji: "🏭" },
  "自治体・行政": { grad: "from-navy-100 to-brand-50", emoji: "🏛️" },
  "地域プレイヤー": { grad: "from-sky2-100 to-brand-50", emoji: "✨" },
  "若者・学生": { grad: "from-indigo-100 to-sky2-100", emoji: "🎓" },
  "Uターン・移住者": { grad: "from-emerald-100 to-sky2-100", emoji: "🧭" },
  "東京から地元に関わる人": { grad: "from-cyan-100 to-brand-50", emoji: "🗼" },
  "地域プロジェクト": { grad: "from-amber-100 to-sky2-100", emoji: "🌱" },
};
const visual = (c?: string) => CAT_VISUAL[c ?? ""] ?? { grad: "from-brand-100 to-sky2-100", emoji: "📍" };

export function InterviewCard({ iv, compact = false }: { iv: IV; compact?: boolean }) {
  const pref = prefBySlug(iv.prefecture);
  const v = visual(iv.category);
  const tags = (iv.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 3);
  return (
    <Link
      href={`/interviews/${iv.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg ${compact ? "min-w-[260px]" : ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {iv.mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iv.mainImage} alt={iv.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${v.grad}`}>
            <span className="text-5xl opacity-80">{v.emoji}</span>
          </div>
        )}
        {pref && (
          <span className="absolute left-0 top-3 rounded-r-full bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow">
            {pref.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-navy-900 group-hover:text-brand-700">{iv.title}</h3>
        {(iv.companyName || iv.personName) && (
          <p className="mt-2 text-xs text-slate-500">
            {iv.companyName}
            {iv.personName && <span className="ml-1 text-slate-600">／{iv.personRole ? `${iv.personRole} ` : ""}{iv.personName}</span>}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          {iv.category && <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryColor(iv.category)}`}>{iv.category}</span>}
          {tags.map((t) => (
            <span key={t} className="text-[11px] text-brand-600">#{t}</span>
          ))}
        </div>
        {iv.publishedAt && <p className="mt-2 text-[11px] text-slate-400">{fmtDate(iv.publishedAt)}</p>}
      </div>
    </Link>
  );
}
