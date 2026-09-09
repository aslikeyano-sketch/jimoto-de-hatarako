"use client";
import { STAGES } from "@/lib/pipeline";
import { setStage } from "@/lib/admin-actions";
export function StageSelect({ modelKey, id, value }:{ modelKey:string; id:string; value:string }) {
  return (
    <select defaultValue={value} onChange={(e)=>{ setStage(modelKey, id, e.target.value); }}
      className="rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[11px] text-slate-600">
      {STAGES.map(s=><option key={s} value={s}>{s}</option>)}
    </select>
  );
}
