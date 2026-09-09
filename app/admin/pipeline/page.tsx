import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
import { STAGES, STAGE_COLORS } from "@/lib/pipeline";
import { StageSelect } from "@/components/stage-select";
export const dynamic="force-dynamic";
export const metadata={ title:"取材パイプライン", robots:{index:false} };
export default async function Pipeline(){
  requireAdmin();
  const [companies, people] = await Promise.all([
    prisma.company.findMany({ orderBy:{updatedAt:"desc"} }),
    prisma.person.findMany({ orderBy:{updatedAt:"desc"} }),
  ]);
  const items = [
    ...companies.map(c=>({id:c.id,key:"companies",name:c.name,sub:c.industry,stage:c.stage,owner:c.owner})),
    ...people.map(p=>({id:p.id,key:"people",name:p.name,sub:p.category,stage:p.stage,owner:p.owner})),
  ];
  return (
    <AdminShell active="pipeline">
      <h1 className="mb-6 text-xl font-bold text-slate-900">取材パイプライン</h1>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(stage=>{
          const col=items.filter(i=>i.stage===stage);
          return (
            <div key={stage} className="w-64 shrink-0">
              <div className="mb-2 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STAGE_COLORS[stage]}`}>{stage}</span>
                <span className="text-xs text-slate-400">{col.length}</span>
              </div>
              <div className="space-y-2">
                {col.map(i=>(
                  <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-3">
                    <Link href={`/admin/${i.key}/${i.id}/edit`} className="text-sm font-semibold text-slate-800 hover:text-brand-700">{i.name}</Link>
                    <p className="text-xs text-slate-400">{i.sub}{i.owner?` ・${i.owner}`:""}</p>
                    <div className="mt-2"><StageSelect modelKey={i.key} id={i.id} value={i.stage} /></div>
                  </div>
                ))}
                {col.length===0 && <p className="rounded-lg border border-dashed border-slate-200 py-4 text-center text-xs text-slate-300">なし</p>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-400">※ 企業・人物の取材進捗を管理します。カード内のプルダウンでステージを移動できます。</p>
    </AdminShell>
  );
}
