import { marked } from "marked";
marked.setOptions({ breaks: true, gfm: true });
export function mdToHtml(md: string): string { return marked.parse(md ?? "", { async: false }) as string; }
export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("ja-JP", { year:"numeric", month:"long", day:"numeric" });
}
export function photoList(s: string): string[] { return (s ?? "").split(",").map(x=>x.trim()).filter(Boolean); }
