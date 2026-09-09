"use client";
import { markHandled } from "@/lib/admin-actions";
export function HandledToggle({ kind, id, handled }:{ kind:"registration"|"inquiry"; id:string; handled:boolean }) {
  return (
    <button onClick={()=>markHandled(kind, id, !handled)}
      className={`rounded-md px-2.5 py-1 text-xs font-semibold ${handled?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>
      {handled?"対応済み":"未対応"}
    </button>
  );
}
