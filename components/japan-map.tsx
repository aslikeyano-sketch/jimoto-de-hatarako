"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { PREF_SHAPES, MAP_VIEWBOX, MAP_OUTER_TRANSFORM, MAP_INNER_TRANSFORM } from "@/lib/japan-map-data";
import { mapFill, MAP_TIERS } from "@/lib/constants";

export function JapanMap({ counts }: { counts: Record<string, number> }) {
  const router = useRouter();
  const [tip, setTip] = useState<{ name: string; count: number; x: number; y: number } | null>(null);

  const onMove = useCallback((e: React.MouseEvent, name: string, count: number) => {
    const box = (e.currentTarget.closest("[data-map]") as HTMLElement)?.getBoundingClientRect();
    if (!box) return;
    setTip({ name, count, x: e.clientX - box.left, y: e.clientY - box.top });
  }, []);

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
                  fill={mapFill(count)}
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
          </g>
        </g>
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{ left: tip.x, top: tip.y - 10 }}
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
