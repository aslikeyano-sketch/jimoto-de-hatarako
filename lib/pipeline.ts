export const STAGES = ["取材候補","アポ済","取材予定","取材済","原稿作成中","先方確認中","公開予約","公開","非公開"] as const;
export const STAGE_COLORS: Record<string,string> = {
  "取材候補":"bg-slate-100 text-slate-600","アポ済":"bg-sky-100 text-sky-700",
  "取材予定":"bg-indigo-100 text-indigo-700","取材済":"bg-violet-100 text-violet-700",
  "原稿作成中":"bg-amber-100 text-amber-700","先方確認中":"bg-orange-100 text-orange-700",
  "公開予約":"bg-lime-100 text-lime-700","公開":"bg-emerald-100 text-emerald-700","非公開":"bg-rose-100 text-rose-700",
};
