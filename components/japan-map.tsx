"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import { PREF_SHAPES, MAP_VIEWBOX, MAP_OUTER_TRANSFORM, MAP_INNER_TRANSFORM } from "@/lib/japan-map-data";
import { mapFill, MAP_TIERS } from "@/lib/constants";

// 県ごとの重心（inner-group座標系）を算出：translate(dx,dy) + 全ポリゴン点の平均
function centroidOf(inner: string, transform: string): { x: number; y: number } {
  let dx = 0, dy = 0;
  const t = transform.match(/translate\(\s*([\d.-]+)[ ,]+([\d.-]+)\s*\)/);
  if (t) { dx = parseFloat(t[1]); dy = parseFloat(t[2]); }
  const nums = (inner.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  let sx = 0, sy = 0, n = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) { sx += nums[i]; sy += nums[i + 1]; n++; }
  return n ? { x: dx + sx / n, y: dy + sy / n } : { x: dx, y: dy };
}
const CENTROIDS: Record<string, { x: number; y: number }> = {};
PREF_SHAPES.forEach((p) => (CENTROIDS[p.slug] = centroidOf(p.inner, p.transform)));

const PALE = "#eaeff5";
const LIT = "#2563eb";

export function JapanMap({ counts }: { counts: Record<string, number> }) {
  const router = useRouter();
  const [tip, setTip] = useState<{ name: string; count: number; x: number; y: number } | null>(null);
  const [lit, setLit] = useState<Set<string>>(new Set());
  const [settled, setSettled] = useState(false);

  // 取材件数の多い順（点灯・Pulse・光の線の起点に使う）
  const ranked = useMemo(
    () => Object.entries(counts).filter(([, c]) => c > 0).sort((a, b) => b[1] - a[1]).map(([s]) => s),
    [counts]
  );
  const revealOrder = useMemo(() => {
    // 大分→宮崎→福岡→北海道→東京 のような“地方から”の流れを優先しつつ件数上位を採用
    const pref = ["oita", "miyazaki", "fukuoka", "hokkaido", "tokyo"].filter((s) => (counts[s] ?? 0) > 0);
    const rest = ranked.filter((s) => !pref.includes(s));
    return [...pref, ...rest].slice(0, 6);
  }, [ranked, counts]);

  // ページ表示時：淡色 → 取材県が順に点灯 → 実際の件数色へ収束
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setSettled(true); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    revealOrder.forEach((slug, i) => {
      timers.push(setTimeout(() => setLit((prev) => new Set(prev).add(slug)), 500 + i * 420));
    });
    timers.push(setTimeout(() => setSettled(true), 500 + revealOrder.length * 420 + 500));
    return () => timers.forEach(clearTimeout);
  }, [revealOrder]);

  const fillFor = (slug: string, count: number) => (settled ? mapFill(count) : lit.has(slug) ? LIT : PALE);

  const onMove = useCallback((e: React.MouseEvent, name: string, count: number) => {
    const box = (e.currentTarget.closest("[data-map]") as HTMLElement)?.getBoundingClientRect();
    if (!box) return;
    setTip({ name, count, x: e.clientX - box.left, y: e.clientY - box.top });
  }, []);

  // 光の線：地方上位3県 → 東京
  const tokyo = CENTROIDS["tokyo"];
  const lineSources = useMemo(
    () => ranked.filter((s) => s !== "tokyo").slice(0, 3).map((s) => CENTROIDS[s]).filter(Boolean),
    [ranked]
  );
  const pulseSlugs = ranked.slice(0, 3);

  return (
    <div className="relative" data-map>
      <svg viewBox={MAP_VIEWBOX} className="jp-map h-auto w-full" role="img" aria-label="日本地図から都道府県を選ぶ">
        <g transform={MAP_OUTER_TRANSFORM}>
          <g transform={MAP_INNER_TRANSFORM}>
            {PREF_SHAPES.map((p) => {
              const count = counts[p.slug] ?? 0;
              return (
                <g
                  key={p.code}
                  className="pref"
                  fill={fillFor(p.slug, count)}
                  transform={p.transform}
                  role="link"
                  tabIndex={0}
                  aria-label={`${p.name} 取材${count}件`}
                  onClick={() => router.push(`/prefecture/${p.slug}`)}
                  onKeyDown={(e) => { if (e.key === "Enter") router.push(`/prefecture/${p.slug}`); }}
                  onMouseEnter={(e) => onMove(e, p.name, count)}
                  onMouseMove={(e) => onMove(e, p.name, count)}
                  onMouseLeave={() => setTip(null)}
                  dangerouslySetInnerHTML={{ __html: p.inner }}
                />
              );
            })}

            {/* 地方→東京をつなぐ光（settled後のみ・ロード時1回＋約12秒周期） */}
            {settled && tokyo && lineSources.map((src, i) => {
              const mx = (src.x + tokyo.x) / 2;
              const my = Math.min(src.y, tokyo.y) - 40; // 上に膨らむ弧
              const d = `M ${src.x} ${src.y} Q ${mx} ${my} ${tokyo.x} ${tokyo.y}`;
              const len = Math.hypot(tokyo.x - src.x, tokyo.y - src.y) * 1.4;
              return (
                <path key={i} d={d} className="jp-line run"
                  style={{ ["--len" as any]: len, strokeDasharray: len, strokeDashoffset: len, animationDelay: `${i * 0.5}s` }} />
              );
            })}
            {settled && tokyo && <circle cx={tokyo.x} cy={tokyo.y} r={2.6} className="jp-line-dot run" />}

            {/* 取材上位県のPulse（最大3県） */}
            {settled && pulseSlugs.map((slug, i) => {
              const c = CENTROIDS[slug];
              if (!c) return null;
              return <circle key={slug} cx={c.x} cy={c.y} r={6} className={`jp-pulse ${i === 1 ? "p2" : i === 2 ? "p3" : ""}`} />;
            })}
          </g>
        </g>
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{ left: tip.x, top: tip.y - 10, animation: "fadeUp .18s ease-out" }}
        >
          {tip.name}
          <span className="ml-1.5 font-normal text-sky2-300">取材 {tip.count}件</span>
        </div>
      )}

      {/* 凡例 */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        {MAP_TIERS.slice().reverse().map((t) => (
          <span key={t.label} className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm" style={{ background: t.fill }} />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
