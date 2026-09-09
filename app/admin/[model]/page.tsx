import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { modelByKey } from "@/lib/models";
import { STATUS_LABELS } from "@/lib/constants";
import { STAGE_COLORS } from "@/lib/pipeline";
import { AdminShell } from "@/components/admin-shell";
import { deleteRecord } from "@/lib/admin-actions";
export const dynamic="force-dynamic";
export default async function ModelList({ params }:{ params:{model:string} }) {
  requireAdmin();
  const m = modelByKey(params.model); if(!m) notFound();
  const rows = await (prisma as any)[m.delegate].findMany({ orderBy:{ updatedAt:"desc" } }).catch(()=>[]);
  return (
    <AdminShell active={m.key}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">{m.emoji} {m.label}（{rows.length}）</h1>
        <Link href={`/admin/${m.key}/new`} className="rounded-lg brand-gradient px-4 py-2 text-sm font-semibold text-white">＋ 新規</Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs text-slate-500">
            <tr>{m.listCols.map(c=><th key={c.field} className="px-4 py-3">{c.label}</th>)}
              {m.hasStage && <th className="px-4 py-3">取材</th>}<th className="px-4 py-3">公開</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((r:any)=>{
              const st=STATUS_LABELS[r.status]??null;
              return (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  {m.listCols.map((c,i)=>(
                    <td key={c.field} className="px-4 py-3">
                      {i===0 ? <Link href={`/admin/${m.key}/${r.id}/edit`} className="font-medium text-slate-800 hover:text-brand-700">{r[c.field]||"（無題）"}</Link> : <span className="text-slate-600">{String(r[c.field]??"")}</span>}
                    </td>
                  ))}
                  {m.hasStage && <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[r.stage]||"bg-slate-100 text-slate-600"}`}>{r.stage}</span></td>}
                  <td className="px-4 py-3">{st && <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.color}`}>{st.label}</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/${m.key}/${r.id}/edit`} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">編集</Link>
                      <form action={deleteRecord.bind(null, m.key, r.id)}><button className="rounded-md px-2 py-1 text-xs text-slate-300 hover:text-red-500">削除</button></form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length===0 && <tr><td colSpan={9} className="px-4 py-10 text-center text-slate-400">まだありません。「＋新規」から追加してください。</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
