import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
import { MODELS } from "@/lib/models";
import { STAGES, STAGE_COLORS } from "@/lib/pipeline";
export const dynamic="force-dynamic";
export const metadata={ title:"ダッシュボード", robots:{index:false} };

export default async function Dashboard(){
  requireAdmin();
  const prefs = await prisma.prefecture.findMany({ orderBy:{name:"asc"} });
  const [companies, people, projects, events, orgs, regs, inqs] = await Promise.all([
    prisma.company.findMany(), prisma.person.findMany(), prisma.project.findMany(),
    prisma.event.findMany(), prisma.organization.findMany(),
    prisma.registration.count({where:{handled:false}}), prisma.inquiry.count({where:{handled:false}}),
  ]);
  const byPref=(arr:any[],slug:string)=>arr.filter(x=>x.prefecture===slug).length;
  const stageCount=(stage:string)=>companies.filter(c=>c.stage===stage).length + people.filter(p=>p.stage===stage).length;
  const totals=[
    {label:"企業",n:companies.length,href:"/admin/companies"},
    {label:"人物",n:people.length,href:"/admin/people"},
    {label:"プロジェクト",n:projects.length,href:"/admin/projects"},
    {label:"イベント",n:events.length,href:"/admin/events"},
    {label:"団体",n:orgs.length,href:"/admin/organizations"},
    {label:"未対応 受信",n:regs+inqs,href:"/admin/inbox"},
  ];
  return (
    <AdminShell active="home">
      <h1 className="mb-6 text-xl font-bold text-slate-900">ダッシュボード</h1>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {totals.map(t=>(
          <Link key={t.label} href={t.href} className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
            <p className="text-2xl font-bold text-slate-900">{t.n}</p><p className="text-xs text-slate-400">{t.label}</p>
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-slate-800">取材パイプライン</h2><Link href="/admin/pipeline" className="text-sm font-semibold text-brand-600">詳細 →</Link></div>
        <div className="flex flex-wrap gap-2">
          {STAGES.map(s=>(
            <div key={s} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center">
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STAGE_COLORS[s]}`}>{s}</span>
              <p className="mt-1 text-lg font-bold text-slate-900">{stageCount(s)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold text-slate-800">県ダッシュボード</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs text-slate-500">
              <tr><th className="px-4 py-2">都道府県</th><th className="px-4 py-2">企業</th><th className="px-4 py-2">人物</th><th className="px-4 py-2">議員</th><th className="px-4 py-2">プロジェクト</th><th className="px-4 py-2">イベント</th><th className="px-4 py-2">団体</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prefs.map(p=>(
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2"><Link href={`/prefecture/${p.slug}`} className="font-medium text-slate-800 hover:text-brand-700">{p.name}</Link></td>
                  <td className="px-4 py-2">{byPref(companies,p.slug)}</td>
                  <td className="px-4 py-2">{byPref(people,p.slug)}</td>
                  <td className="px-4 py-2">{people.filter(x=>x.prefecture===p.slug&&x.category==="議員").length}</td>
                  <td className="px-4 py-2">{byPref(projects,p.slug)}</td>
                  <td className="px-4 py-2">{byPref(events,p.slug)}</td>
                  <td className="px-4 py-2">{byPref(orgs,p.slug)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
