import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
import { fmtDate } from "@/lib/utils";
import { HandledToggle } from "@/components/handled-toggle";
export const dynamic="force-dynamic";
export const metadata={ title:"受信箱", robots:{index:false} };
export default async function Inbox(){
  requireAdmin();
  const [inqs, regs] = await Promise.all([
    prisma.inquiry.findMany({ orderBy:{createdAt:"desc"} }),
    prisma.registration.findMany({ orderBy:{createdAt:"desc"} }),
  ]);
  return (
    <AdminShell active="inbox">
      <h1 className="mb-6 text-xl font-bold text-slate-900">受信箱</h1>

      <h2 className="mb-3 font-bold text-slate-800">取材・掲載希望／情報提供（{inqs.length}）</h2>
      <div className="mb-8 space-y-2">
        {inqs.map(q=>(
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">{q.type}</span>
                <span className="text-sm font-bold text-slate-800">{q.name}</span>
                <span className="text-xs text-slate-400">{q.orgType} {q.prefecture}</span>
              </div>
              <HandledToggle kind="inquiry" id={q.id} handled={q.handled} />
            </div>
            {q.message && <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{q.message}</p>}
            <p className="mt-2 text-xs text-slate-400">{q.contact} ・ {fmtDate(q.createdAt)}</p>
          </div>
        ))}
        {inqs.length===0 && <p className="text-sm text-slate-400">まだありません。</p>}
      </div>

      <h2 className="mb-3 font-bold text-slate-800">地元と関わりたい人 登録（{regs.length}）</h2>
      <div className="space-y-2">
        {regs.map(r=>(
          <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div><span className="text-sm font-bold text-slate-800">{r.name}</span> <span className="text-xs text-slate-400">{r.age} ・ 出身：{r.homePref}{r.homeCity} ・ 現在：{r.currentLoc}</span></div>
              <HandledToggle kind="registration" id={r.id} handled={r.handled} />
            </div>
            <p className="mt-1 text-xs text-slate-500">職業：{r.job}／{r.industry}　興味：{r.interests}</p>
            {r.message && <p className="mt-1 text-sm text-slate-600">{r.message}</p>}
            <p className="mt-1 text-xs text-slate-400">{fmtDate(r.createdAt)}</p>
          </div>
        ))}
        {regs.length===0 && <p className="text-sm text-slate-400">まだありません。</p>}
      </div>
    </AdminShell>
  );
}
