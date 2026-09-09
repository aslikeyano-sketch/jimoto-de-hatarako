import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { modelByKey } from "@/lib/models";
import { AdminShell } from "@/components/admin-shell";
import { RecordForm } from "@/components/record-form";
import { saveRecord } from "@/lib/admin-actions";
export const dynamic="force-dynamic";
export default async function EditRecord({ params }:{ params:{model:string; id:string} }) {
  requireAdmin();
  const m = modelByKey(params.model); if(!m) notFound();
  const [record, prefectures] = await Promise.all([
    (prisma as any)[m.delegate].findUnique({ where:{id:params.id} }),
    prisma.prefecture.findMany({ select:{slug:true,name:true}, orderBy:{name:"asc"} }),
  ]);
  if(!record) notFound();
  const action = saveRecord.bind(null, m.key, params.id);
  const publicSlug = m.key==="companies"?`/companies/${record.slug}`:m.key==="people"?`/people/${record.slug}`:m.key==="projects"?`/projects/${record.slug}`:m.key==="events"?`/events/${record.slug}`:m.key==="organizations"?`/organizations/${record.slug}`:m.key==="prefectures"?`/prefecture/${record.slug}`:null;
  return (
    <AdminShell active={m.key}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">{m.emoji} {m.label}を編集</h1>
        {publicSlug && record.status==="published" && <Link href={publicSlug} target="_blank" className="text-sm font-semibold text-brand-600">公開ページ →</Link>}
      </div>
      <RecordForm action={action} fields={m.fields} initial={record} prefectures={prefectures} />
    </AdminShell>
  );
}
