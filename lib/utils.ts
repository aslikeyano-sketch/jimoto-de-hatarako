import { marked } from "marked";
marked.setOptions({ breaks: true, gfm: true });
export function mdToHtml(md: string): string {
  // 日本語の「」や句読点に隣接した **強調** はMarkdownのフランキング規則で
  // 変換されず ** が残ってしまうため、先に <strong> へ置換する（太字＝青字は維持）。
  const pre = (md ?? "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return marked.parse(pre, { async: false }) as string;
}
export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("ja-JP", { year:"numeric", month:"long", day:"numeric" });
}
export function photoList(s: string): string[] { return (s ?? "").split(",").map(x=>x.trim()).filter(Boolean); }
