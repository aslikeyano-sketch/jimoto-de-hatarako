"use client";
import { useEffect, useRef, useState } from "react";

const TILES = [
  { img: "/images/hero/make.png", copy: "このまちで、つくる。つなぐ。", float: "float-a", depth: 0.5 },
  { img: "/images/hero/local-work.png", copy: "ローカルだからこそ、できる仕事がある。", float: "float-b", depth: 1 },
  { img: "/images/hero/discover.png", copy: "知らなかった日本に、会いにいこう。", float: "float-c", depth: 0.5 },
];

export function HeroPhotos() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia("(min-width:1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !mql.matches) return;
    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      setOffset({ x: (e.clientX - cx) / r.width, y: (e.clientY - cy) / r.height });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
      {TILES.map((t, i) => (
        <div key={i} className="fade-up d3" style={{ transform: `translate3d(${offset.x * 10 * t.depth}px, ${offset.y * 10 * t.depth}px, 0)`, transition: "transform .3s ease-out" }}>
          <div className={t.float}>
            <a
              href="#latest"
              className="group relative flex aspect-[16/10] items-end overflow-hidden rounded-2xl shadow-card sm:aspect-[4/3] lg:aspect-auto lg:min-h-[168px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.img} alt={t.copy} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/15 to-transparent transition-colors duration-300 group-hover:from-navy-900/85" />
              <span className="brush relative z-10 p-4 text-base font-bold leading-snug text-white drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">{t.copy}</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
